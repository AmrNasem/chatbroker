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

export const validateMedia = (images, videos, images360) => {
  const allowedImageExtensions = ["png", "jpg", "jpeg", "bmp"];
  const allowedVideoExtensions = ["mp4", "avi", "mov", "mkv", "webm", "ogg"];
  const allowed360ImageExtensions = ["png", "jpg", "jpeg"];

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

  // Check if no videos are uploaded
  if (!videos.length) {
    return "Please upload a product video.";
  }

  // Check maximum video upload limit
  if (videos.length > 1) {
    return "You can upload a maximum of one video.";
  }

  // Check each video in the array
  for (let i = 0; i < videos.length; i++) {
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

  // Check if no 360 images are uploaded
  if (!images360.length) {
    return "Please upload 360-degree product images.";
  }

  // Check maximum 360 image upload limit
  if (images360.length > 4) {
    return "You can upload a maximum of four 360-degree images.";
  }

  // Check each 360 image in the array
  for (let i = 0; i < images360.length; i++) {
    const image360 = images360[i];

    // Check if the 360 image object or its file property exists
    if (!image360 || !image360.file) {
      return "Invalid 360-degree image format.";
    }

    const fileExtension = image360.file.type.split("/")[1];

    // Check if it's a valid 360 image extension
    if (image360.file.type.startsWith("image/") && !allowed360ImageExtensions.includes(fileExtension)) {
      return `360-degree image must be in one of the following formats: ${allowed360ImageExtensions.join(", ")}.`;
    }
  }

  return null; // Return null if all validations pass
};
