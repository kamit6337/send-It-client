import ReactIcons from "@/assets/icons";
import SelectMessageUser from "@/components/SelectMessageUser";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import MessageTemplate from "@/pages/messages/MessageTemplate";
import { Outlet } from "react-router-dom";

const MessagesLayout = () => {
  return (
    <section className="flex">
      <div className="hidden lg:block w-96 h-screen border-r border-div_border">
        <div className="h-16 sticky top-0 flex justify-between items-center px-5">
          <p>Messages</p>
          <div className="flex gap-3 items-center text-xl">
            <button>
              <ReactIcons.setting />
            </button>
            <Dialog>
              <DialogTrigger className="flex items-center">
                <ReactIcons.messagePlus />
              </DialogTrigger>
              <DialogContent className="top-[5%] translate-y-0 h-[500px] overflow-y-auto p-0">
                <SelectMessageUser />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <MessageTemplate height={"calc(100% - 64px)"} />
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </section>
  );
};

export default MessagesLayout;
