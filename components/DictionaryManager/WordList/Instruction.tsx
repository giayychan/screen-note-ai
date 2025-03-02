import Button from '@/components/ui/Button';
import { useState } from 'react';

const Instruction = ({
  defaultIsHidden = false
}: {
  defaultIsHidden: boolean;
}) => {
  const [isHidden, setIsHidden] = useState(defaultIsHidden);
  const toggleHidden = () => setIsHidden(!isHidden);

  return (
    <div className="flex flex-col">
      <Button
        variant="outline"
        onClick={toggleHidden}
        className="mx-auto mb-5 w-min"
      >
        {!isHidden ? 'Hide' : 'Show'} Instructions
      </Button>
      {!isHidden && (
        <div className="px-5 pb-10 [&>p]:font-bold">
          <h2 className="font-bold">How to Use AI Screen Note AI?</h2>
          <h3>
            AI Screen Note is a powerful tool that helps you learn new words
            from any online article using AI-powered contextual definitions. You
            can also generate AI-written articles using your saved words, making
            it a great tool for language learning and content creation!
          </h3>
          <br />
          <p>Follow these simple steps to get started!</p>
          <br />
          <p>1. Find an Article You Want to Read</p>
          <span>
            Look for an article that contains words you’d like to read.
          </span>
          <p>2. Copy the URL</p>
          <span>
            Make sure to copy the full URL, including http:// or https://.
          </span>
          <p>3. Paste the URL into the Input Box </p>
          <span>
            Go to AI Screen Note and paste the URL into the input box at the top
            of the page.
          </span>
          <p>4. Click “Render”</p>
          <span>
            Once you click Render, the app will automatically take a screenshot
            of the webpage and display the article for you to read.
          </span>
          <p>5. Wait for AI Processing </p>
          <span>
            Give it a few minutes while our server processes the words in the
            article.
          </span>
          <p>6. Click on Words to See AI-Generated Definitions </p>
          <span>
            After processing, words will be overlaid on the screenshot. Click on
            any word to see its context-based definition, powered by Mistral AI.
          </span>
          <p>7. Save Words to Your List </p>
          <span>
            Click Save to add words to your personal list. Saved words will move
            to the right side of the screen.
          </span>
          <p>8. Generate AI-Powered Articles with Your Saved Words</p>
          <span>
            Want to reinforce your learning? Use your saved words to generate
            AI-written articles. This feature helps you see the words in new
            contexts, making them easier to remember!
          </span>
          <p>9. Save Your Screenshot & Words as a Collection </p>
          <span>
            Want to keep your study session? Save your list as a collection, so
            you can retrieve it later from the “My List” section in the
            navigation bar.
          </span>
          <p>10. Best of All—It’s Completely Free! </p>
          <span>
            AI Screen Note is 100% free to use, making it the perfect tool for
            students, language learners, and anyone looking to expand their
            vocabulary!
          </span>
        </div>
      )}
    </div>
  );
};

export default Instruction;
