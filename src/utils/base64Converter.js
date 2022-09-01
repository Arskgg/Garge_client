import Resizer from "react-image-file-resizer";
export const getBase64 = (files) => {
  return files.map(
    (file) =>
      new Promise((resolve) => {
        Resizer.imageFileResizer(
          file,
          300,
          300,
          "JPEG",
          100,
          0,
          (uri) => {
            resolve(uri);
          },
          "base64"
        );
      })
  );
};
