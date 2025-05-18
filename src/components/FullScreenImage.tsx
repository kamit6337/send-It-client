const FullScreenImage = ({ src }: { src: string }) => {
  return (
    <>
      <div className="h-screen flex items-center">
        <img src={src} className="max-h-full object-cover" />
      </div>
    </>
  );
};

export default FullScreenImage;
