import getMediaUrlForImageSchema, {
  getMediaUrlForImageDataQuery,
} from "@/graphql/files/getMediaUrlForImageSchema";
import getMediaUrlForVideoSchema, {
  getMediaUrlForVideoDataQuery,
} from "@/graphql/files/getMediaUrlForVideoSchema";
import getGraphql from "@/utils/api/graphql";
import axios from "axios";

type FOLDER = "POST" | "CHAT" | "THUMBNAIL" | "PROFILE" | "PROFILE_BG";

const uploadImageOrVideo = async (file: File | null, folderName: FOLDER) => {
  try {
    if (!file) return "";

    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      throw new Error("Wrong File type send");
    }

    let response;

    if (isImage) {
      response = await getGraphql(
        getMediaUrlForImageSchema,
        getMediaUrlForImageDataQuery,
        { folder: folderName }
      );
    } else if (isVideo) {
      response = await getGraphql(
        getMediaUrlForVideoSchema,
        getMediaUrlForVideoDataQuery,
        { folder: folderName }
      );
    }

    const { timestamp, signature, apiKey, folder, eager, url } = response;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("eager", eager);
    formData.append("folder", folder);

    const uploadRes = await axios.post(url, formData);

    return uploadRes?.data?.secure_url;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Issue in uploading Image"
    );
  }
};

export default uploadImageOrVideo;
