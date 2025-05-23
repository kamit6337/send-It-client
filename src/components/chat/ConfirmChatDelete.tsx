import { useRef } from "react";
import { DialogClose } from "../ui/dialog";

type Props = {
  handleDelete: () => void;
};

const ConfirmChatDelete = ({ handleDelete }: Props) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    handleDelete();
    closeRef.current?.click();
  };

  return (
    <>
      <div className="flex flex-col items-center gap-5 pb-20 pt-12 px-5">
        <p className="text-xl font-semibold tracking-wide">
          Delete Chat message?
        </p>
        <p className="text-sm text-grey">
          This chat message will be deleted for both of you. Other people will
          not see this message.
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

export default ConfirmChatDelete;
