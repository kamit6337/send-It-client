import uploadImageOrVideo from "@/lib/uploadImageOrVideo";
import findVideoDuration from "../javascript/findVideoDuration";
import generateVideoThumbnail from "../javascript/generateVideoThumbnail";

const uploadImageOrVideoForPost = async (file: File | null) => {
  try {
    const obj = {
      media: "",
      thumbnail: "",
      duration: 0,
    };

    if (!file) return obj;

    const isVideo = file.type.startsWith("video/");

    obj.media = await uploadImageOrVideo(file, "POST");

    if (isVideo) {
      obj.duration = await findVideoDuration(file);

      const thumbnail = (await generateVideoThumbnail(file)) as File; // image file

      obj.thumbnail = await uploadImageOrVideo(thumbnail, "THUMBNAIL");
    }

    return obj;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Issue in uploading Post media"
    );
  }
};

export default uploadImageOrVideoForPost;
