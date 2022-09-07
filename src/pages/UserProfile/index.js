import React from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { useGetUserQuery } from "../../services/authApiSlice";

const UserProfile = () => {
  const { id } = useParams();

  const { data: user, isLoading, isError, error } = useGetUserQuery(id);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>{error.data.message}</div>;
  }

  return <div>{user.username}</div>;
};

export default UserProfile;
