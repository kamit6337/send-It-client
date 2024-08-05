import ReactIcons from "@/assets/icons";
import useLoginCheck from "@/hooks/useLoginCheck";

const user = {
  username: "@kamit6337",
  name: "Amit Kumar",
  email: "amitwick007@gmail.com",
  photo:
    "https://ui-avatars.com/api/?background=random&name=Amit&size=128&bold=true",
};

const Profile = () => {
  const { data: user } = useLoginCheck();

  return (
    <div className="flex items-center p-1 gap-2 hover:bg-div_hover md:px-4 cursor-pointer rounded-full">
      <div className="w-10 md:w-12">
        <img src={user.photo} alt={user.name} className="w-full rounded-full" />
      </div>
      <div className="flex-1 hidden md:flex items-center justify-between ">
        <div className="flex items-center gap-2 py-1">
          <div className="text-md">
            <p>{user.name}</p>
            <p className="text-sm text-grey">@{user.username}</p>
          </div>
        </div>
        <p>
          <ReactIcons.threeDot />
        </p>
      </div>
    </div>
  );
};

export default Profile;
