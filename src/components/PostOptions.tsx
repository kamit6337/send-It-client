import { DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";

const PostOptions = ({ handleDelete }: { handleDelete: () => void }) => {
  return (
    <DropdownMenuContent align="end" className="prevent-navigation w-60">
      <DropdownMenuItem className="flex justify-center">Edit</DropdownMenuItem>
      <DropdownMenuItem onClick={handleDelete} className="flex justify-center">
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export default PostOptions;
