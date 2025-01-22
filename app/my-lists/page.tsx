import { getCurrentUserLists } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

const MyLists = async () => {
  const supabase = createClient();
  const lists = await getCurrentUserLists(supabase);

  if (!lists?.length) {
    return (
      <div className="flex justify-center w-full py-8">No saved lists</div>
    );
  }

  return (
    <div className="px-20">
      <h1 className="py-8 text-4xl">My Lists</h1>
      <div className="flex flex-col gap-3">
        {lists.map((list) => (
          <div key={list.id}>
            <Link href={`/list/${list.id}`} className="hover:underline">
              {list.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyLists;
