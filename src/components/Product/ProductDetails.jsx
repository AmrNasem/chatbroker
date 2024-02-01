import { faHeart, faRectangleList } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./ProductDetails.module.css";
import {
  faStar,
  faLocationDot,
  faStarHalf,
} from "@fortawesome/free-solid-svg-icons";
import { memo, useMemo, useState } from "react";
import SingleReview from "./SingleReview";

const getStar = (index, rate) =>
  rate < index + 1 && index < rate ? (
    <div
      key={index}
      className="position-relative d-flex align-items-center justify-content-center"
    >
      <FontAwesomeIcon className="invisible" icon={faStar} />
      <FontAwesomeIcon
        icon={faStarHalf}
        className="position-absolute top-0 end-0 text-warning"
        style={{
          transform: "rotateY(180deg)",
        }}
      />
      <FontAwesomeIcon
        icon={faStarHalf}
        className="position-absolute top-0 start-0 text-secondary"
      />
    </div>
  ) : (
    <FontAwesomeIcon
      key={index}
      icon={faStar}
      className={`${index < rate ? "text-warning" : "text-secondary"}`}
    />
  );

const desc =
  "-- الهوية الشخصية: عادةً ما يُطلب من المستأجرين تقديم صورة من البطاقة الشخصية أو جواز السفر للتحقق من هويتهم.\n -- الراتب والدخل: قد يُطلب من المستأجرين تقديم إثبات عن مصدر دخلهم الشهري، مثل كشف حساب بنكي أو شهادة راتب أو وثيقة تؤكد قدرتهم على تحمل تكاليف الإيجار.\n -- دفعة تأمين: قد يُطلب من المستأجر دفع مبلغ تأمين يعادل شهر أو شهرين من قيمة الإيجار، ويعود هذا المبلغ إليه بعد انتهاء فترة العقد شريطة عدم وجود أضرار أو تلفيات في الشقة.\n -- مدة الإيجار: تحدد في العقد مدة الإيجار المتفق عليها بين المالك والمستأجر. قد تكون مدة سنة واحدة أو تجديدها تلقائيًا لفترة محددة، وقد يتم تحديد عقد سنوي أو شهري.\n -- الأضرار والتلفيات: عادةً ما يتم تحميل المستأجر بمسؤولية صيانة الشقة واستعادتها في حالتها الأصلية عند انتهاء فترة الإيجار، باستثناء التلفيات الناتجة عن الاستخدام العادي.\n -- قواعد المبنى: قد يتم توضيح بعض القواعد المنزلية التي يجب على المستأجر الالتزام بها، مثل قواعد الصمت أو الحظر على تربية الحيوانات الأليفة أو التدخين داخل الشقة.";
const itemsPerPage = 2;
const reviews = [
  {
    authorName: "دينا أحمد",
    rate: 3,
    title: "عنوان للتعليق",
    description: "جيد وسعره مناسب ولكن ليس كما هو في الصورة.",
  },
  {
    authorName: "محمد حجي",
    rate: 4,
    title: "عنوان للتعليق",
    description: "جيد وسعره مناسب ولكن ليس كما هو في الصورة.",
  },
  {
    authorName: "كريم إسماعيل",
    rate: 1,
    title: "عنوان للتعليق",
    description: "سيء للغاية ولن أشتريه مرة أخرى",
  },
  {
    authorName: "دينا أحمد",
    rate: 3,
    title: "عنوان للتعليق",
    description: "جيد وسعره مناسب ولكن ليس كما هو في الصورة.",
  },
  {
    authorName: "محمد حجي",
    rate: 4,
    title: "عنوان للتعليق",
    description: "جيد وسعره مناسب ولكن ليس كما هو في الصورة.",
  },
  {
    authorName: "كريم إسماعيل",
    rate: 1,
    title: "عنوان للتعليق",
    description: "سيء للغاية ولن أشتريه مرة أخرى",
  },
];

const ProductDetails = ({ className }) => {
  const [page, setPage] = useState(1);
  const averageRate = useMemo(
    () => reviews.reduce((prev, cur) => prev + cur.rate, 0) / reviews.length,
    []
  );
  return (
    <div className={className}>
      <div
        className={`d-flex gap-3 my-3 align-items-center justify-content-between`}
      >
        <div className="d-flex gap-2 align-items-center">
          <span className="border-0 d-block text-white bg-sec rounded-pill py-1 px-4">
            <FontAwesomeIcon className="ms-2" icon={faRectangleList} />
            التفاصيل
          </span>
          <button
            onClick={(e) => e.stopPropagation()}
            className={`border-0 rounded-circle ${classes["add-to-fav"]}`}
            title="أضف إلى المفضلة"
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </div>
        <button className="border-0 bg-sec text-white rounded-pill py-1 px-4">
          متاح
        </button>
      </div>
      <h6 className="my-2" style={{ color: "var(--product-text-color)" }}>
        فيلا الساحل الشمالي
      </h6>
      <h5 className="text-main mb-4">
        فيلا 2طابق مكونه من 4غرف نوم و1 ريسبشن كبير ومطبخ كبيرو لها حمام سباح
        والفيلا مجهزة باحدث الأجهزة والمفروشات العصرية
      </h5>
      <div className="d-flex gap-2 my-3 w-75 align-items-center justify-content-between">
        <h6 style={{ color: "#424750" }} className="fw-semibold">
          المكان
        </h6>
        <div className="d-flex gap-2 align-items-center">
          <FontAwesomeIcon className="text-main" icon={faLocationDot} />
          <span
            className="d-block"
            style={{ color: "var(--product-text-color" }}
          >
            الساحل الشمالي / قطعة أولى
          </span>
        </div>
      </div>
      <div className="d-flex gap-2 my-3 w-75 align-items-center justify-content-between">
        <h6 style={{ color: "#424750" }} className="fw-semibold">
          السعر
        </h6>
        <div className="d-flex gap-2 align-items-center">
          <h6 className="text-main mb-0">5000 جنيه</h6>
          <p className="text-sec mb-0">لمدة 1 يوم</p>
        </div>
      </div>
      <div className="my-3">
        <h6 className="text-main">شروط الحجز</h6>
        <div
          style={{ maxHeight: "350px" }}
          className=" overflow-auto scrollbar-none p-2 border my-3 rounded-3"
        >
          {desc.split("\n").map((text, i) => (
            <p
              key={i}
              className="my-3"
              style={{
                color: "var(--product-text-color)",
                fontSize: "0.95rem",
              }}
            >
              {text}
            </p>
          ))}
        </div>
      </div>
      <div className="my-5">
        <h5 className="text-center">مراجعة المستخدمين</h5>
        <div className="d-flex gap-2 align-items-center justify-content-center">
          <div
            className="d-flex align-items-center"
            style={{ gap: "2px", fontSize: "0.8rem" }}
          >
            {[...Array(5).keys()].map((i) => getStar(i, averageRate))}
          </div>
          <span style={{ fontSize: "0.95rem" }} className="fw-semibold d-block">
            {parseInt(averageRate) === averageRate
              ? averageRate
              : averageRate.toFixed(1)}{" "}
            من 5
          </span>
        </div>
        <div>
          {reviews.slice(0, page * itemsPerPage).map((review, i) => (
            <SingleReview key={i} review={review} />
          ))}
        </div>
        {page < Math.ceil(reviews.length / itemsPerPage) && (
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className={`btn text-main d-block border-0 mx-auto my-5 fw-semibold`}
            style={{
              backgroundColor: "#D9D9D9",
            }}
          >
            مشاهدة المزيد
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(ProductDetails);
