import ReactIcons from "@/assets/icons";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ConfirmChatDelete from "./ConfirmChatDelete";
import Toastify from "@/lib/Toastify";
import getGraphql from "@/utils/api/graphql";
import deleteChatSchema, {
  deleteChatDataQuery,
} from "@/graphql/chat/deleteChatSchema";

type Props = {
  chatId: string;
  roomId: string;
};

const ChatOptions = ({ chatId, roomId }: Props) => {
  const { showSuccessMessage, showErrorMessage } = Toastify();

  const handleDelete = async () => {
    try {
      const result = await getGraphql(deleteChatSchema, deleteChatDataQuery, {
        chatId,
        roomId,
      });
      showSuccessMessage({ message: result });
    } catch (error) {
      showErrorMessage({
        message:
          error instanceof Error ? error.message : "Error in deleting chat",
      });
    }
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="invisible group-hover:visible">
          <ReactIcons.options className="rotate-90 text-gray-500" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DialogTrigger className="w-full">
            <DropdownMenuItem className="w-full">Delete</DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="w-80 p-0">
        <ConfirmChatDelete handleDelete={handleDelete} />
      </DialogContent>
    </Dialog>
  );
};

export default ChatOptions;
