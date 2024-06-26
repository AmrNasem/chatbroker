import React, { useEffect, useState } from "react";
import ProfileHeader from "./ProfileHeader";
import { useDispatch, useSelector } from "react-redux";
import { backend } from "../../App";
import Spinner from "../../UI/Spinner";
import { updateUserData } from "../../store/auth-slice";
import { logout } from "../../store/auth-slice"; // adjust the path as needed
import { deleteCookie } from "../../utils/general"; // adjust the path as needed
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const fNameConstraint = (value) => /^[a-zA-Z0-9_]{3,20}$/.test(value);
const phoneConstraint = (value) => /^\d{6,}$/.test(value);
const emailConstraint = (value) =>
  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);

const PersonalData = ({ loading, data, error }) => {
  const token = useSelector((state) => state.auth.token);
  const [edit, setEdit] = useState(false);
  const [updateLoading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState({
    value: "",
    valid: true,
  });
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState({ value: "", valid: true });
  const [email, setEmail] = useState({ value: "", valid: true });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    deleteCookie("userData");
    let timerInterval;

    Swal.fire({
      title: "logged out successfully",
      // html: "Closing in <b></b> milliseconds.",
      timer: 1500,
      timerProgressBar: false,
      icon: "success",
      didOpen: () => {
        const timer = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          if (timer) {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  useEffect(() => {
    if (data) {
      setImage(data.image || require("../../assets/person.jpeg"));
      setFirstName((prev) => ({ ...prev, value: data.name }));
      setPhone((prev) => ({ ...prev, value: data.phone_number }));
      setEmail((prev) => ({ ...prev, value: data.email }));
    }
  }, [data]);

  const handleUploadImage = async (file) => {
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`${backend}/users/update_img`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!res.ok) throw new Error();
      console.log("Uploaded image successfully");
    } catch (err) {
      console.log(err.message);
    }
    setUploadingImage(false);
  };

  const handleChangePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        console.log(e.target.result);
        handleUploadImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      fNameConstraint(firstName.value) &&
      emailConstraint(email.value) &&
      phoneConstraint(phone.value)
    ) {
      const updateData = async () => {
        setLoading(true);
        try {
          const newData = {
            name: firstName.value,
            phone_number: phone.value,
            city_id: 1,
          };

          const res = await fetch(`${backend}/users/update_details`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ ...newData, address: "st" }),
          });
          if (!res.ok) throw new Error();
          setEdit(false);
          dispatch(updateUserData(newData));
        } catch (err) {
          console.log(err.message);
        }
        setLoading(false);
      };
      updateData();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-light rounded-3 my-3 overflow-hidden">
        <ProfileHeader
          edit={edit || loading || error}
          setEdit={setEdit}
          title="البيانات الشخصية"
        />
        {error ? (
          <p className="text-center text-danger">{error.message} البيانات!</p>
        ) : loading ? (
          <Spinner
            side={50}
            stroke={4}
            color="var(--secondary-color)"
            className="mx-auto my-3"
          />
        ) : (
          <div style={{ maxWidth: "80%" }} className="mx-auto my-3">
            <div
              style={{ width: "90px", height: "90px" }}
              className="position-relative"
            >
              {uploadingImage && (
                <div className="position-absolute top-50 start-50 translate-middle z-3">
                  <Spinner
                    side={25}
                    stroke={3}
                    color="var(--secondary-color)"
                  />
                </div>
              )}
              <img
                className={`rounded-circle ${
                  uploadingImage ? "opacity-50" : ""
                } d-block w-100 h-100 object-fit-cover`}
                src={image}
                alt=""
              />
              {!uploadingImage && (
                <label
                  style={{ fontSize: "0.65rem" }}
                  className="d-block px-2 py-1 cursor-pointer bottom-0 end-0 translate-middle position-absolute bg-sec text-white border-0 rounded-pill"
                  htmlFor="change-photo"
                >
                  تغيير الصورة
                </label>
              )}
              <input
                onChange={handleChangePhoto}
                type="file"
                id="change-photo"
                hidden
                accept="image/*"
              />
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
                  <span
                    style={{ color: "#aaa" }}
                    className="d-inline-block me-2"
                  >
                    (اختياري)
                  </span>
                </label>
                <input
                  disabled={!edit}
                  value={lastName}
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
            <div
              className="d-flex justify-content-end mt-5"
              style={{ width: "100%" }}
            >
              {/* Your existing personal data content */}
              <button
                onClick={handleLogout}
                type="button"
                className="p-2 rounded"
                style={{ color: "#bb0000", border: "1px solid #bb0000" }}
              >
                <FontAwesomeIcon icon={faRightFromBracket} /> Logout
              </button>
            </div>
          </div>
        )}
      </div>
      {edit &&
        (updateLoading ? (
          <Spinner
            side={45}
            stroke={4}
            color="var(--secondary-color)"
            className="mx-auto"
          />
        ) : (
          <button
            type="submit"
            className="my-3 mx-auto d-block bg-sec text-white px-4 py-2 rounded-3 border-0"
          >
            حفظ التعديلات
          </button>
        ))}
    </form>
  );
};

export default PersonalData;
