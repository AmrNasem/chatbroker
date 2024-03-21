import { faBox, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import PersonalData from "../components/Profile/PersonalData";
import MyProducts from "../components/Profile/MyProducts";
import { useEffect, useState } from "react";
import { backend } from "../App";
import { useSelector } from "react-redux";

const className = ({ isActive }) =>
  isActive
    ? `py-2 px-3 border text-decoration-none text-sec bg-white border-top-sec`
    : `py-2 px-3 border text-decoration-none text-secondary bg-light`;

const links = [
  {
    to: "data",
    label: "البيانات الشخصية",
    icon: <FontAwesomeIcon icon={faUser} />,
  },
  {
    to: "products",
    label: "منتجاتي",
    icon: <FontAwesomeIcon icon={faBox} />,
  },
];

const Profile = () => {
  const { token, user } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(profile);

  useEffect(() => {
    const getProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${backend}/users/get_user_profile/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("خطأ في تحميل ");
        const data = await res.json();
        console.log(data);
        setProfile(data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    getProfile();
  }, [user, token]);
  return (
    <main className="container my-3">
      <div className="d-flex align-items-center my-3">
        {links.map((link, i) => (
          <NavLink key={i} to={link.to} className={className}>
            {link.icon}
            <span className="d-inline-block me-2">{link.label}</span>
          </NavLink>
        ))}
      </div>
      <Routes>
        <Route path="" element={<Navigate replace to="data" />} />
        <Route
          path="data"
          element={
            <PersonalData
              loading={loading}
              data={profile?.user}
              error={error}
            />
          }
        />
        <Route
          path="products"
          element={
            <MyProducts
              loading={loading}
              products={profile?.products}
              error={error}
            />
          }
        />
      </Routes>
    </main>
  );
};

export default Profile;
