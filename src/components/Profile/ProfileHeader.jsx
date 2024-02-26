import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProfileHeader = ({ edit, title, setEdit }) => {
  return (
    <div>
      <div className="d-flex gap-2 justify-content-between align-items-center">
        <p
          style={{ borderRadius: "0 0 0 12px" }}
          className="text-main bg-sec py-1 px-3 mb-0"
        >
          {title}
        </p>
        {!edit && setEdit && (
          <button
            onClick={() => setEdit(true)}
            style={{ borderRadius: "0 0 12px 0" }}
            className="border-0 text-white bg-sec py-1 px-3 d-block"
          >
            <FontAwesomeIcon style={{ fontSize: "0.9rem" }} icon={faPen} />
            <div className="d-inline-block me-1">تعديل</div>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
