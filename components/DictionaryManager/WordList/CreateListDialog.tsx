import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { ReactNode, useState } from 'react';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

const CreateListDialog = ({
  children: trigger,
  createList
}: {
  children: ReactNode;
  createList: (listName: string) => Promise<string | undefined>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [listName, setListName] = useState('');
  const supabase = createClient();
  const router = useRouter();

  const handleOpenChange = async (open: boolean) => {
    const res = await supabase.auth.getUser();
    const user = res.data.user;

    if (!user) {
      router.push('/signin');
      return;
    }

    setIsOpen(open);
  };

  const submitCreateList = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!listName) {
      return;
    }

    setIsLoading(true);

    try {
      const listId = await createList(listName);

      if (!listId) {
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      router.push(`/list/${listId}`);
      setIsOpen(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange} open={isOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-2">Create a new list</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitCreateList}>
          <DialogDescription className="flex flex-col gap-5 size-full">
            <Input
              placeholder="List name"
              onChange={(e) => setListName(e.target.value)}
            />
            <div className="flex flex-row gap-4">
              <Button type="submit" loading={isLoading} disabled={!listName}>
                Confirm
              </Button>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </div>
          </DialogDescription>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateListDialog;
