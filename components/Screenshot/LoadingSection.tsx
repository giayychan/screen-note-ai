import { Progress as ProgressBar } from '@/components/ui/progress';

const LoadingSection = ({
  progress,
  loadingScreenshot
}: {
  progress: number;
  loadingScreenshot: boolean;
}) => (
  <div className="flex flex-col items-center justify-center gap-2">
    <p className="text-sm text-center lg:text-base">
      {loadingScreenshot
        ? 'Taking a screenshot...'
        : 'Analyzing texts in screenshot... It might take a few minutes.'}
    </p>
    <span className="inline-block w-5 h-5 border-2 border-gray-500 rounded-full animate-spin border-t-transparent" />
    <ProgressBar value={progress} className="rounded-none" />
  </div>
);

export default LoadingSection;
