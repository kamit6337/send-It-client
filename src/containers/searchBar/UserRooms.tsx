import ReactIcons from "@/assets/icons";
import SelectMessageUser from "@/components/SelectMessageUser";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import MessageTemplate from "@/pages/messages/MessageTemplate";

const UserRooms = ({ showMessageArea, handleCloseMessage }) => {
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
              <DialogContent className="top-[5%] translate-y-0 h-[500px] overflow-y-auto p-0">
                <SelectMessageUser />
              </DialogContent>
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
