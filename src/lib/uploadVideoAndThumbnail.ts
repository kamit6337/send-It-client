import catchAsyncError from "./catchAsyncError";
import generateVideoThumbnail from "@/utils/generateVideoThumbnail";
import uploadToAWS from "./uploadToAWS";

const uploadVideoAndThumbnail = catchAsyncError(
  async (selectedFile: File | null) => {
    if (!selectedFile) {
      return {
        mediaUrl: "",
        thumbnailUrl: "",
      };
    }

    const thumbnail = (await generateVideoThumbnail(selectedFile)) as File;

    const promises = [
      uploadToAWS(selectedFile),
      uploadToAWS(thumbnail, "/thumbnail"),
    ];

    const [mediaUrl, thumbnailUrl] = await Promise.all(promises);

    return {
      mediaUrl,
      thumbnailUrl,
    };
  }
);

export default uploadVideoAndThumbnail;
