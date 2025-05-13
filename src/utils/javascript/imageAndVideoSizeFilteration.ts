const imageAndVideoSizeFilteration = (file: File) => {
  const isImage = file.type.startsWith("image/");
  const isVideo = file.type.startsWith("video/");

  if (isImage && file.size < 1024 * 1024) {
    // Image file < 1 MB
    return file;
  } else if (isVideo && file.size < 10 * 1024 * 1024) {
    // Video file < 10 MB

    const videoElement = document.createElement("video");
    videoElement.preload = "metadata";
    videoElement.src = URL.createObjectURL(file);
    // This function will be triggered when the video metadata is loaded
    videoElement.onloadedmetadata = () => {
      // Set the video duration in seconds
      console.log("video duration", videoElement.duration);
      return file;
    };
  } else {
    alert("File size must be less than 1 MB for images and 10 MB for videos");
  }
};

export default imageAndVideoSizeFilteration;
