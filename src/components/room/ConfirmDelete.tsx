import { DialogClose } from "@/components/ui/dialog";
import { useRef } from "react";

type Props = {
  handleDelete: () => void;
};

const ConfirmDelete = ({ handleDelete }: Props) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    handleDelete();
    closeRef.current?.click();
  };

  return (
    <>
      <div className="flex flex-col items-center gap-5 pb-20 pt-12 px-5">
        <p className="text-xl font-semibold tracking-wide">
          Delete conversation?
        </p>
        <p className="text-sm text-grey">
          This conversation will be deleted for both of you. Other people will
          not see this conversation.
        </p>
        <button
          onClick={handleClick}
          className="w-full flex justify-center py-3 rounded-full bg-red-500 text-white"
        >
          Delete
        </button>
        <DialogClose
          ref={closeRef}
          className="w-full flex justify-center py-3 rounded-full border border-div_border"
        >
          Close
        </DialogClose>
      </div>
    </>
  );
};

export default ConfirmDelete;
