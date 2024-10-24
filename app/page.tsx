import Pricing from '@/components/ui/Pricing/Pricing';
import { createClient } from '@/utils/supabase/server';
import {
  getProducts,
  getSubscription,
  getUser
} from '@/utils/supabase/queries';
import { DictionaryManager } from '@/components/DictionaryManager';
import { ScreenshotPage } from '@/components/Screenshot';
import Divider from '@/components/ui/Divider';

export default async function PricingPage() {
  const supabase = createClient();
  const [user, products, subscription] = await Promise.all([
    getUser(supabase),
    getProducts(supabase),
    getSubscription(supabase)
  ]);

  return (
    <main className="flex flex-col min-h-screen gap-20 border-t-2 lg:flex-row lg:justify-evenly lg:gap-0">
      <ScreenshotPage />
      <Divider className="hidden lg:block" />
      <DictionaryManager user={user} />
    </main>
    // <Pricing
    //   user={user}
    //   products={products ?? []}
    //   subscription={subscription}
    // />
  );
}
