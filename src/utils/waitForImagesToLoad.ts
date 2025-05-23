const waitForImagesToLoad = (container: HTMLElement): Promise<void> => {
  const images = Array.from(container.querySelectorAll("img"));
  const unloadedImages = images.filter((img) => !img.complete);

  if (unloadedImages.length === 0) return Promise.resolve();

  return new Promise((resolve) => {
    let loadedCount = 0;

    unloadedImages.forEach((img) => {
      img.addEventListener("load", () => {
        loadedCount++;
        if (loadedCount === unloadedImages.length) {
          resolve();
        }
      });

      // Also handle cached error events
      img.addEventListener("error", () => {
        loadedCount++;
        if (loadedCount === unloadedImages.length) {
          resolve();
        }
      });
    });
  });
};

export default waitForImagesToLoad;
