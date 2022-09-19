import { useGetPostsQuery } from "../../services/postApiSlice";
import Loading from "../../components/Loading";
import PostList from "./components/PostList";
import { useDispatch, useSelector } from "react-redux";
import { clearSearch, selectSearch } from "../../store/searchSlice";
import { useEffect } from "react";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import styles from "./Home.module.scss";

const Home = () => {
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);
  const { data = [], isLoading, error, isFetching } = useGetPostsQuery(search);

  useEffect(() => {
    dispatch(clearSearch());
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className={styles.serach_result}>Error while fetching posts</div>
    );
  }

  if (isFetching) {
    return (
      <div className={styles.serach_result}>
        <Loading solo /> Searching Posts...
      </div>
    );
  }

  return (
    <section className={styles.home}>
      {data.posts.length === 0 ? (
        <div className={styles.serach_result}>
          Posts not found <CarCrashIcon />
        </div>
      ) : (
        <PostList posts={data.posts} />
      )}
    </section>
  );
};

export default Home;
