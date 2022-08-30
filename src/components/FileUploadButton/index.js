import { useRef } from "react";
import Button from "../Button";
import Resizer from "react-image-file-resizer";

// const resizeFile = (file) =>
//   new Promise((resolve) => {
//     Resizer.imageFileResizer(
//       file,
//       300,
//       300,
//       "JPEG",
//       100,
//       0,
//       (uri) => {
//         resolve(uri);
//       },
//       "base64"
//     );
//   });

const resizeFile = (files) => {
  return files.map(
    (file) =>
      new Promise((resolve) => {
        Resizer.imageFileResizer(
          file,
          1920,
          1080,
          "JPEG",
          100,
          0,
          (uri) => {
            resolve(uri);
          },
          "base64",
          300,
          300
        );
      })
  );
};

const FileUploadButton = ({ name, onSelect }) => {
  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    event.preventDefault();
    hiddenFileInput.current.click();
  };
  const handleChange = async (event) => {
    const filesUploaded = event.target.files;
    const arrOfFiles = Object.entries(filesUploaded).map((el) => el[1]);

    const arrOfPromises = resizeFile(arrOfFiles);
    Promise.all(arrOfPromises).then((el) => {
      onSelect(name, el);
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
        style={{ display: "none" }}
      />
    </>
  );
};

export default FileUploadButton;
