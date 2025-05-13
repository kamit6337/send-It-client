import getMediaUrlForPostsSchema, {
  getMediaUrlForPostsDataQuery,
} from "@/graphql/files/getMediaUrlForPostsSchema";
import getGraphql from "../api/graphql";
import axios from "axios";
import getMediaUrlSchema, {
  getMediaUrlDataQuery,
} from "@/graphql/files/getMediaUrlSchema";
import generateVideoThumbnail from "../javascript/generateVideoThumbnail";

const uploadVideoAndThumbnail = async (file: File | null) => {
  try {
    const obj = {
      mediaUrl: "",
      thumbnailUrl: "",
    };

    if (!file) return obj;

    const isVideo = file.type.startsWith("video/");

    if (!isVideo) return obj;

    const responseVideo = await getGraphql(getMediaUrlForPostsSchema, {
      type: "VIDEO",
    });

    const thumbnail = (await generateVideoThumbnail(file)) as File;

    const responseThumbnail = await getGraphql(getMediaUrlSchema, {
      folder: "THUMBNAIL",
    });

    const videoResult = responseVideo[getMediaUrlForPostsDataQuery];

    const thumbnailResult = responseThumbnail[getMediaUrlDataQuery];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", videoResult.apiKey);
    formData.append("timestamp", videoResult.timestamp);
    formData.append("signature", videoResult.signature);
    formData.append("eager", videoResult.eager);
    formData.append("folder", videoResult.folder);

    const uploadVideo = await axios.post(videoResult.url, formData);

    obj.mediaUrl = uploadVideo?.data?.secure_url;

    const formDataThumbnail = new FormData();
    formDataThumbnail.append("file", thumbnail);
    formDataThumbnail.append("api_key", thumbnailResult.apiKey);
    formDataThumbnail.append("timestamp", thumbnailResult.timestamp);
    formDataThumbnail.append("signature", thumbnailResult.signature);
    formDataThumbnail.append("eager", thumbnailResult.eager);
    formDataThumbnail.append("folder", thumbnailResult.folder);

    const uploadThumbnail = await axios.post(thumbnailResult.url, formData);

    obj.thumbnailUrl = uploadThumbnail?.data?.secure_url;

    return obj;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "");
  }
};

export default uploadVideoAndThumbnail;
