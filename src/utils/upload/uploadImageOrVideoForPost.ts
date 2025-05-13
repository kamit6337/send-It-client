import getMediaUrlForPostsSchema from "@/graphql/files/getMediaUrlForPostsSchema";
import getGraphql from "../api/graphql";
import axios from "axios";

const uploadImageOrVideoForPost = async (file: File | null) => {
  try {
    if (!file) return "";

    // const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    const response = await getGraphql(getMediaUrlForPostsSchema, {
      type: isVideo ? "VIDEO" : "IMAGE",
    });

    const { timestamp, signature, apiKey, folder, eager, url } =
      response[getMediaUrlForPostsDataQuery];

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
    throw new Error(error instanceof Error ? error.message : "");
  }
};

export default uploadImageOrVideoForPost;
