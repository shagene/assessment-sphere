import { supabase } from './supabase'
import { SupabaseClient } from '@supabase/supabase-js'

export async function getTenant(subdomains: string[]) {
  let tenant = null;
  let parentId = null;

  for (const subdomain of subdomains.reverse()) {
    const { data, error } = await supabase
      .from('tenants')
      .select('*')
      .eq('subdomain', subdomain)
      .eq('parent_id', parentId)
      .single() as { data: Tenant | null, error: Error | null };

    if (error || !data) {
      console.error('Error fetching tenant:', error);
      return null;
    }

    tenant = data;
    parentId = data.id;
  }

  return tenant;
}

interface Tenant {
  id: string;
  subdomain: string;
  parent_id: string | null;
  // Add other properties as needed
}