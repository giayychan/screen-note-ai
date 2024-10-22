import { Progress as ProgressBar } from '@/components/ui/progress';

const LoadingSection = ({
  progress,
  loadingScreenshot
}: {
  progress: number;
  loadingScreenshot: boolean;
}) => (
  <div className="flex flex-col items-center justify-center gap-2">
    <p className="flex items-center gap-2">
      {loadingScreenshot
        ? 'Taking a screenshot...'
        : 'Analyzing texts in screenshot... It might take a few minutes.'}
      <span className="inline-block w-5 h-5 border-2 border-blue-500 rounded-full animate-spin border-t-transparent" />
    </p>
    <ProgressBar value={progress} className="rounded-none" />
  </div>
);

export default LoadingSection;
