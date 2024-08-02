const Loading = ({
  hScreen = false,
  small = true,
  width = small ? "20px" : "40px",
  height = small ? "20px" : "40px",
  borderWidth = small ? "2px" : "3px",
}) => {
  return (
    <div
      className={`${
        hScreen ? "h-screen" : "h-full"
      } flex w-full items-center justify-center`}
    >
      <div
        style={{
          width,
          height,
          borderColor: "var(--background)",
          borderWidth: borderWidth,
          borderRightColor: "transparent",
          borderBottomColor: "transparent",
        }}
        className="loading_spinner"
      />
    </div>
  );
};

export default Loading;
