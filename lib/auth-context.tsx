import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { supabase } from './supabase';

// Extend the Supabase User type to include tenant_id
interface User extends SupabaseUser {
  tenant_id?: string;
}

type UserRole = 'site_admin' | 'org_admin' | 'user';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, tenantId?: string) => Promise<void>;
  signOut: () => Promise<void>;
  role: UserRole | null;
  createOrganization: (name: string, domain: string) => Promise<Organization>;
  createOrgUser: (email: string, password: string, role: 'org_admin' | 'user') => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const extendedUser: User = {
          ...session.user,
          tenant_id: (session.user.user_metadata as any).tenant_id,
        };
        setUser(extendedUser);
      } else {
        setUser(null);
      }
      setSession(session);
    });

    if (session?.user) {
      fetchUserRole(session.user.id);
    }

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const fetchUserRole = async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching user role:', error);
    } else {
      setRole(data.role as UserRole);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string, tenantId?: string) => {
    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: {
          tenant_id: tenantId
        }
      }
    });
    if (error) throw error;
    
    // If tenantId is provided and user is created, associate the user with the tenant
    if (tenantId && data.user) {
      const { error: userError } = await supabase
        .from('users')
        .insert({ 
          id: data.user.id, 
          email: data.user.email!, // Use non-null assertion operator
          tenant_id: tenantId, 
          role: 'user',
          encrypted_password: 'some_encrypted_password'
        });
      if (userError) throw userError;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  interface Tenant {
    id: string;
    name: string;
    subdomain: string;
    parent_id: string | null;
    type: string;
    created_at: string;
    updated_at: string;
  }

  const createOrganization = async (name: string, domain: string): Promise<Organization> => {
    if (role !== 'site_admin') throw new Error('Unauthorized');
    
    const { data, error } = await supabase
      .from('tenants')
      .insert({ 
        name, 
        subdomain: domain,
        type: 'organization', // Assuming you have a type field, adjust as needed
      })
      .select()
      .single();
    
    if (error) throw error;
    if (!data) throw new Error('Failed to create organization');

    const tenant = data as Tenant;
    return {
      id: tenant.id,
      name: tenant.name,
      domain: tenant.subdomain,
    };
  };

  const createOrgUser = async (email: string, password: string, userRole: 'org_admin' | 'user') => {
    if (role !== 'org_admin' && role !== 'site_admin') throw new Error('Unauthorized');
    
    const { data: userData, error: userError } = await supabase.auth.signUp({ email, password });
    if (userError) throw userError;

    const { error: roleError } = await supabase
      .from('users')
      .update({ role: userRole, tenant_id: (user as User)?.tenant_id })
      .eq('id', userData.user!.id);
    
    if (roleError) throw roleError;
  };

  const value: AuthContextType = {
    user,
    session,
    signIn,
    signUp,
    signOut,
    role,
    createOrganization,
    createOrgUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface Organization {
  id: string;
  name: string;
  domain: string;
  // Add any other fields that your organization table has
}