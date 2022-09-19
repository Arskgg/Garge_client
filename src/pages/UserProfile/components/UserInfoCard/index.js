import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import styles from "./UserInfoCard.module.scss";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../store/authSlice";
import Button from "../../../../components/Button";
import { useFollowUserMutation } from "../../../../services/authApiSlice";
import { useState } from "react";
import UserImg from "../../../../components/UserImg";
import ModalCard from "../ModalCard";

const UserInfoCard = ({ user, numberOfPosts }) => {
  const [toggleModal, setToggleModal] = useState(false);
  const [modalType, setModalType] = useState("Change profile photo");

  const hanleModal = (e) => {
    if (e.target.name === "Followers") {
      setModalType(e.target.name);
    } else if (e.target.name === "Following") {
      setModalType(e.target.name);
    } else {
      setModalType("Change profile photo");
    }
    setToggleModal(true);
  };

  const closeModal = () => {
    setToggleModal(false);
  };

  const authUser = useSelector(selectCurrentUser);

  const [followUser] = useFollowUserMutation();

  const handleFollow = async () => {
    await followUser({ userId: user.id, followerId: authUser.id });
  };

  return (
    <div className={styles.card}>
      <div className={styles.card__container}>
        <div className={styles.card__img}>
          {user.img ? (
            <img
              src={`${process.env.REACT_APP_API_URL}/${user.img}`}
              alt="user"
            />
          ) : (
            <UserImg username={user.username} />
          )}
        </div>

        <div className={styles.card__info}>
          <div className={styles.card__username_container}>
            <div className={styles.card__username}>{user.username}</div>

            {authUser?.id &&
              authUser?.id !== user.id &&
              (user?.followers?.includes(authUser?.id) ? (
                <Button outlined onClick={handleFollow}>
                  Following
                </Button>
              ) : (
                <Button onClick={handleFollow}>Follow</Button>
              ))}

            {authUser?.id === user.id && (
              <div className={styles.card__settings_icon} onClick={hanleModal}>
                <ManageAccountsIcon />
              </div>
            )}
          </div>

          <div className={styles.card__social_container}>
            <div className={styles.card__social}>
              <div className={styles.card__social_number}>{numberOfPosts}</div>
              <a href="#car-list" className={styles.card__social_text}>
                Cars
              </a>
            </div>

            <div className={styles.card__social}>
              <div className={styles.card__social_number}>
                {user.followers ? user.followers.length : "0"}
              </div>
              <button
                onClick={hanleModal}
                className={styles.card__social_text}
                name="Followers"
              >
                Followers
              </button>
            </div>

            <div className={styles.card__social}>
              <div className={styles.card__social_number}>
                {user.follow ? user.follow.length : "0"}
              </div>
              <button
                onClick={hanleModal}
                className={styles.card__social_text}
                name="Following"
              >
                Following
              </button>
            </div>
          </div>
        </div>
      </div>

      <ModalCard
        show={toggleModal}
        user={user}
        close={closeModal}
        type={modalType}
      />
    </div>
  );
};

export default UserInfoCard;
