import { faBox, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import PersonalData from "../components/Profile/PersonalData";
import MyProducts from "../components/Profile/MyProducts";

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
        <Route path="data" element={<PersonalData />} />
        <Route path="products" element={<MyProducts />} />
      </Routes>
    </main>
  );
};

export default Profile;
