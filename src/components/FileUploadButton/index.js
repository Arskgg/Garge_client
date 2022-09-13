import { useRef } from "react";
import Button from "../Button";
import { resizeImage } from "../../utils/imageResizer";

const FileUploadButton = ({ name, onSelect, multiple, setSelectedImages }) => {
  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    event.preventDefault();
    hiddenFileInput.current.click();
  };

  const handleChange = async (event) => {
    const filesUploaded = event.target.files;
    const arrOfFiles = Object.entries(filesUploaded).map((el) => el[1]);

    const arrOfResizeFile = resizeImage(arrOfFiles, "file", 1920, 1080);
    Promise.all(arrOfResizeFile).then((imgs) => {
      onSelect(name, imgs);
    });

    if (setSelectedImages) {
      const arrOfResizeFileBase64 = resizeImage(arrOfFiles, "base64", 300, 300);
      Promise.all(arrOfResizeFileBase64).then((imgs) => {
        setSelectedImages(imgs);
      });
    }
  };

  return (
    <>
      <Button onClick={handleClick}>{`Upload image${
        multiple ? "s" : ""
      }`}</Button>
      <input
        multiple={multiple}
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
