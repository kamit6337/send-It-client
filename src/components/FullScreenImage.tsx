import { DialogContent } from "./ui/dialog";

const FullScreenImage = ({ src }: { src: string }) => {
  return (
    <DialogContent className="w-max">
      <div className="h-screen w-max">
        <img src={src} className="h-full object-cover" />
      </div>
    </DialogContent>
  );
};

export default FullScreenImage;
