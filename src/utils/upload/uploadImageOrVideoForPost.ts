const uploadImageOrVideoForPost = async (file: File | null) => {
  try {
    if (!file) return "";
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "");
  }
};

export default uploadImageOrVideoForPost;
