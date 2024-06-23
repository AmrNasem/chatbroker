import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import ProductPreview from "../components/Product/ProductPreview";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "../components/Skeleton/Skeleton";
import { fetchCategories } from "../store/categories-slice";
import { backend } from "../App";
import Spinner from "../UI/Spinner";
import { validateImages } from "../utils/general";
import NewProductInput from "../components/Product/NewProductInput";
import { useNavigate } from "react-router-dom";
import {
  newProductBefore as beforeInputs,
  newProductAfter as afterInputs,
} from "../utils/inputs";
import Alert from "../UI/Alert";

const GetSelect = memo(
  ({ className, action, pre, formData, input, valid, onBlur, onChange }) => {
    const options = useMemo(
      () => pre.data && input.getOptions(pre.data, formData.gov),
      [pre.data, formData.gov, input]
    );

    const handleSelectChange = useCallback(
      (e) => onChange(e, true),
      [onChange]
    );

    return pre.error ? (
      <p
        style={{ fontSize: "0.9rem", flex: 1 }}
        className={`text-center rounded-2 py-1 text-danger fw-semibold mt-3 ${
          valid ? "" : "border border-danger invalid"
        } ${className}`}
      >
        {pre.error}،{" "}
        <button
          className="border-0 bg-transparent text-sec fw-semibold"
          type="button"
          onClick={action}
        >
          حاول مرة أخرى
        </button>
      </p>
    ) : pre.loading ? (
      <Skeleton
        className={`my-3 ${className}`}
        style={{ height: "1.3rem", flex: 1 }}
      />
    ) : (
      options && (
        <NewProductInput
          {...input}
          onBlur={onBlur}
          onChange={handleSelectChange}
          options={options}
          value={formData[input.id]}
          valid={valid}
          className={className}
        />
      )
    );
  }
);

const modelsBtns = [
  {
    id: "for_selling",
    text: "للبيع",
  },
  {
    id: "for_swapping",
    text: "للتبديل",
  },
  {
    id: "for_renting",
    text: "للإيجار",
  },
];

const NewProduct = () => {
  const {
    categories,
    loading: catsLoading,
    error: catsError,
  } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [pre, setPre] = useState({ data: null, loading: true, error: "" });

  const [images, setImages] = useState({ value: [], invalid: "" });
  const [formData, setFormData] = useState({
    for_renting: 1,
    for_swapping: 0,
    for_selling: 0,
  });
  const [inputsTouched, setInputsTouched] = useState({});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [closing, setClosing] = useState(false);

  const fetchGovs = useCallback(async () => {
    try {
      setPre((prev) => ({ ...prev, loading: true, error: "" }));
      const res = await fetch(`${backend}/governorates`);
      const data = await res.json();
      if (!res.ok || catsError) throw new Error("خطأ في التحميل!");
      setPre((prev) => ({
        ...prev,
        data: { ...prev.data, ...data },
        loading: false || catsLoading,
      }));
      setFormData((prev) => ({
        ...prev,
        gov: data.data[0],
        enum_durations: data.durationOptions[0],
        city_id: data.data[0].cities[0],
      }));
    } catch (err) {
      setPre((prev) => ({
        ...prev,
        error: err.message,
        loading: false || catsLoading,
      }));
    }
  }, [catsLoading, catsError]);

  useEffect(() => {
    fetchGovs();
  }, [fetchGovs]);

  useEffect(() => {
    if (pre.data?.categories)
      setFormData((prev) => ({ ...prev, category_id: pre.data.categories[0] }));
  }, [pre.data?.categories]);

  useEffect(() => {
    if (categories)
      setPre((prev) => ({ ...prev, data: { ...prev.data, categories } }));
    else dispatch(fetchCategories());
  }, [categories, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const areImagesInvalid = validateImages(images.value);
    setImages((prev) => ({ ...prev, invalid: areImagesInvalid }));

    const validate = (input) => {
      if (!input.model || !!formData[input.model])
        return input.validate(formData[input.id]);
      return true;
    };

    const isFormValid =
      [...beforeInputs, ...afterInputs].every((input) => {
        if (input.flex) return input.value.every(validate);
        else {
          return validate(input);
        }
      }) && !areImagesInvalid;

    console.log(formData, images);

    if (isFormValid) {
      const formdata = new FormData();
      images.value.forEach((img) => {
        formdata.append(`images[]`, img.file, img.file.name);
      });
      formdata.append("available", 1); // Static
      formdata.append("location", "123"); // Static

      for (const key in formData) {
        switch (key) {
          case "gov":
            break;
          case "category_id":
          case "city_id":
            formdata.append(key, formData[key].id);
            break;
          default:
            formdata.append(key, formData[key]);
            break;
        }
      }
      try {
        setLoading(true);
        const res = await fetch(`${backend}/products/store`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: formdata,
        });
        if (!res.ok) throw new Error("لم تتم إضافة المنتج!");
        const newProduct = await res.json();
        console.log(newProduct);
        navigate(`/product/${newProduct.product.id}`);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    } else {
      const allTouched = {};
      [...beforeInputs, ...afterInputs].forEach((input) => {
        if (input.flex)
          input.value.forEach(
            (input2) =>
              (!input2.model || !!formData[input2.model]) &&
              (allTouched[input2.id] = true)
          );
        else
          (!input.model || !!formData[input.model]) &&
            (allTouched[input.id] = true);
      });
      setInputsTouched(allTouched);
    }
  };

  const handleBlur = useCallback(
    (e) => setInputsTouched((prev) => ({ ...prev, [e.target.id]: true })),
    []
  );

  const handleChange = useCallback(
    (e, select) =>
      setFormData((prev) => ({
        ...prev,
        [e.target.id]: select ? JSON.parse(e.target.value) : e.target.value,
      })),
    []
  );

  const handleClosure = () => {
    setClosing(true);
    setTimeout(() => {
      setError(null);
      setClosing(false);
    }, 300);
  };

  const handleModelSwitch = (e) => {
    const currentModels = modelsBtns.filter((btn) => formData[btn.id]);
    if (currentModels.length === 1 && currentModels[0].id === e.target.id)
      return;

    setFormData((prev) => ({
      ...prev,
      [e.target.id]: prev[e.target.id] ? 0 : 1,
    }));
  };

  const getContent = (input, className) => {
    if (input.getOptions)
      return (
        <GetSelect
          key={input.id}
          pre={pre}
          action={fetchGovs}
          input={input}
          formData={formData}
          valid={!inputsTouched[input.id] || input.validate(formData[input.id])}
          onChange={handleChange}
          onBlur={handleBlur}
          className={className}
        />
      );

    return (
      <NewProductInput
        key={input.id}
        {...input}
        className={`flex-grow-1 ${className}`}
        value={formData[input.id]}
        valid={!inputsTouched[input.id] || input.validate(formData[input.id])}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    );
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
          {beforeInputs.map((input, i) => {
            if (input.flex && input.value.find((inp) => formData[inp.model]))
              return (
                <div
                  key={i}
                  className="d-flex flex-wrap my-2 gap-2 align-items-center"
                >
                  {input.value.map(
                    (childInput) =>
                      (!childInput.model || !!formData[childInput.model]) &&
                      getContent(childInput)
                  )}
                </div>
              );

            return (
              (!input.model || !!formData[input.model]) &&
              getContent(input, "my-4")
            );
          })}
          <div className="my-4">
            <label>النموذج</label>
            <div className="d-flex gap-3 my-2 align-items-center">
              {modelsBtns.map((btn) => (
                <button
                  key={btn.id}
                  id={btn.id}
                  type="button"
                  onClick={handleModelSwitch}
                  className={`flex-grow-1 border p-2 ${
                    formData[btn.id] ? "text-sec border-sec" : "text-main"
                  } rounded-2 bg-transparent`}
                >
                  {btn.text}
                </button>
              ))}
            </div>
          </div>
          {afterInputs.map((input, i) => {
            if (input.flex) {
              if (input.value.some((inp) => formData[inp.model]))
                return (
                  <div
                    key={i}
                    className="d-flex flex-wrap my-4 gap-2 align-items-center"
                  >
                    {input.value.map(
                      (childInput) =>
                        (!childInput.model || !!formData[childInput.model]) &&
                        getContent(childInput)
                    )}
                  </div>
                );

              return null;
            }

            return (
              (!input.model || !!formData[input.model]) &&
              getContent(input, "my-4")
            );
          })}
          {loading ? (
            <Spinner color="var(--secondary-color)" className="mx-auto" />
          ) : (
            <button className="text-white bg-sec border-0 py-2 rounded-2 px-4 d-block mx-auto my-4">
              أضف الآن
            </button>
          )}
        </form>
      </div>
      {error && (
        <Alert closing={closing} closureHandler={handleClosure}>
          {error}
        </Alert>
      )}
    </main>
  );
};

export default memo(NewProduct);
