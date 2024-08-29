import { supabase } from './supabase';
import { Database } from './database.types';

type Tenant = Database['public']['Tables']['tenants']['Row'];
type CreateTenantWithAdminParams = Database['public']['Functions']['create_tenant_with_admin']['Args'];
type CreateTenantWithAdminResult = Database['public']['Functions']['create_tenant_with_admin']['Returns'];

export async function createTenantWithAdmin(params: CreateTenantWithAdminParams): Promise<CreateTenantWithAdminResult> {
  const { data, error } = await supabase.rpc('create_tenant_with_admin', params);
  
  if (error) {
    console.error('Error creating tenant with admin:', error);
    throw error;
  }

  if (!data) {
    throw new Error('No data returned from create_tenant_with_admin');
  }

  return data;
}

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
      currentTenantId = tenant.parent_id as string | null;
    } else {
      break;
    }
  }

  return hierarchy;
}