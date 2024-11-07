import { WordDefinitionWithBgColor } from './types';

const WordList = ({
  wordsWithColor
}: {
  wordsWithColor: WordDefinitionWithBgColor[];
}) => (
  <span className="flex items-center gap-3 p-1 mr-auto border rounded">
    <span className="text-md text-nowrap text-primary">
      Words in the list:{' '}
    </span>
    <span className="flex">
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
