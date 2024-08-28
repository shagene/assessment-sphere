import { supabase } from './supabase';
import { Database } from './database.types';

type Tenant = Database['public']['Tables']['tenants']['Row'];

export async function createTenant(tenant: Omit<Tenant, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('tenants')
    .insert(tenant)
    .select()
    .single();

  if (error) {
    console.error('Error creating tenant:', error);
    throw error;
  }

  return data;
}

export async function getTenantBySubdomain(subdomain: string) {
  const { data, error } = await supabase
    .from('tenants')
    .select('*')
    .eq('subdomain', subdomain)
    .single<Tenant>();

  if (error) {
    console.error('Error fetching tenant:', error);
    throw error;
  }

  return data;
}

export async function getTenantHierarchy(tenantId: string) {
  const hierarchy: Tenant[] = [];
  let currentTenantId: string | null = tenantId;

  while (currentTenantId) {
    const { data, error } = await supabase
      .from('tenants')
      .select('*')
      .eq('id', currentTenantId)
      .single();

    if (error) {
      console.error('Error fetching tenant:', error);
      throw error;
    }

    if (data) {
      const tenant = data as Tenant;
      hierarchy.unshift(tenant);
      currentTenantId = tenant.parent_id;
    } else {
      break;
    }
  }

  return hierarchy;
}