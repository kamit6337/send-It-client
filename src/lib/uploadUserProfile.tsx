import catchAsyncError from "./catchAsyncError";
import uploadToAWS from "./uploadToAWS";

const uploadUserProfile = catchAsyncError(
  async (profileImgFile: File | null, bgImgFile: File | null) => {
    const obj = {
      photo: "",
      bg_photo: "",
    };

    if (profileImgFile) {
      obj.photo = await uploadToAWS(profileImgFile, "/profile");
    }

    if (bgImgFile) {
      obj.bg_photo = await uploadToAWS(profileImgFile, "/profile_bg");
    }

    return obj;
  }
);

export default uploadUserProfile;
