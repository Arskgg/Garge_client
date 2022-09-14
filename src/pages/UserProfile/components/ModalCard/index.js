import { Divider } from "@mui/material";
import styles from "./ModalCard.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import Button from "../../../../components/Button";
import UserImg from "../../../../components/UserImg";
import FileUploadButton from "../../../../components/FileUploadButton";
import {
  useGetUserFollowersQuery,
  useUpdateUserMutation,
} from "../../../../services/authApiSlice";
import { useGetUserFollowingQuery } from "../../../../services/authApiSlice";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UserInfoModalCard = ({ user }) => {
  const navigate = useNavigate();

  const handleUserNavigate = () => {
    navigate(`/user/${user._id}`);
  };

  return (
    <div className={styles.user_modal}>
      <div className={styles.user_modal__container}>
        <div className={styles.user_modal__user_info_container}>
          <div onClick={handleUserNavigate} className={styles.user_modal__img}>
            {user.img ? (
              <img
                src={`${process.env.REACT_APP_API_URL}/${user.img}`}
                alt="user"
              />
            ) : (
              <UserImg username={user.username} />
            )}
          </div>
          <div
            onClick={handleUserNavigate}
            className={styles.user_modal__username}
          >
            {user.username}
          </div>
        </div>

        <div className={styles.user_modal__button}>
          <Button>Follow</Button>
        </div>
      </div>
    </div>
  );
};

const ModalCard = ({ show, type, close, user }) => {
  const { id } = useParams();

  const [uploadPhoto] = useUpdateUserMutation();

  const handleSelect = async (name, photo) => {
    const formData = new FormData();

    formData.append("img", photo[0]);

    try {
      await uploadPhoto({ userId: user.id, userData: formData });
    } catch (error) {}
  };

  if (show) document.body.style.overflow = "hidden";
  else document.body.style.overflow = "unset";

  const { data: followers, isLoading: isFollowersLoading } =
    useGetUserFollowersQuery(id);
  const { data: following, isLoading: isFollowingLoading } =
    useGetUserFollowingQuery(id);

  if (isFollowersLoading || isFollowingLoading) {
    return <></>;
  }

  return (
    <div
      onClick={close}
      style={show ? { display: "flex" } : { display: "none" }}
      className={styles.modal}
    >
      <div className={styles.container}>
        <div className={styles.title__container}>
          <div className={styles.title__content}>{type}</div>

          <div onClick={close} className={styles.title__close_modal_icon}>
            <CloseIcon />
          </div>
        </div>

        <Divider />

        {type === "Change profile photo" && (
          <>
            <div className={styles.upload_btn}>
              <FileUploadButton name="img" onSelect={handleSelect} />
            </div>
            <Divider />
            <div
              onClick={() => handleSelect("", "")}
              className={styles.remove_btn}
            >
              Remove profile photo
            </div>
            <Divider />
            <div onClick={close} className={styles.cancel_btn}>
              Cancel
            </div>
          </>
        )}

        {(type === "Followers" || type === "Following") && (
          <div className={styles.user_list}>
            {type === "Followers" &&
              !isFollowersLoading &&
              followers.map((user) => (
                <UserInfoModalCard key={user._id} user={user} />
              ))}

            {type === "Following" &&
              !isFollowingLoading &&
              following.map((user) => (
                <UserInfoModalCard key={user._id} user={user} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalCard;
