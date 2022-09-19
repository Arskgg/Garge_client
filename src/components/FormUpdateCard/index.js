import { Divider, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../Button";
import FileUploadButton from "../FileUploadButton";
import Input from "../Input";
import { cars } from "../../data/brands";
import {
  useGetPostByIdQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} from "../../services/postApiSlice";
import { selectCurrentUser } from "../../store/authSlice";
import SelectorInput from "../SelectorInput";
import styles from "../FormCreateCard/FormCard.module.scss";
import { HOME_ROUTE, LOGIN_ROUTE } from "../../utils/constants";
import { carTypes } from "../../data/carTypes";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Loading from "../Loading";

const FormUpdateCard = () => {
  const { id } = useParams();
  const { data: post, isLoading, isSuccess } = useGetPostByIdQuery(id);
  const [models, setModels] = useState([]);
  const [carLogo, setCarLogo] = useState(null);
  const [selectedImgs, setSelectedImgs] = useState([]);
  const navigate = useNavigate();
  const [updatePost, { isLoading: isUpdateLoading }] = useUpdatePostMutation();
  const [deletePost, { isLoading: isDeleteLoading }] = useDeletePostMutation();
  const user = useSelector(selectCurrentUser);
  const [carForm, setCarForm] = useState({
    carMake: "",
    carModel: "",
    type: "",
    year: "",
    hp: "",
    topSpeed: "",
    acceleration: "",
    transmission: "",
    engine: "",
    description: "",
    imgs: [],
    tags: [],
  });
  useEffect(() => {
    if (isSuccess) {
      if (post.user_id !== user?.id) {
        return navigate(HOME_ROUTE);
      }

      setCarForm((prev) => ({ ...prev, ...post }));
      setSelectedImgs(
        post.imgs.map((img) => `${process.env.REACT_APP_API_URL}/${img}`)
      );
    }
  }, [post]);

  const handleDeleteSelectedImg = (e, selectedIndex) => {
    setSelectedImgs((prev) => prev.filter((img, i) => i !== selectedIndex));
    setCarForm((prev) => ({
      ...prev,
      imgs: prev.imgs.filter((img, i) => i !== selectedIndex),
    }));
  };

  const handleAutocompleteChange = (name, value) => {
    setCarForm((prev) => ({ ...prev, [name]: value }));
    if (name === "carMake") {
      if (cars.some((car) => car.make.toLowerCase() === value.toLowerCase())) {
        setModels(
          cars
            .find((car) => car.make.toLowerCase() === value.toLowerCase())
            .models.sort()
        );
        setCarLogo(
          cars.find((car) => car.make.toLowerCase() === value.toLowerCase()).img
        );
      } else {
        setCarLogo(null);
        setModels([]);
      }
    }
  };

  const handleInputChange = (e) => {
    setCarForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await deletePost(id).unwrap;
      navigate(HOME_ROUTE);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("user_id", user.id);
      formData.append("carMake", carForm.carMake);
      formData.append("carModel", carForm.carModel);
      formData.append("type", carForm.type);
      formData.append("year", carForm.year);
      formData.append("hp", carForm.hp);
      formData.append("topSpeed", carForm.topSpeed);
      formData.append("acceleration", carForm.acceleration);
      formData.append("transmission", carForm.transmission);
      formData.append("engine", carForm.engine);
      formData.append("description", carForm.description);
      carForm.imgs.forEach((img) => formData.append("imgs", img));
      formData.append("tags", JSON.stringify(carForm.tags));

      await updatePost({ id: post._id, formData }).unwrap();

      navigate(HOME_ROUTE);
    } catch (error) {
      console.log("Session expiered! ");
      navigate(LOGIN_ROUTE);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className={styles.card}>
      {isUpdateLoading && <Loading />}
      <form className={styles.form} action="POST">
        <div className={styles.form__content}>
          <h2 className={styles.card__title}>Update Post</h2>
          <Divider />
          <div className={styles.form__car_logo}>
            {carLogo && (
              <img src={carLogo} alt="carLogo" style={{ width: "100px" }} />
            )}
          </div>
          <div className={styles.form__car_info_section}>
            <div className={styles.form__car_info_container}>
              <h3 className={styles.form__subtitle}>Car Info</h3>

              <div className={styles.form__car_info}>
                <SelectorInput
                  options={cars.map((option) => option.make).sort()}
                  name="carMake"
                  handleChange={handleAutocompleteChange}
                  label="Make"
                  placeHolder="Make"
                  value={carForm.carMake}
                />
                <SelectorInput
                  options={models.length > 0 ? models : []}
                  name="carModel"
                  handleChange={handleAutocompleteChange}
                  label="Model"
                  placeHolder="Model"
                  value={carForm.carModel}
                />
                <SelectorInput
                  options={carTypes}
                  name="type"
                  handleChange={handleAutocompleteChange}
                  label="Type"
                  placeHolder="Type"
                  value={carForm.type}
                />
                <Input
                  name="year"
                  label="Year"
                  handleChange={handleInputChange}
                  type="number"
                  textLength={4}
                  placeHolder="yyyy"
                  value={carForm.year}
                />
              </div>
            </div>
            <div className={styles.form__car_info_container}>
              <h3 className={styles.form__subtitle}>Technical Specs</h3>

              <div className={styles.form__car_info}>
                <Input
                  name="hp"
                  label="Horsepower"
                  handleChange={handleInputChange}
                  type="number"
                  textLength={4}
                  placeHolder="HP"
                  value={carForm.hp}
                />
                <Input
                  name="topSpeed"
                  label="Top Speed"
                  handleChange={handleInputChange}
                  type="number"
                  textLength={3}
                  placeHolder="mph"
                  value={carForm.topSpeed}
                />
                <Input
                  name="acceleration"
                  label="Acceleration"
                  handleChange={handleInputChange}
                  type="number"
                  textLength={4}
                  placeHolder="0-100 mph (in seconds)"
                  value={carForm.acceleration}
                />
                <Input
                  name="transmission"
                  label="Transmission"
                  handleChange={handleInputChange}
                  select
                  value={carForm.transmission}
                  placeHolder="Choose one"
                >
                  {["Manual", "Automatic"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Input>
                <Input
                  name="engine"
                  label="Engine"
                  handleChange={handleInputChange}
                  placeHolder="Tell about your engine"
                  value={carForm.engine}
                />
              </div>
            </div>
          </div>
          <Input
            name="description"
            label="Description"
            handleChange={handleInputChange}
            placeHolder="Describe your car..."
            multiline
            minRows={4}
            value={carForm.description}
          />
          <SelectorInput
            multiple
            tags
            options={carForm.carMake.length > 0 ? [carForm.carMake] : []}
            name="tags"
            handleChange={handleAutocompleteChange}
            label="Tags"
            placeHolder="Press Enter to add"
            value={carForm.tags}
          />

          <div className={styles.form__images}>
            {selectedImgs.map((image, i) => (
              <div
                onClick={(e) => handleDeleteSelectedImg(e, i)}
                key={"image" + i}
                className={styles.form__image}
              >
                <img
                  src={image}
                  alt={`carImg${i}.img`}
                  style={{ width: "200px" }}
                />
                <HighlightOffIcon />
              </div>
            ))}
          </div>
          <FileUploadButton
            multiple
            name="imgs"
            onSelect={handleAutocompleteChange}
            setSelectedImages={setSelectedImgs}
          />
          <Divider />
          <Button onClick={handleSubmit}>Update</Button>

          <Divider />
          <Button onClick={handleDelete} red>
            Delete Post
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormUpdateCard;
