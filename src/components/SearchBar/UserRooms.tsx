import ReactIcons from "@/assets/icons";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import SelectMessageUser from "../room/SelectMessageUser";
import MessageTemplate from "../room/MessageTemplate";

type Props = {
  showMessageArea: boolean;
  handleCloseMessage: (value: boolean) => void;
};

const UserRooms = ({ showMessageArea, handleCloseMessage }: Props) => {
  return (
    <>
      <div
        className="h-14 flex items-center justify-between px-4 cursor-pointer"
        onClick={() => handleCloseMessage(!showMessageArea)}
      >
        <p>Messages</p>
        <div className="flex text-xl">
          <div onClick={(e) => e.stopPropagation()}>
            <Dialog>
              <DialogTrigger className="">
                <button className="p-2 rounded-full hover:bg-sidebar_link_hover">
                  <ReactIcons.messagePlus />
                </button>
              </DialogTrigger>
              <SelectMessageUser />
            </Dialog>
          </div>

          <button className="p-2 rounded-full hover:bg-sidebar_link_hover">
            {showMessageArea ? (
              <ReactIcons.doubleArrowDown />
            ) : (
              <ReactIcons.doubleArrowUp />
            )}
          </button>
        </div>
      </div>
      {showMessageArea && (
        <MessageTemplate height={"384px"} willNavigate={false} />
      )}
    </>
  );
};

export default UserRooms;
