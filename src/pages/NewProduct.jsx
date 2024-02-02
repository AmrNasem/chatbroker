import React, { memo, useState } from "react";
import classes from "./NewProduct.module.css";
import ProductPreview from "../components/Product/ProductPreview";

const cats = ["أجهزة إلكترونية", "عقارات", "ملابس", "آثاث منزلي", "نقل بري"];
const units = ["ساعة", "يوم", "أسبوع", "شهر", "سنة"];
const govs = [
  "الدقهلية",
  "القاهرة",
  "الجيزة",
  "الشرقية",
  "الغربية",
  "القليوبية",
  "الفيوم",
];

const NewProduct = () => {
  const [category, setCategory] = useState(cats[0]);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(1);
  const [timeUnit, setTimeUnit] = useState(units[0]);
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [gov, setGov] = useState("");
  const [discription, setDescription] = useState("");
  const [constrains, setConstrains] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <main>
      <h4 className="text-main container mt-4">إضافة منتج</h4>
      <div className="container d-flex gap-5 my-4 flex-wrap flex-lg-nowrap">
        <ProductPreview setImages={setImages} images={images} />
        <form className="flex-grow-1" onSubmit={handleSubmit}>
          <div className="my-3">
            <label htmlFor="category" className="mb-2">
              نوع المنتج
            </label>
            <select
              id="category"
              className={`d-block p-2 rounded-2 outline-none border transition-main w-100 ${classes.input}`}
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              {cats.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="my-3">
            <label htmlFor="name" className="mb-2">
              اسم المنتج
            </label>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="اكتب هنا.."
              className={`d-block p-2 rounded-2 outline-none border transition-main w-100 ${classes.input}`}
            />
          </div>
          <div className="my-3 d-flex gap-3 flex-column flex-sm-row align-items-end">
            <div className="flex-grow-1">
              <label htmlFor="duration" className="mb-2">
                مدة الحجز
              </label>
              <input
                type="number"
                id="duration"
                onChange={(e) => setDuration(e.target.value)}
                value={duration}
                placeholder="اكتب هنا.."
                className={`d-block p-2 rounded-2 outline-none border transition-main w-100 ${classes.input}`}
              />
            </div>
            <select
              id="unit"
              className={`d-block flex-grow-1 p-2 rounded-2 outline-none border transition-main ${classes.input}`}
              onChange={(e) => setTimeUnit(e.target.value)}
              value={timeUnit}
            >
              {units.map((u, i) => (
                <option key={i} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
          <div className="my-3 d-flex gap-3 flex-column flex-sm-row align-items-end">
            <div className="flex-grow-1">
              <label htmlFor="price" className="mb-2">
                سعر الحجز{" "}
                <span className="d-inline-block me-1 text-black-50">
                  (بالجنيه المصري)
                </span>
              </label>
              <input
                type="number"
                id="price"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                placeholder="اكتب هنا.."
                className={`d-block p-2 rounded-2 outline-none border transition-main w-100 ${classes.input}`}
              />
            </div>
            <div className="flex-grow-1">
              <label htmlFor="discount" className="mb-2">
                خصم
                <span className="d-inline-block me-1 text-black-50">
                  (اختياري)
                </span>
              </label>
              <input
                type="number"
                id="discount"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                placeholder="اكتب هنا.."
                className={`d-block p-2 rounded-2 outline-none border transition-main w-100 ${classes.input}`}
              />
            </div>
          </div>
          <div className="my-3">
            <label htmlFor="gov" className="mb-2">
              المحافظة
            </label>
            <select
              id="gov"
              className={`d-block p-2 rounded-2 outline-none border transition-main w-100 ${classes.input}`}
              onChange={(e) => setGov(e.target.value)}
              value={gov}
            >
              {govs.map((g, i) => (
                <option key={i} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
          <div className="my-3">
            <label htmlFor="desc" className="mb-2">
              وصف المنتج
            </label>
            <textarea
              id="desc"
              cols="30"
              rows="10"
              onChange={(e) => setDescription(e.target.value)}
              value={discription}
              placeholder="اكتب هنا.."
              className={`d-block scrollbar-none p-2 rounded-2 outline-none border transition-main w-100 ${classes.input}`}
            ></textarea>
          </div>
          <div className="my-3">
            <label htmlFor="desc" className="mb-2">
              شروط المنتج
            </label>
            <textarea
              cols="30"
              rows="10"
              id="desc"
              onChange={(e) => setConstrains(e.target.value)}
              value={constrains}
              placeholder="اكتب هنا.."
              className={`d-block scrollbar-none p-2 rounded-2 outline-none border transition-main w-100 ${classes.input}`}
            ></textarea>
          </div>
          <button className="text-white bg-sec border-0 py-2 rounded-2 px-4 d-block mx-auto my-4">
            أضف الآن
          </button>
        </form>
      </div>
    </main>
  );
};

export default memo(NewProduct);
