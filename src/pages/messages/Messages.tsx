import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ReactIcons from "@/assets/icons";
import SelectMessageUser from "@/components/room/SelectMessageUser";
import MessageTemplate from "@/components/room/MessageTemplate";

const Messages = () => {
  return (
    <>
      <div className="lg:hidden w-full h-screen border-r border-div_border">
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
              <SelectMessageUser />
            </Dialog>
          </div>
        </div>
        <MessageTemplate height={"calc(100% - 64px)"} />
      </div>
      <div className="hidden h-full w-full lg:flex justify-center items-center">
        <div className="flex flex-col items-start gap-5">
          <p className="text-2xl font-black">Select a message</p>
          <p className="w-80 text-sm">
            Choose from your existing conversations, start a new one, or just
            keep swimming.
          </p>
          <Dialog>
            <DialogTrigger className="rounded-full bg-sky_blue tracking-wider text-white font-semibold py-3 px-5">
              New Message
            </DialogTrigger>
            <SelectMessageUser />
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default Messages;
