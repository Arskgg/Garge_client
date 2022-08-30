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
import { createPost } from "../../services/postService";
const PostForm = () => {
  const [models, setModels] = useState([]);
  const [carLogo, setCarLogo] = useState(null);
  const [selectedImgs, setSelectedImgs] = useState([]);
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

  console.log(carForm);

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
      const createdPost = await createPost(carForm);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
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
              {carForm.imgs.map((image, i) => (
                <div key={"image" + i} className={styles.form__image}>
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
              selectedImagesBlob={setSelectedImgs}
            />
            <Divider />
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
