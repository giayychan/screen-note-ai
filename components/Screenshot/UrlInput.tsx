import {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent
} from 'react';
import { Input } from '../ui/input';
import Button from '../ui/Button';

export const DebouncedUrlInput = ({
  onSubmit,
  value = '',
  onChange,
  disabled,
  reset
}: {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  reset: () => void;
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const debouncedChange = useCallback(() => {
    const fakeEvent = {
      target: { value: localValue }
    } as ChangeEvent<HTMLInputElement>;

    onChange(fakeEvent);
  }, [localValue, onChange]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (localValue !== value) {
        debouncedChange();
      }
    }, 300);

    return () => clearTimeout(timerId);
  }, [localValue, value, debouncedChange]);

  const handleLocalChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  };

  const handleReset = () => {
    setLocalValue('');
    reset();
  };

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
          value={localValue}
          onChange={handleLocalChange}
        />
        <div className="flex items-center gap-2">
          <Button type="submit" disabled={disabled}>
            Render
          </Button>
          <Button variant="secondary" onClick={handleReset} disabled={disabled}>
            Clear
          </Button>
        </div>
      </div>
    </form>
  );
};
