import { DialogContent } from "./ui/dialog";

const FullScreenImage = ({ src }: { src: string }) => {
  return (
    <DialogContent className="prevent-navigation flex justify-center">
      <div className="h-screen top-0 ">
        <img src={src} className="h-full object-cover prevent-navigation" />
      </div>
    </DialogContent>
  );
};

export default FullScreenImage;
