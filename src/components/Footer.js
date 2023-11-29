import classes from "./Footer.module.css";
import {
  faAppStoreIos,
  faFacebookF,
  faGooglePlay,
  faInstagram,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../UI/Spinner";
import { memo, useEffect } from "react";
import { fetchCategories } from "../store/categories-slice";

const Footer = () => {
  const { categories, error } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!categories) dispatch(fetchCategories());
  }, [categories, dispatch]);

  return (
    <footer className={`text-white ${classes.footer}`}>
      <Container
        className={`d-flex justify-content-between flex-wrap gap-5 ${classes.container}`}
      >
        <div
          className={`d-flex justify-content-between flex-grow-1 flex-wrap gap-4 ${classes.right}`}
        >
          <div>
            <h5 className="pb-3">الأكثر زيارة</h5>
            <div className="d-flex flex-column mt-3 gap-2">
              {error ? (
                <p className="flex-grow-1 text-center fw-semibold my-2">
                  {error}
                </p>
              ) : categories ? (
                categories.slice(0, 5).map((cat) => (
                  <Link
                    key={cat.id}
                    to={`category/${cat.id}`}
                    className="text-decoration-none text-white"
                  >
                    {cat.title_ar}
                  </Link>
                ))
              ) : (
                <Spinner
                  stroke={3}
                  side={30}
                  className="mx-auto mx-sm-0"
                  color="var(--secondary-color)"
                />
              )}
            </div>
          </div>
          <div>
            <h5 className="pb-3">الخصوصية</h5>
            <div className="d-flex flex-column mt-3 gap-2">
              <Link className="text-decoration-none text-white">
                سياسة الضمان
              </Link>
              <Link className="text-decoration-none text-white">
                شروط الاسترجاع
              </Link>
              <Link className="text-decoration-none text-white">
                شروط الاستخدام
              </Link>
              <Link className="text-decoration-none text-white">
                شروط الإيجار
              </Link>
              <Link className="text-decoration-none text-white">
                شروط الخصوصية
              </Link>
            </div>
          </div>
        </div>
        <div className={classes.fill}></div>
        <div
          className={`d-flex justify-content-between flex-grow-1 flex-wrap gap-4 ${classes.left}`}
        >
          <div className="text-center d-flex flex-column gap-3">
            <h5 className="mb-4 fw-light">حمل تطبيقك من خلال</h5>
            <div className="mb-3">
              <div className="p-2 my-2 d-flex justify-content-between border rounded-2 border-white d-flex align-items-center gap-2">
                <p className="mb-0">من خلال متجر أبل</p>
                <FontAwesomeIcon className="fs-5" icon={faAppStoreIos} />
              </div>
              <div className="p-2 my-2 d-flex justify-content-between border rounded-2 border-white d-flex align-items-center gap-2">
                <p className="mb-0">من خلال متجر جوجل</p>
                <FontAwesomeIcon className="fs-5" icon={faGooglePlay} />
              </div>
            </div>
          </div>
          <div className="text-center">
            <h5 className="mb-4 fw-light">تواصل معنا</h5>
            <div
              className={`d-flex justify-content-center gap-3 justify-content-sm-between gap-1 mb-3 pt-2 ${classes.social}`}
            >
              <FontAwesomeIcon
                style={{ color: "var(--main-color)" }}
                className="bg-white rounded-circle p-2"
                icon={faInstagram}
              />
              <FontAwesomeIcon
                style={{ color: "var(--main-color)" }}
                className="bg-white rounded-circle p-2"
                icon={faWhatsapp}
              />
              <FontAwesomeIcon
                style={{ color: "var(--main-color)" }}
                className="bg-white rounded-circle p-2"
                icon={faTwitter}
              />
              <FontAwesomeIcon
                style={{ color: "var(--main-color)" }}
                className="bg-white rounded-circle p-2"
                icon={faFacebookF}
              />
            </div>
            <div className={`my-3 ${classes.contact}`}>
              <p className="fw-light mb-0">أو من خلال البريد الإلكتروني</p>
              <span className="fw-semibold d-block">info@lepgo.com</span>
            </div>
            <div className={`my-3 ${classes.contact}`}>
              <p className="fw-light mb-0">أو عبر الهاتف</p>
              <span className="fw-semibold d-block">+20123456789</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default memo(Footer);
