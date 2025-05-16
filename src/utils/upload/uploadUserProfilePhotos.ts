import uploadImageOrVideo from "@/lib/uploadImageOrVideo";

const uploadUserProfilePhotos = async (
  profileImage: File | null,
  bgImage: File | null
) => {
  const obj = {
    profilePhoto: "",
    bgPhoto: "",
  };

  if (profileImage) {
    const url = await uploadImageOrVideo(profileImage, "PROFILE");
    obj.profilePhoto = url;
  }

  if (bgImage) {
    const url = await uploadImageOrVideo(bgImage, "PROFILE_BG");
    obj.bgPhoto = url;
  }

  return obj;
};

export default uploadUserProfilePhotos;
