import Spinner from "@/components/Spinner";

const Loading = () => {
  return (
    <div className="flex flex-row items-center justify-center h-screen gap-3">
      <Spinner />
      <h3 className="text-xl font-semibold">Loading</h3>
    </div>
  );
};

export default Loading;
