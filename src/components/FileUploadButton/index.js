import { useRef } from "react";
import Button from "../Button";
import { getBase64 } from "../../utils/base64Converter";

const FileUploadButton = ({ name, onSelect, setSelectedImages }) => {
  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    event.preventDefault();
    hiddenFileInput.current.click();
  };

  const handleChange = async (event) => {
    const filesUploaded = event.target.files;
    const arrOfFiles = Object.entries(filesUploaded).map((el) => el[1]);
    onSelect(name, arrOfFiles);

    const arrOfResizeFilePromises = getBase64(arrOfFiles);
    Promise.all(arrOfResizeFilePromises).then((img) => {
      setSelectedImages(img);
    });
  };

  return (
    <>
      <Button onClick={handleClick}>Upload images</Button>
      <input
        multiple
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        accept="image/*"
        style={{ display: "none" }}
      />
    </>
  );
};

export default FileUploadButton;
