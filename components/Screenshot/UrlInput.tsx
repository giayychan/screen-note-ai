import type { ChangeEvent, FormEvent } from 'react';
import { Input } from '../ui/input';
import Button from '../ui/Button';

export const UrlInput = ({
  onSubmit,
  value = '',
  onChange,
  disabled
}: {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}) => {
  return (
    <form onSubmit={onSubmit}>
      <p className="py-10 text-xl font-bold text-center lg:p-10 md:text-3xl">
        Website you want to read 👇
      </p>
      <div className="flex w-full gap-2 px-5">
        <Input
          type="url"
          name="url"
          placeholder="https://example.com"
          className="p-4 text-lg rounded-md"
          onChange={onChange}
          value={value}
        />
        <Button type="submit" disabled={disabled}>
          Render
        </Button>
      </div>
    </form>
  );
};
