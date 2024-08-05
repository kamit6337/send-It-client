import ReactIcons from "@/assets/icons";

const Box = ({
  children,
  gap = 20,
  title,
  cancelBtn = false,
  handleCancel,
}: {
  children: React.ReactNode;
  gap?: number;
  title: string;
  cancelBtn?: boolean;
  handleCancel?: () => void;
}) => {
  return (
    <main className="flex justify-center mt-10 px-2 ">
      <div
        className={`border-border container_shadow flex w-[576px] flex-col items-center rounded-[20px] border px-6 pt-10 pb-14 sm:px-10 sm:pb-20 relative`}
        style={{
          gap: `${gap}px`,
        }}
      >
        <p className="text-[32px] font-semibold">{title}</p>
        {children}
        {cancelBtn && (
          <button
            className="absolute z-10 top-0 right-0 mt-5 mr-5 text-2xl text-gray-400 "
            onClick={handleCancel}
          >
            <ReactIcons.cancel />
          </button>
        )}
      </div>
    </main>
  );
};

export default Box;
