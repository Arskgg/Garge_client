import { useParams } from "react-router-dom";
import { useGetPostByIdQuery } from "../../services/postApiSlice";
import Loading from "../../components/Loading";
import Header from "./components/Header";
import Gallery from "./components/Gallery";
import CarInfo from "./components/CarInfo";

function PostDetails() {
  const { id } = useParams();
  const { data: post, isLoading } = useGetPostByIdQuery(id);

  if (isLoading) {
    return <Loading />;
  }
  const imagesLinks = post.imgs.map(
    (image) => process.env.REACT_APP_API_URL + image
  );

  return (
    <>
      <Header post={post} />
      <Gallery images={imagesLinks} />
      <CarInfo post={post} />
    </>
  );
}

export default PostDetails;
