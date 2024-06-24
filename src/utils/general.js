export const setCookie = (name, value, timeToLiveMS) => {
  const expires = new Date(new Date().getTime() + timeToLiveMS).toUTCString();
  document.cookie = `${`${name}=${encodeURIComponent(
    value
  )}`}; expires=${expires}; path=/`;
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

export const validateImages = (images) => {
  const availableExtensions = ["png", "jpg", "jpeg", "bmp"];
  const violatedImage = images.find(
    (img) => !availableExtensions.includes(img.file.type.split("/")[1])
  );

  if (!images.length) return "برجاء أرفق صور المنتج.";
  else if (violatedImage)
    return `يجب أن تكون الصورة بإحدى الصيغ (${availableExtensions.join(
      ", "
    )}).`;
  else if (images.length > 2) return "يمكنك رفع صورتين فقط بحد أقصى";
  return null;
};
