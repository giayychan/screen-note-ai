import Pricing from '@/components/ui/Pricing/Pricing';
import { createClient } from '@/utils/supabase/server';
import {
  getProducts,
  getSubscription,
  getUser
} from '@/utils/supabase/queries';
import { DictionaryManager } from '@/components/DictionaryManager';

export default async function PricingPage() {
  const supabase = createClient();
  const [user, products, subscription] = await Promise.all([
    getUser(supabase),
    getProducts(supabase),
    getSubscription(supabase)
  ]);

  return (
    <main className="flex flex-col items-center">
      <DictionaryManager user={user} />
    </main>
    // <Pricing
    //   user={user}
    //   products={products ?? []}
    //   subscription={subscription}
    // />
  );
}
