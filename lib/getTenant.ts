import { supabase } from './supabase'
import { SupabaseClient, PostgrestSingleResponse } from '@supabase/supabase-js'

export interface Tenant {
  id: string;
  subdomain: string;
  parent_id: string | null;
  // Add other properties as needed
}

export async function getTenant(subdomains: string[]): Promise<Tenant | null> {
  let tenant: Tenant | null = null;
  let parentId: string | null = null;

  for (const subdomain of subdomains.reverse()) {
    const { data, error }: PostgrestSingleResponse<Tenant> = await supabase
      .from('tenants')
      .select('*')
      .eq('subdomain', subdomain)
      .eq('parent_id', parentId)
      .single();

    if (error || !data) {
      console.error('Error fetching tenant:', error);
      return null;
    }

    tenant = data;
    parentId = data.id;
  }

  return tenant;
}