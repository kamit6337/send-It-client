import useUserProfile from "@/hooks/useUserProfile";

const HoveredUserInfo = ({ username }: { username: string }) => {
  const { data, isLoading, error } = useUserProfile(username);

  if (isLoading || error) return null;

  const { name, photo, isFollowed, followingCount, followersCount } = data.data;

  return (
    <div className="absolute z-20 top-full left-1/2 -translate-x-1/2 w-80 bg-background border border-div_border rounded-xl px-3 py-5">
      <div className="flex justify-between">
        <div>
          <div className="w-14">
            <img
              src={photo}
              alt={name}
              className="w-full object-cover rounded-full"
            />
          </div>
          <p>{name}</p>
          <p className="text-grey text-sm">@{username}</p>
        </div>
        {isFollowed ? <p>Following</p> : <p>Follow</p>}
      </div>
      <div className="flex items-center gap-5 mt-5">
        <div className="flex items-center gap-1">
          <p>{followingCount}</p>
          <p>Following</p>
        </div>
        <div className="flex items-center gap-1">
          <p>{followersCount}</p>
          <p>Followers</p>
        </div>
      </div>
    </div>
  );
};

export default HoveredUserInfo;
