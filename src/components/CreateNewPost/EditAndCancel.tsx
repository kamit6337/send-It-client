import ReactIcons from "@/assets/icons";

type Props = {
  selectedFile: File;
  openFile: () => void;
  handleCancel: () => void;
};

const EditAndCancel = ({ selectedFile, openFile, handleCancel }: Props) => {
  return (
    <div className="w-full relative my-3">
      {selectedFile.type.startsWith("image/") ? (
        <img
          src={URL.createObjectURL(selectedFile)}
          className="w-full object-cover rounded-xl border border-border"
          alt="Selected Image"
        />
      ) : (
        <video
          key={selectedFile.name} // Use file name as the key to force re-render
          className="w-full rounded-xl border border-border"
          controls
        >
          <source
            src={URL.createObjectURL(selectedFile)}
            type={selectedFile.type}
          />
          Your browser does not support the video tag.
        </video>
      )}

      {/* MARK: EDIT AND CANCEL */}
      <div className="absolute z-10 top-0 left-0 w-full flex justify-between items-center py-4 px-10 ">
        <button
          type="button"
          className="bg-search_bg px-3 py-2 rounded-full"
          onClick={openFile}
        >
          Edit
        </button>
        <button
          type="button"
          className="text-red-500 p-1 rounded-full border border-red-500"
          onClick={() => handleCancel()}
        >
          <ReactIcons.cancel className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default EditAndCancel;
