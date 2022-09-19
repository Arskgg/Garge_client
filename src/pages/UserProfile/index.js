import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { useGetUserQuery } from "../../services/authApiSlice";
import { Divider } from "@mui/material";
import UserInfoCard from "./components/UserInfoCard";
import styles from "./UserProfile.module.scss";
import { useGetUserPostsQuery } from "../../services/postApiSlice";
import UserPostList from "./components/UserPostList";

const UserProfile = () => {
  const { id } = useParams();

  const {
    data: user,
    isLoading: isUserLoading,
    isError,
    error,
  } = useGetUserQuery(id);

  const { data: posts, isLoading: isUserPostsLoading } =
    useGetUserPostsQuery(id);

  if (isUserLoading || isUserPostsLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>{error.data.message}</div>;
  }

  return (
    <div className={styles.profile}>
      <div className={styles.profile__container}>
        <div className={styles.profile__user_info}>
          <UserInfoCard user={user} numberOfPosts={posts.length} />
        </div>

        <Divider id="car-list" />

        <div className={styles.profile__post_list}>
          <UserPostList posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
