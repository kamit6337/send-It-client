import ReactIcons from "@/assets/icons";
import { ChangeEvent, useRef } from "react";

type Props = {
  selectedFile: (value: File | null) => void;
  openFile: () => void;
};

const EditAndCancel = ({ selectedFile, openFile }: Props) => {
  return (
    <div className="absolute z-10 top-0 left-0 w-full flex justify-between items-center px-2 ">
      <button
        className="bg-search_bg m-3 px-3 py-2 rounded-full"
        onClick={openFile}
      >
        Edit
      </button>
      <button
        className="text-red-500 m-3"
        onClick={() => {
          selectedFile(null);
        }}
      >
        <ReactIcons.cancel className="text-4xl" />
      </button>
    </div>
  );
};

export default EditAndCancel;
