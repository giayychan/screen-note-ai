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
  createList: (listName: string) => Promise<void>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
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
    try {
      await createList(listName);
      setIsOpen(false);
    } catch (error) {
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
              <Button type="submit">Confirm</Button>
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
