import { ScreenShotAndWords } from '@/components/ScreenShotAndWords';
import { getWordsByListId, getListById } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';

const List = async ({ params }: { params: { slug: string } }) => {
  const supabase = createClient();

  const list = await getListById(supabase, params.slug);
  const words = await getWordsByListId(supabase, params.slug);
  const transformedWords = words?.map((w) => ({
    text: w.text,
    dictionary: {
      definition: w.definition,
      example: w.example,
      part_of_speech: w.part_of_speech
    },
    id: w.id
  }));

  return (
    <div className="">
      <h1 className="px-20 py-8 text-4xl">{list.name}</h1>
      <ScreenShotAndWords
        words={transformedWords || []}
        url={list.origin_url}
        base64Image={list.origin_url_screenshot_base64}
      />
    </div>
  );
};

export default List;
