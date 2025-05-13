const generateVideoThumbnail = (videoFile: File, width = 180, height = 250) => {
  return new Promise((resolve, reject) => {
    const videoUrl = URL.createObjectURL(videoFile);
    const video = document.createElement("video");
    video.src = videoUrl;

    video.addEventListener("loadeddata", () => {
      // Seek to 1 second for thumbnail
      video.currentTime = 1;
    });

    video.addEventListener("seeked", () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");

      if (!context) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      context.drawImage(video, 0, 0, width, height);

      // // Convert canvas to data URL
      // const dataUrl = canvas.toDataURL("image/jpeg");
      // resolve(dataUrl);

      // Convert canvas to Blob
      canvas.toBlob((blob: Blob | null) => {
        if (blob) {
          const typedBlob = new Blob([blob], { type: "image/png" });
          resolve(typedBlob);
        } else {
          reject(new Error("Failed to create Blob from canvas"));
        }
      }, "image/png");
    });

    video.addEventListener("error", (error) => {
      reject(error);
    });
  });
};

export default generateVideoThumbnail;
