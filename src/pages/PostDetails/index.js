import { useNavigate, useParams } from "react-router-dom";
import { useGetPostByIdQuery } from "../../services/postApiSlice";
import Loading from "../../components/Loading";
import Header from "./components/Header";
import Gallery from "./components/Gallery";
import CarInfo from "./components/CarInfo";
import styles from "./PostDetails.module.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion } from "framer-motion";
import { isBrowser } from "react-device-detect";

function PostDetails() {
  const { id } = useParams();
  const { data: post, isLoading } = useGetPostByIdQuery(id);
  const navigate = useNavigate();

  if (isLoading) {
    return <Loading />;
  }
  const imagesLinks = post.imgs.map(
    (image) => `${process.env.REACT_APP_API_URL}/${image}`
  );

  return (
    <div className={styles.post_details}>
      <Header post={post} />
      <Gallery images={imagesLinks} />
      <CarInfo post={post} />

      <motion.div
        className={styles.back_button}
        onClick={() => navigate(-1)}
        initial={{ opacity: 0, x: "-100px" }}
        animate={isBrowser ? { opacity: 1, x: "0" } : { opacity: 1, x: "0" }}
        transition={
          isBrowser
            ? {
                delay: "2.5",
                duration: "0.5",
                ease: "easeOut",
              }
            : {
                duration: "1",
                ease: "easeOut",
              }
        }
      >
        <motion.div
          className={styles.btn_hover}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <ArrowBackIcon />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default PostDetails;
