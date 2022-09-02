import Input from "../../components/Input";
import React, { useState } from "react";
import styles from "./PostForm.module.scss";
import { cars } from "../../data/brands";
import SelectorInput from "./components/SelectorInput";
import { carTypes } from "../../data/carTypes";
import { Divider, MenuItem } from "@mui/material";
import FileUploadButton from "../../components/FileUploadButton";
import Button from "../../components/Button";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useCreatePostMutation } from "../../services/postApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE, LOGIN_ROUTE } from "../../utils/constants";

const PostForm = () => {
  const [models, setModels] = useState([]);
  const [carLogo, setCarLogo] = useState(null);
  const [selectedImgs, setSelectedImgs] = useState([]);
  const navigate = useNavigate();
  const [createPost] = useCreatePostMutation();
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

      await createPost(formData).unwrap();

      // const createdPost = await createPost(formData).unwrap();
      //Save new post inside ReDux
      // navigate(HOME_ROUTE);
    } catch (error) {
      console.log("Session expiered! ");
      navigate(LOGIN_ROUTE);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <form className={styles.form} action="POST">
            <div className={styles.form__content}>
              <h2 className={styles.card__title}>Create Car Post</h2>
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
                    />
                    <SelectorInput
                      options={models.length > 0 ? models : []}
                      name="carModel"
                      handleChange={handleAutocompleteChange}
                      label="Model"
                      placeHolder="Model"
                    />
                    <SelectorInput
                      options={carTypes}
                      name="type"
                      handleChange={handleAutocompleteChange}
                      label="Type"
                      placeHolder="Type"
                    />
                    <Input
                      name="year"
                      label="Year"
                      handleChange={handleInputChange}
                      type="number"
                      textLength={4}
                      placeHolder="yyyy"
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
                    />
                    <Input
                      name="topSpeed"
                      label="Top Speed"
                      handleChange={handleInputChange}
                      type="number"
                      textLength={3}
                      placeHolder="mph"
                    />
                    <Input
                      name="acceleration"
                      label="Acceleration"
                      handleChange={handleInputChange}
                      type="number"
                      textLength={4}
                      placeHolder="0-100 mph (in seconds)"
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
              />
              <SelectorInput
                multiple
                tags
                options={carForm.carMake.length > 0 ? [carForm.carMake] : []}
                name="tags"
                handleChange={handleAutocompleteChange}
                label="Tags"
                placeHolder="Press Enter to add"
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
                name="imgs"
                onSelect={handleAutocompleteChange}
                setSelectedImages={setSelectedImgs}
              />
              <Divider />
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostForm;
