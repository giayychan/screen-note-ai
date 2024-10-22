import Pricing from '@/components/ui/Pricing/Pricing';
import { createClient } from '@/utils/supabase/server';
import {
  getProducts,
  getSubscription,
  getUser
} from '@/utils/supabase/queries';
import { DictionaryManager } from '@/components/DictionaryManager';
import { ScreenshotPage } from '@/components/Screenshot';

export default async function PricingPage() {
  const supabase = createClient();
  const [user, products, subscription] = await Promise.all([
    getUser(supabase),
    getProducts(supabase),
    getSubscription(supabase)
  ]);

  return (
    <main className="flex flex-row min-h-screen border-t-2 justify-evenly">
      <ScreenshotPage />
      <div className="w-0.5 h-auto bg-black bg-opacity-10"></div>
      <DictionaryManager user={user} />
    </main>
    // <Pricing
    //   user={user}
    //   products={products ?? []}
    //   subscription={subscription}
    // />
  );
}
