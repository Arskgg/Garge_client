import React from "react";
import { useGetPostsQuery } from "../../services/postApiSlice";
import Loading from "../../components/Loading";
import PostList from "./components/PostList";

const Home = () => {
  const { data = [], isLoading } = useGetPostsQuery();

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  console.log(data.posts);
  return (
    <div>
      <PostList posts={data.posts} />
    </div>
  );
};

export default Home;
