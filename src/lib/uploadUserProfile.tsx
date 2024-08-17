import { postReq } from "@/utils/api/api";
import catchAsyncError from "./catchAsyncError";
import axios from "axios";
import environment from "@/utils/environment";

const uploadUserProfile = catchAsyncError(async (profileImgFile, bgImgFile) => {
  const obj = {
    photo: "",
    bg_photo: "",
  };

  if (profileImgFile) {
    const response = await postReq("/file/profile", {
      fileType: profileImgFile.type,
    });

    const { url, fileKey, fileType } = response;

    // Upload file to S3 using pre-signed URL
    await axios.put(url, profileImgFile, {
      headers: {
        "Content-Type": fileType,
      },
    });

    const mediaUrl = `https://${environment.AWS_S3_BUCKET}.s3.amazonaws.com/${fileKey}`;

    obj.photo = mediaUrl;
  }

  if (bgImgFile) {
    const response = await postReq("/file/profile_bg", {
      fileType: bgImgFile.type,
    });

    const { url, fileKey, fileType } = response;

    // Upload file to S3 using pre-signed URL
    await axios.put(url, bgImgFile, {
      headers: {
        "Content-Type": fileType,
      },
    });
    const mediaUrl = `https://${environment.AWS_S3_BUCKET}.s3.amazonaws.com/${fileKey}`;
    obj.bg_photo = mediaUrl;
  }

  return obj;
});

export default uploadUserProfile;
