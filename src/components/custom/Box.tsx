const Box = ({
  children,
  gap = 20,
  title,
}: {
  children: React.ReactNode;
  gap?: number;
  title: string;
}) => {
  return (
    <main className="my-10 flex justify-center px-2">
      <div
        className={`border-box_border shadow-md flex w-[576px] flex-col items-center rounded-[20px] border px-6 pt-10 pb-14 sm:px-10 sm:pb-20`}
        style={{
          gap: `${gap}px`,
        }}
      >
        <p className="text-[32px] font-semibold">{title}</p>
        {children}
      </div>
    </main>
  );
};

export default Box;
