import React, { useState } from "react";
import ProfileHeader from "./ProfileHeader";
import { useSelector } from "react-redux";

const fNameConstraint = (value) => /^[a-zA-Z0-9_]{3,20}$/.test(value);
const phoneConstraint = (value) => /^\d{6,}$/.test(value);
const emailConstraint = (value) =>
  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);

const PersonalData = () => {
  const [edit, setEdit] = useState(false);
  const {
    name: userName,
    phone_number,
    email: storedEmail,
  } = useSelector((state) => state.auth.user);
  const [image, setImage] = useState(require("../../assets/person.jpeg"));
  const [firstName, setFirstName] = useState({
    value: userName.split(" ")[0],
    valid: true,
  });
  const [lastName, setLastName] = useState({
    value: userName.split(" ").slice(1).join(" "),
    valid: true,
  });
  const [phone, setPhone] = useState({ value: phone_number, valid: true });
  const [email, setEmail] = useState({ value: storedEmail, valid: true });

  const handleChangePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      fNameConstraint(firstName.valid) &&
      emailConstraint(email.value) &&
      phoneConstraint(phone.value)
    ) {
      // Send request
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-light rounded-3 my-3 overflow-hidden">
        <ProfileHeader edit={edit} setEdit={setEdit} title="البيانات الشخصية" />
        <div style={{ maxWidth: "80%" }} className="mx-auto my-3">
          <div
            style={{ width: "90px", height: "90px" }}
            className="position-relative"
          >
            <img
              className="rounded-circle d-block w-100 h-100 object-fit-cover"
              src={image}
              alt=""
            />
            {edit && (
              <>
                <label
                  style={{ fontSize: "0.65rem" }}
                  className="d-block px-2 py-1 cursor-pointer bottom-0 end-0 translate-middle position-absolute bg-sec text-white border-0 rounded-pill"
                  htmlFor="change-photo"
                >
                  تغيير الصورة
                </label>
                <input
                  onChange={handleChangePhoto}
                  type="file"
                  id="change-photo"
                  hidden
                  accept="image/*"
                />
              </>
            )}
          </div>
          <div className="d-flex align-items-center gap-3 my-3">
            <div className="flex-grow-1">
              <label
                htmlFor="first"
                className="mb-1 text-secondary"
                style={{ fontSize: "0.85rem" }}
              >
                الاسم الأول
                {edit && (
                  <span className="d-inline-block text-danger me-1 fw-semibold">
                    *
                  </span>
                )}
              </label>
              <input
                disabled={!edit}
                value={firstName.value}
                onChange={(e) =>
                  setFirstName({
                    value: e.target.value,
                    valid: fNameConstraint(e.target.value),
                  })
                }
                type="text"
                id="first"
                className={`border transition-main ${
                  firstName.valid ? "input-focus" : "invalid"
                } py-1 px-2 d-block w-100 rounded-2 outline-none`}
              />
            </div>
            <div className="flex-grow-1">
              <label
                htmlFor="last"
                className="mb-1 text-secondary"
                style={{ fontSize: "0.85rem" }}
              >
                الاسم الأخير
                <span style={{ color: "#aaa" }} className="d-inline-block me-2">
                  (اختياري)
                </span>
              </label>
              <input
                disabled={!edit}
                value={lastName.value}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                id="last"
                className="border transition-main input-focus py-1 px-2 d-block w-100 rounded-2 outline-none"
              />
            </div>
          </div>
          <div className="my-3">
            <label
              htmlFor="phone"
              className="mb-1 text-secondary"
              style={{ fontSize: "0.85rem" }}
            >
              رقم الهاتف
              {edit && (
                <span className="d-inline-block text-danger me-1 fw-semibold">
                  *
                </span>
              )}
            </label>
            <input
              disabled={!edit}
              value={phone.value}
              onChange={(e) =>
                setPhone({
                  value: e.target.value,
                  valid: phoneConstraint(e.target.value),
                })
              }
              type="text"
              id="phone"
              className={`border transition-main ${
                phone.valid ? "input-focus" : "invalid"
              } py-1 px-2 d-block w-100 rounded-2 outline-none`}
            />
          </div>
          <div className="my-3">
            <label
              htmlFor="email"
              className="mb-1 text-secondary"
              style={{ fontSize: "0.85rem" }}
            >
              البريد الإلكتروني
              {edit && (
                <span className="d-inline-block text-danger me-1 fw-semibold">
                  *
                </span>
              )}
            </label>
            <input
              disabled={!edit}
              value={email.value}
              onChange={(e) =>
                setEmail({
                  value: e.target.value,
                  valid: emailConstraint(e.target.value),
                })
              }
              type="text"
              id="email"
              className={`border transition-main ${
                email.valid ? "input-focus" : "invalid"
              } py-1 px-2 d-block w-100 rounded-2 outline-none`}
            />
          </div>
        </div>
      </div>
      {edit && (
        <button className="my-3 mx-auto d-block bg-sec text-white px-4 py-2 rounded-3 border-0">
          حفظ التعديلات
        </button>
      )}
    </form>
  );
};

export default PersonalData;
