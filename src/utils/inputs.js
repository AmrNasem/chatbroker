import {
  faEnvelope,
  faLock,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export const newProduct = [
  {
    id: "category_id",
    label: "نوع المنتج",
    getOptions: (data) => {
      return data.categories;
    },
    validate: (value) => value,
  },
  {
    id: "title",
    label: "اسم المنتج",
    message: "برجاء أدخل اسم المنتج (لايقل عن 5 أحرف ولا يزيد عن 70 حرف).",
    validate: (value = "") => {
      const text = value
        .trim()
        .split(" ")
        .filter((l) => l)
        .join(" ");
      return !(text.length > 70 || text.length < 5);
    },
  },
  {
    flex: true,
    value: [
      {
        id: "duration",
        label: "مدة الحجز",
        type: "number",
        message: "برجاء أدخل مدة الحجز.",
        validate: (value = "") => value.length && +value > 0,
      },
      {
        id: "enum_durations",
        getOptions: (data) => data.durationOptions,
        validate: (value) => value,
      },
    ],
  },
  {
    flex: true,
    value: [
      {
        id: "amount",
        label: "سعر الحجز",
        subLabel: "بالجنيه المصري",
        type: "number",
        message: "برجاء أدخل سعر الحجز.",
        validate: (value = "") => value.length && +value > 0,
      },
      {
        id: "discount",
        label: "خصم",
        subLabel: "اختياري",
        type: "number",
        message: "قيمة الخصم غير صحيحة.",
        validate: (value = "") => (value.length ? +value >= 0 : true),
      },
    ],
  },
  {
    flex: true,
    value: [
      {
        id: "gov",
        label: "المحافظة",
        getOptions: (data) => data.data,
        validate: (value) => value,
      },
      {
        id: "city_id",
        label: "المدينة",
        getOptions: (data, gov) => gov?.cities,
        validate: (value) => value,
      },
    ],
  },
  {
    id: "desc",
    message: "برجاء أدخل اسم المنتج (لايقل عن 30 كلمة ولا يزيد عن 700 كلمة).",
    label: "وصف المنتج",
    type: "textarea",
    validate: (value = "") => {
      const words = value
        .trim()
        .split(" ")
        .filter((w) => w);
      return !(words.length > 700 || words.length < 30);
    },
  },
  {
    id: "conditions",
    message: "برجاء أدخل شروط المنتج (لايقل عن 30 كلمة ولا يزيد عن 700 كلمة).",
    label: "شروط المنتج",
    type: "textarea",
    validate: (value = "") => {
      const words = value
        .trim()
        .split(" ")
        .filter((w) => w);
      return !(words.length > 700 || words.length < 30);
    },
  },
];

export const register = [
  {
    id: "name",
    icon: faUser,
    message: "الاسم غير صحيح!",
    placeholder: "الاسم",
    validate: (value = "") => /^[a-zA-Z_]\w{2,20}$/.test(value),
  },
  {
    type: "tel",
    id: "phone_number",
    icon: faPhone,
    message: "رقم الهاتف غير صحيح!",
    placeholder: "رقم الهاتف",
    validate: (value = "") => /^\d{6,}$/.test(value),
  },
  {
    type: "email",
    id: "email",
    icon: faEnvelope,
    message: "البريد الإلكتروني غير صحيح",
    placeholder: "البريد الإلكتروني",
    validate: (value = "") =>
      /^[a-zA-Z_]\w*(\.[a-zA-Z_]\w*)?@[a-zA-Z_]\w*\.[a-zA-Z]{2,}$/.test(value),
  },
  {
    type: "password",
    id: "password",
    icon: faLock,
    message: "كلمة السر غير صحيحة",
    placeholder: "كلمة السر",
    validate: (value = "") =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value),
  },
];

export const login = [
  {
    type: "email",
    id: "email",
    icon: faEnvelope,
    message: "البريد الإلكتروني غير صحيح",
    placeholder: "البريد الإلكتروني",
    validate: (value) =>
      /^[a-zA-Z_]\w*(\.[a-zA-Z_]\w*)?@[a-zA-Z_]\w*\.[a-zA-Z]{2,}$/.test(value),
  },
  {
    type: "password",
    id: "password",
    icon: faLock,
    message: "كلمة السر غير صحيحة",
    placeholder: "كلمة السر",
    validate: (value) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value),
  },
];
