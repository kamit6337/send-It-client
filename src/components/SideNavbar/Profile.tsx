import ReactIcons from "@/assets/icons";
import useLoginCheck from "@/hooks/auth/useLoginCheck";

const Profile = () => {
  const { data: user } = useLoginCheck();

  return (
    <div className="flex justify-center items-center p-1 px-2 gap-2 lg:hover:bg-sidebar_link_hover cursor-pointer rounded-full hover:brightness-90">
      <div className="w-10 md:w-12">
        <img src={user.photo} alt={user.name} className="w-full rounded-full" />
      </div>
      <div className="flex-1 hidden lg:flex items-center justify-between ">
        <p>{user.name}</p>
        <p className="">
          <ReactIcons.threeDot />
        </p>
      </div>
    </div>
  );
};

export default Profile;
