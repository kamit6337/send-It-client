import { postReq } from "@/utils/api/api";
import catchAsyncError from "./catchAsyncError";
import axios from "axios";
import generateVideoThumbnail from "@/utils/generateVideoThumbnail";
import environment from "@/utils/environment";

const uploadVideoAndThumbnail = catchAsyncError(async (selectedFile) => {
  const type = selectedFile.type;

  const response = await postReq("/file", { fileType: type });

  const { url, fileKey, fileType } = response;

  // Upload file to S3 using pre-signed URL
  await axios.put(url, selectedFile, {
    headers: {
      "Content-Type": fileType,
    },
  });

  const mediaUrl = `https://${environment.AWS_S3_BUCKET}.s3.amazonaws.com/${fileKey}`;

  const thumbnail = await generateVideoThumbnail(selectedFile);

  const thumbnailResponse = await postReq("/file/thumbnail", {
    fileType: "image/png",
  });

  const { url: thumbnailPutUrl, fileKey: thumbnailFileKey } = thumbnailResponse;

  await axios.put(thumbnailPutUrl, thumbnail, {
    headers: {
      "Content-Type": "image/png",
    },
  });

  const thumbnailUrl = `https://${environment.AWS_S3_BUCKET}.s3.amazonaws.com/${thumbnailFileKey}`;

  console.log("thumbnailUrl", thumbnailUrl);

  return {
    mediaUrl,
    thumbnailUrl,
  };
});

export default uploadVideoAndThumbnail;
