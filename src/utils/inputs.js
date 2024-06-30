import {
  faEnvelope,
  faLock,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export const newProductBefore = [
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
    validate: (value = " ") => {
      const text = value
        .trim()
        .split(" ")
        .filter((l) => l)
        .join(" ");
      return !(text.length > 70 || text.length < 5);
    },
  },
];

export const newProductAfter = [
  {
    flex: true,
    value: [
      {
        id: "duration",
        model: "for_renting",
        label: "مدة الحجز",
        type: "number",
        message: "برجاء أدخل مدة الحجز.",
        validate: (value = "") => value.length && +value > 0,
      },
      {
        id: "enum_durations",
        model: "for_renting",
        getOptions: (data) => data.durationOptions,
        validate: (value) => value,
      },
    ],
  },
  {
    flex: true,
    value: [
      {
        id: "rent_amount",
        model: "for_renting",
        label: "سعر الحجز",
        subLabel: "بالجنيه المصري",
        type: "number",
        message: "برجاء أدخل سعر الحجز.",
        validate: (value = "") => value.length && +value > 0,
      },
      {
        id: "rent_discount",
        model: "for_renting",
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
        id: "sell_amount",
        model: "for_selling",
        label: "سعر البيع",
        subLabel: "بالجنيه المصري",
        type: "number",
        message: "برجاء أدخل سعر البيع.",
        validate: (value = "") => value.length && +value > 0,
      },
      {
        id: "sell_discount",
        model: "for_selling",
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
        id: "swap_amount",
        model: "for_swapping",
        label: "سعر التبديل",
        subLabel: "بالجنيه المصري",
        type: "number",
        message: "برجاء أدخل سعر التبديل.",
        validate: (value = "") => value.length && +value > 0,
      },
      {
        id: "swap_discount",
        model: "for_swapping",
        label: "خصم",
        subLabel: "اختياري",
        type: "number",
        message: "قيمة الخصم غير صحيحة.",
        validate: (value = "") => (value.length ? +value >= 0 : true),
      },
    ],
  },
  {
    id: "swap_with",
    model: "for_swapping",
    label: "تبديل مع",
    message: "أدخل منتجًا تريده في المقابل.",
    validate: (value = "") => value.length && value.length <= 80,
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
    message: "برجاء أدخل اسم المنتج (لايقل عن 3 كلمة ولا يزيد عن 700 كلمة).",
    label: "وصف المنتج",
    type: "textarea",
    validate: (value = " ") => {
      const words = value
        .trim()
        .split(" ")
        .filter((w) => w);
      return !(words.length > 700 || words.length < 3);
    },
  },
  {
    id: "conditions",
    model: "for_renting",
    message: "برجاء أدخل شروط المنتج (لايقل عن 3 كلمة ولا يزيد عن 700 كلمة).",
    label: "شروط المنتج",
    type: "textarea",
    validate: (value = " ") => {
      const words = value
        .trim()
        .split(" ")
        .filter((w) => w);
      return !(words.length > 700 || words.length < 3);
    },
  },
];

export const register = [
  {
    id: "name",
    icon: faUser,
    message: "الاسم غير صحيح!",
    placeholder: "الاسم",
    validate: (value = "") => value.trim() || /^[a-zA-Z_]\w{2,20}$/.test(value),
  },
  {
    type: "tel",
    id: "phone_number",
    icon: faPhone,
    message: "رقم الهاتف غير صحيح!",
    placeholder: "رقم الهاتف",
    validate: (value = "") => value.trim() || /^\d{6,}$/.test(value),
  },
  {
    type: "email",
    id: "email",
    icon: faEnvelope,
    message: "البريد الإلكتروني غير صحيح",
    placeholder: "البريد الإلكتروني",
    validate: (value = "") =>
      value.trim() ||
      /^[a-zA-Z_]\w*(\.[a-zA-Z_]\w*)?@[a-zA-Z_]\w*\.[a-zA-Z]{2,}$/.test(value),
  },
  {
    type: "password",
    id: "password",
    icon: faLock,
    message: "كلمة السر غير مناسبة",
    placeholder: "كلمة السر",
    validate: (value = "") =>
      value.trim() ||
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
    validate: (value = "") =>
      value.trim() ||
      /^[a-zA-Z_]\w*(\.[a-zA-Z_]\w*)?@[a-zA-Z_]\w*\.[a-zA-Z]{2,}$/.test(value),
  },
  {
    type: "password",
    id: "password",
    icon: faLock,
    message: "كلمة السر غير صحيحة",
    placeholder: "كلمة السر",
    validate: (value = "") =>
      value.trim() ||
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value),
  },
];
