import { SupabaseClient } from '@supabase/supabase-js';
import { cache } from 'react';

export const getUser = cache(async (supabase: SupabaseClient) => {
  const {
    data: { user }
  } = await supabase.auth.getUser();
  return user;
});

export const getSubscription = cache(async (supabase: SupabaseClient) => {
  const { data: subscription, error } = await supabase
    .from('subscriptions')
    .select('*, prices(*, products(*))')
    .in('status', ['trialing', 'active'])
    .maybeSingle();

  return subscription;
});

export const getProducts = cache(async (supabase: SupabaseClient) => {
  const { data: products, error } = await supabase
    .from('products')
    .select('*, prices(*)')
    .eq('active', true)
    .eq('prices.active', true)
    .order('metadata->index')
    .order('unit_amount', { referencedTable: 'prices' });

  return products;
});

export const getUserDetails = cache(async (supabase: SupabaseClient) => {
  const { data: userDetails } = await supabase
    .from('users')
    .select('*')
    .single();
  return userDetails;
});

export const getCurrentUserLists = cache(async (supabase: SupabaseClient) => {
  const res = await supabase.auth.getUser();
  const user = res.data.user;

  if (!user) {
    return [];
  }

  const { data: lists } = await supabase
    .from('lists')
    .select('*')
    .eq('user_id', user.id);

  return lists;
});

export const getListById = cache(
  async (supabase: SupabaseClient, list_id: string) => {
    const { data: list } = await supabase
      .from('lists')
      .select('*')
      .eq('id', list_id)
      .single();

    return list;
  }
);

export const getWordsByListId = cache(
  async (supabase: SupabaseClient, list_id: string) => {
    const res = await supabase.auth.getUser();
    const user = res.data.user;

    if (!user) {
      return null;
    }

    const { data: words } = await supabase
      .from('words')
      .select('*')
      .eq('list_id', list_id)
      .order('created_at', { ascending: false });

    return words;
  }
);
