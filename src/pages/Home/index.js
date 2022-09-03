import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetPostsQuery } from "../../services/postApiSlice";
import Loading from "../../components/Loading";
import { cars } from "../../data/brands";
import PostList from "./components/PostList";

const Home = () => {
  const navigate = useNavigate();
  const { data = [], isLoading } = useGetPostsQuery();

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div>
      <PostList posts={data.data} />
    </div>
  );
};

export default Home;
