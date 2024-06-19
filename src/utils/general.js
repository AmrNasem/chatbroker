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
  const availableExtensions = ["png", "jpg", "jpeg", "bmp", "mp4", "avi", "mov", "mkv", "webm", "ogg"];
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
