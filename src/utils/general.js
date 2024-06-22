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
  const allowedImageExtensions = ["png", "jpg", "jpeg", "bmp"];
  const allowedVideoExtensions = ["mp4", "avi", "mov", "mkv", "webm", "ogg"];

  // Check if no images are uploaded
  if (!images.length) {
    return "Please upload product images.";
  }

  // Check maximum image upload limit
  if (images.length > 2) {
    return "You can upload a maximum of two images.";
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

    // Check if it's a valid video extension
    if (image.file.type.startsWith("video/") && !allowedVideoExtensions.includes(fileExtension)) {
      return `Video must be in one of the following formats: ${allowedVideoExtensions.join(", ")}.`;
    }
  }

  return null; // Return null if all validations pass
};


export const contacts = [
  {
    id: 0,
    image: require("../assets/person.jpeg"),
    name: "عمرو نسيم",
    date: "9:21م",
    messages: [
      {
        text: "كيف يمكنني التواصل معك",
        me: false,
      },
      {
        text: "أعجبني هذا المنتج",
        me: false,
      },
      {
        text: "يسرني سماع هذا",
        me: true,
      },
      {
        text: "عن طريق واتساب ولينكد إن",
        me: true,
      },
    ],
  },
  {
    id: 1,
    image: require("../assets/person.jpeg"),
    name: "عمر إيهاب",
    date: "9:21م",
    messages: [
      {
        text: "كيف يمكنني التواصل معك",
        me: false,
      },
      {
        text: "أعجبني هذا المنتج",
        me: false,
      },
      {
        text: "يسرني سماع هذا",
        me: true,
      },
      {
        text: "عن طريق واتساب ولينكد إن",
        me: true,
      },
      {
        text: "كيف يمكنني التواصل معك",
        me: false,
      },
      {
        text: "أعجبني هذا المنتج",
        me: false,
      },
      {
        text: "يسرني سماع هذا",
        me: true,
      },
      {
        text: "عن طريق واتساب ولينكد إن",
        me: true,
      },
      {
        text: "كيف يمكنني التواصل معك",
        me: false,
      },
      {
        text: "أعجبني هذا المنتج",
        me: false,
      },
      {
        text: "يسرني سماع هذا",
        me: true,
      },
      {
        text: "عن طريق واتساب ولينكد إن",
        me: true,
      },
      {
        text: "كيف يمكنني التواصل معك",
        me: false,
      },
      {
        text: "أعجبني هذا المنتج",
        me: false,
      },
      {
        text: "يسرني سماع هذا",
        me: true,
      },
      {
        text: "عن طريق واتساب ولينكد إن",
        me: true,
      },
    ],
  },
  {
    id: 2,
    image: require("../assets/person.jpeg"),
    name: "محمد حجي",
    date: "9:21م",
    messages: [
      {
        text: "كيف يمكنني التواصل معك",
        me: false,
      },
      {
        text: "أعجبني هذا المنتج",
        me: false,
      },
      {
        text: "يسرني سماع هذا",
        me: true,
      },
      {
        text: "عن طريق واتساب ولينكد إن",
        me: true,
      },
    ],
  },
  {
    id: 3,
    image: require("../assets/person.jpeg"),
    name: "مصطفى الشهاوي",
    date: "9:21م",
    messages: [
      {
        text: "كيف يمكنني التواصل معك",
        me: false,
      },
      {
        text: "أعجبني هذا المنتج",
        me: false,
      },
      {
        text: "يسرني سماع هذا",
        me: true,
      },
      {
        text: "عن طريق واتساب ولينكد إن",
        me: true,
      },
    ],
  },
  {
    id: 4,
    image: require("../assets/person.jpeg"),
    name: "محمد عبده",
    date: "9:21م",
    messages: [
      {
        text: "كيف يمكنني التواصل معك",
        me: false,
      },
      {
        text: "أعجبني هذا المنتج",
        me: false,
      },
      {
        text: "يسرني سماع هذا",
        me: true,
      },
      {
        text: "عن طريق واتساب ولينكد إن",
        me: true,
      },
    ],
  },
  {
    id: 5,
    image: require("../assets/person.jpeg"),
    name: "محمود الشبرواي",
    date: "9:21م",
    messages: [
      {
        text: "كيف يمكنني التواصل معك",
        me: false,
      },
      {
        text: "أعجبني هذا المنتج",
        me: false,
      },
      {
        text: "يسرني سماع هذا",
        me: true,
      },
      {
        text: "عن طريق واتساب ولينكد إن",
        me: true,
      },
    ],
  },
  {
    id: 6,
    image: require("../assets/person.jpeg"),
    name: "محمد جمال",
    date: "9:21م",
    messages: [
      {
        text: "كيف يمكنني التواصل معك",
        me: false,
      },
      {
        text: "أعجبني هذا المنتج",
        me: false,
      },
      {
        text: "يسرني سماع هذا",
        me: true,
      },
      {
        text: "عن طريق واتساب ولينكد إن",
        me: true,
      },
    ],
  },
  {
    id: 7,
    image: require("../assets/person.jpeg"),
    name: "محمد عدنان",
    date: "9:21م",
    messages: [
      {
        text: "كيف يمكنني التواصل معك",
        me: false,
      },
      {
        text: "أعجبني هذا المنتج",
        me: false,
      },
      {
        text: "يسرني سماع هذا",
        me: true,
      },
      {
        text: "عن طريق واتساب ولينكد إن",
        me: true,
      },
    ],
  },
  {
    id: 8,
    image: require("../assets/person.jpeg"),
    name: "ندى",
    date: "9:21م",
    messages: [
      {
        text: "كيف يمكنني التواصل معك",
        me: false,
      },
      {
        text: "أعجبني هذا المنتج",
        me: false,
      },
      {
        text: "يسرني سماع هذا",
        me: true,
      },
      {
        text: "عن طريق واتساب ولينكد إن",
        me: true,
      },
    ],
  },
  {
    id: 9,
    image: require("../assets/person.jpeg"),
    name: "منة بوريك",
    date: "9:21م",
    messages: [
      {
        text: "كيف يمكنني التواصل معك",
        me: false,
      },
      {
        text: "أعجبني هذا المنتج",
        me: false,
      },
      {
        text: "يسرني سماع هذا",
        me: true,
      },
      {
        text: "عن طريق واتساب ولينكد إن",
        me: true,
      },
    ],
  },
];
