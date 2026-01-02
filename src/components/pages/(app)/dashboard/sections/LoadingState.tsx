interface LoadingStateProps {
  message: string;
}

export const LoadingState = ({ message }: LoadingStateProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-gray-500">{message}</div>
    </div>
  );
};