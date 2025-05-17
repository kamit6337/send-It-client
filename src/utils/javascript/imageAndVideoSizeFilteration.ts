const imageAndVideoSizeFilteration = (file: File) => {
  const isImage = file.type.startsWith("image/");
  const isVideo = file.type.startsWith("video/");

  if (isImage && file.size < 1024 * 1024) {
    // Image file < 1 MB
    return file;
  } else if (isVideo && file.size < 10 * 1024 * 1024) {
    // Video file < 10 MB
    return file;
  } else {
    alert("File size must be less than 1 MB for images and 10 MB for videos");
    return undefined; // Return undefined for files that don't meet criteria
  }
};

export default imageAndVideoSizeFilteration;
