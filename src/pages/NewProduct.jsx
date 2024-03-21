import React, { memo, useEffect, useState } from "react";
import classes from "./NewProduct.module.css";
import ProductPreview from "../components/Product/ProductPreview";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "../components/Skeleton/Skeleton";
import { fetchCategories } from "../store/categories-slice";
import { backend } from "../App";
import Spinner from "../UI/Spinner";
import { validateImages } from "../utils/general";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

const units = ["hour", "day", "week", "month", "year"];
const govs = [
  "الدقهلية",
  "القاهرة",
  "الجيزة",
  "الشرقية",
  "الغربية",
  "القليوبية",
  "الفيوم",
];
// const text =
//   "She works the night by the water she is gonna astry so far away from my father's daughter. She just wants a life for her baby all on her own no one will come she's gonna save him. She tells him ooh love no one's ever gonna hurt you love I'm gonna give you all of my love nobody matters like you. She tell him your life ain't going be nothing like my life you're gonna grow and have a good life I'm gonna do what I've got to do. so rockabye baby rockabye I'm gonna rock you rockabye baby don't you cry somebody's got you. Now she gotta six-year old trying to keep him warm trying to keep out the cold. When he looks in her eyes he don't know he's safe when she says: she tells him ooh love. nobody's gonna hurt you love I'm gonna give you all of my love nobody matters like you. She tells him your life ain't going be nothing like my life you're gonna grow and have a good life I'm gonna do what I've got to do. so rockabye baby rockabye I'm gonna rock you.";

const NewProduct = () => {
  const {
    categories,
    loading: catsLoading,
    error,
  } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const [category, setCategory] = useState(null);
  const [title, setTitle] = useState({ value: "", valid: true });
  const [duration, setDuration] = useState({ value: "1", valid: true });
  const [timeUnit, setTimeUnit] = useState(units[0]);
  const [price, setPrice] = useState({ value: "", valid: true });
  const [discount, setDiscount] = useState("");
  const [gov, setGov] = useState("");
  const [description, setDescription] = useState({ value: "", valid: true });
  const [constraints, setConstraints] = useState({ value: "", valid: true });
  const [images, setImages] = useState({ value: [], invalid: "" });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!categories && !catsLoading && !error) dispatch(fetchCategories());
  }, [categories, catsLoading, error, dispatch]);

  useEffect(() => {
    if (categories) setCategory(categories[0]);
  }, [categories]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const areImagesInvalid = validateImages(images.value);
    setImages((prev) => ({ ...prev, invalid: areImagesInvalid }));

    if (!title.value.trim()) setTitle((prev) => ({ ...prev, valid: false }));
    if (!description.value.trim())
      setDescription((prev) => ({ ...prev, valid: false }));
    if (!constraints.value.trim())
      setConstraints((prev) => ({ ...prev, valid: false }));

    if (!price.value.trim()) setPrice((prev) => ({ ...prev, valid: false }));
    if (!duration.value.trim())
      setDuration((prev) => ({ ...prev, valid: false }));
    if (
      !areImagesInvalid &&
      title.value.trim() &&
      description.value.trim() &&
      constraints.value.trim() &&
      price.value.trim() &&
      duration.value.trim()
    ) {
      const formData = new FormData();
      formData.append("title", title.value);
      formData.append("desc", description.value);
      formData.append("conditions", constraints.value);
      formData.append("category_id", category.id);
      formData.append("available", 1); // Static
      formData.append("location", "123"); // Static
      images.value.forEach((img) => {
        formData.append(`images[]`, img.file, img.file.name);
      });
      formData.append("model", "product"); // Static
      formData.append("amount", price.value);
      formData.append("duration", duration.value);
      formData.append("city_id", 1); // Static
      formData.append("enum_durations", timeUnit);
      formData.append("discount", discount);
      try {
        setLoading(true);
        const res = await fetch(`${backend}/products/store`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: formData,
        });
        console.log(res);
        if (!res.ok) throw new Error();
        console.log(await res.json());
      } catch (err) {
        console.log(err.message);
      }
      setLoading(false);
    }
  };
  return (
    <main>
      <h4 className="text-main container mt-4">إضافة منتج</h4>
      <div className="container d-flex gap-5 my-4 flex-wrap flex-lg-nowrap">
        <ProductPreview
          setImages={setImages}
          images={images.value}
          invalid={images.invalid}
        />
        <form className="flex-grow-1" onSubmit={handleSubmit}>
          {error ? (
            <p
              style={{ fontSize: "0.9rem" }}
              className="text-center text-danger fw-semibold"
            >
              {error}،{" "}
              <button
                className="border-0 bg-transparent text-sec fw-semibold"
                type="button"
                onClick={() => dispatch(fetchCategories())}
              >
                حاول مرة أخرى
              </button>
            </p>
          ) : catsLoading ? (
            <Skeleton className="my-3" style={{ height: "1.3rem" }} />
          ) : (
            categories && (
              <div className="my-4">
                <label htmlFor="category" className="mb-2">
                  نوع المنتج
                </label>
                <select
                  id="category"
                  className={`d-block p-2 rounded-2 outline-none border transition-main w-100 ${classes.input}`}
                  onChange={(e) => setCategory(JSON.parse(e.target.value))}
                  value={JSON.stringify(category)}
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={JSON.stringify(cat)}>
                      {cat.title}
                    </option>
                  ))}
                </select>
              </div>
            )
          )}
          <div className="my-4">
            <label htmlFor="title" className="mb-2">
              اسم المنتج
            </label>
            <input
              type="text"
              id="title"
              onChange={(e) => setTitle({ value: e.target.value, valid: true })}
              value={title.value}
              placeholder="اكتب هنا.."
              className={`d-block p-2 rounded-2 outline-none border ${
                title.valid ? "" : "invalid"
              } transition-main w-100 ${classes.input}`}
            />
            {!title.valid && (
              <p
                style={{ fontSize: "0.9rem" }}
                className="d-flex gap-1 align-items-center mt-1 mb-0 fw-semibold text-danger"
              >
                <FontAwesomeIcon icon={faCircleExclamation} />
                <span className="d-block">برجاء أدخل اسم المنتج.</span>
              </p>
            )}
          </div>
          <div className="my-4">
            <label htmlFor="duration" className="mb-2">
              مدة الحجز
            </label>
            <div className="d-flex gap-2">
              <input
                type="number"
                id="duration"
                onChange={(e) =>
                  setDuration({ value: e.target.value, valid: true })
                }
                value={duration.value}
                placeholder="اكتب هنا.."
                className={`d-block p-2 w-50 ${
                  duration.valid ? "" : "invalid"
                } rounded-2 outline-none border transition-main ${
                  classes.input
                }`}
              />
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
            {!duration.valid && (
              <p
                style={{ fontSize: "0.9rem" }}
                className="d-flex gap-1 align-items-center mt-1 mb-0 fw-semibold text-danger"
              >
                <FontAwesomeIcon icon={faCircleExclamation} />
                <span className="d-block">برجاء أدخل مدة الحجز.</span>
              </p>
            )}
          </div>
          <div className="my-4">
            <div className="d-flex gap-2 align-items-end">
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
                  onChange={(e) =>
                    setPrice({ value: e.target.value, valid: true })
                  }
                  value={price.value}
                  placeholder="اكتب هنا.."
                  className={`d-block p-2 rounded-2 outline-none ${
                    price.valid ? "" : "invalid"
                  } border transition-main w-100 ${classes.input}`}
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
            {!price.valid && (
              <p
                style={{ fontSize: "0.9rem" }}
                className="d-flex gap-1 align-items-center mt-1 mb-0 fw-semibold text-danger"
              >
                <FontAwesomeIcon icon={faCircleExclamation} />
                <span className="d-block">برجاء أدخل قيمة الحجز.</span>
              </p>
            )}
          </div>
          <div className="my-4">
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
          <div className="my-4">
            <label htmlFor="desc" className="mb-2">
              وصف المنتج
            </label>
            <textarea
              id="desc"
              cols="30"
              rows="10"
              onChange={(e) =>
                setDescription({ value: e.target.value, valid: true })
              }
              value={description.value}
              placeholder="اكتب هنا.."
              className={`d-block scrollbar-none p-2 rounded-2 outline-none ${
                description.valid ? "" : "invalid"
              } border transition-main w-100 ${classes.input}`}
            ></textarea>
            {!description.valid && (
              <p
                style={{ fontSize: "0.9rem" }}
                className="d-flex gap-1 align-items-center mt-1 mb-0 fw-semibold text-danger"
              >
                <FontAwesomeIcon icon={faCircleExclamation} />
                <span className="d-block">برجاء أدخل وصف المنتج.</span>
              </p>
            )}
          </div>
          <div className="my-4">
            <label htmlFor="constraints" className="mb-2">
              شروط المنتج
            </label>
            <textarea
              cols="30"
              rows="10"
              id="constraints"
              onChange={(e) =>
                setConstraints({ value: e.target.value, valid: true })
              }
              value={constraints.value}
              placeholder="اكتب هنا.."
              className={`d-block scrollbar-none p-2 rounded-2 outline-none ${
                constraints.valid ? "" : "invalid"
              } border transition-main w-100 ${classes.input}`}
            ></textarea>
            {!constraints.valid && (
              <p
                style={{ fontSize: "0.9rem" }}
                className="d-flex gap-1 align-items-center mt-1 mb-0 fw-semibold text-danger"
              >
                <FontAwesomeIcon icon={faCircleExclamation} />
                <span className="d-block">برجاء أدخل شروط المنتج.</span>
              </p>
            )}
          </div>
          {loading ? (
            <Spinner color="var(--secondary-color)" className="mx-auto" />
          ) : (
            <button className="text-white bg-sec border-0 py-2 rounded-2 px-4 d-block mx-auto my-4">
              أضف الآن
            </button>
          )}
        </form>
      </div>
    </main>
  );
};

export default memo(NewProduct);
