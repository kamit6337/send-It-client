const findVideoDuration = (file: File): Promise<number> => {
  if (!file) return Promise.reject("No file provided");

  return new Promise((resolve, reject) => {
    const videoElement = document.createElement("video");
    videoElement.preload = "metadata";
    videoElement.src = URL.createObjectURL(file);

    // This function will be triggered when the video metadata is loaded
    videoElement.onloadedmetadata = () => {
      // Set the video duration in seconds
      const duration = Math.trunc(videoElement.duration);
      resolve(duration); // Resolve the promise with the duration
    };

    // Handle any errors that might occur while loading the video
    videoElement.onerror = (err) => {
      reject(err);
    };
  });
};

export default findVideoDuration;
