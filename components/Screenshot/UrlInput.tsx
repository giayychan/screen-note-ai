import type { ChangeEvent, FormEvent } from 'react';
import { Input } from '../ui/input';
import Button from '../ui/Button';

export const UrlInput = ({
  onSubmit,
  value = '',
  onChange,
  disabled,
  reset
}: {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  reset: () => void;
}) => {
  return (
    <form onSubmit={onSubmit}>
      <p className="pt-10 pb-5 text-center lg:p-10 lg:pb-3">
        Paste the URL of the website 👇
      </p>
      <div className="flex max-w-2xl gap-2 mx-auto">
        <Input
          type="url"
          name="url"
          placeholder="https://example.com"
          className="p-4 text-lg rounded-md"
          onChange={onChange}
          value={value}
        />
        <div className="flex items-center gap-2">
          <Button type="submit" disabled={disabled}>
            Render
          </Button>
          <Button variant="secondary" onClick={reset} disabled={disabled}>
            Clear
          </Button>
        </div>
      </div>
    </form>
  );
};
