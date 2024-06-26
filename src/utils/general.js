export const setCookie = (name, value, timeToLiveMS) => {
  const expires = new Date(new Date().getTime() + timeToLiveMS).toUTCString();
  document.cookie = `${`${name}=${encodeURIComponent(value)}`}; expires=${expires}; path=/`;
};

export const deleteCookie = (name) => {
  setCookie(name, null, 0);
};

export const getCookie = (name) => {
  const targettedCookie = decodeURIComponent(document.cookie)
    .split(";")
    .find((cookie) => cookie.trim().split("=")[0] === name);
  return targettedCookie?.trim().split("=")[1];
};

export const validateMedia = (images, videos) => {
  const allowedImageExtensions = ["png", "jpg", "jpeg", "bmp"];
  const allowedVideoExtensions = ["mp4", "avi", "mov", "mkv", "webm", "ogg"];

  // Check if no images are uploaded
  if (!images.length) {
    return "Please upload product images.";
  }

  // Check maximum image upload limit
  if (images.length > 4) {
    return "You can upload a maximum of four images.";
  }

  // Check each image in the array
  for (let i = 0; i < images.length; i++) {
    const image = images[i];

    // Check if the image object or its file property exists
    if (!image || !image.file) {
      return "Invalid image format.";
    }

    const fileExtension = image.file.type.split("/")[1];

    // Check if it's a valid image extension
    if (image.file.type.startsWith("image/") && !allowedImageExtensions.includes(fileExtension)) {
      return `Image must be in one of the following formats: ${allowedImageExtensions.join(", ")}.`;
    }
  }


  // Check maximum video upload limit
  if (videos?.length > 1) {
    return "You can upload a maximum of one video.";
  }

  // Check each video in the array
  for (let i = 0; i < videos?.length; i++) {
    const video = videos[i];

    // Check if the video object or its file property exists
    if (!video || !video.file) {
      return "Invalid video format.";
    }

    const fileExtension = video.file.type.split("/")[1];

    // Check if it's a valid video extension
    if (video.file.type.startsWith("video/") && !allowedVideoExtensions.includes(fileExtension)) {
      return `Video must be in one of the following formats: ${allowedVideoExtensions.join(", ")}.`;
    }
  }

  return null; // Return null if all validations pass
};
