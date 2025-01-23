import { WordDefinitionWithBgColor } from './types';

const WordList = ({
  wordsWithColor
}: {
  wordsWithColor: WordDefinitionWithBgColor[];
}) => (
  <span className="flex flex-col max-w-full gap-2 py-5">
    <span className="text-md text-nowrap text-primary">
      Words in the list:{' '}
    </span>
    <span className="flex flex-wrap">
      {wordsWithColor.map((w) => (
        <span
          key={w.id}
          style={{ backgroundColor: w.bgColor }}
          className="p-0.5 border bg-primary rounded text-secondary"
        >
          {w.text}
        </span>
      ))}
    </span>
  </span>
);

export default WordList;
