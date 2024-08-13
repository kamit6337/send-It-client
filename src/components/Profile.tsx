import ReactIcons from "@/assets/icons";
import useLoginCheck from "@/hooks/useLoginCheck";

const Profile = () => {
  const { data: user } = useLoginCheck();

  return (
    <div className="flex justify-center items-center p-1 gap-2 hover:bg-sidebar_link_hover md:px-4 cursor-pointer rounded-full">
      <div className="w-10 md:w-12">
        <img src={user.photo} alt={user.name} className="w-full rounded-full" />
      </div>
      <div className="flex-1 hidden md:flex items-center justify-between ">
        <div className="flex flex-col items-start py-1">
          <p>{user.name}</p>
          <p className="username">@{user.username}</p>
        </div>
        <p>
          <ReactIcons.threeDot />
        </p>
      </div>
    </div>
  );
};

export default Profile;
