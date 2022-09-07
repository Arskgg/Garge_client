import Resizer from "react-image-file-resizer";
export const resizeImage = (
  files,
  outputType,
  width,
  height,
  compressFormat = "JPEG"
) => {
  return files.map(
    (file) =>
      new Promise((resolve) => {
        Resizer.imageFileResizer(
          file,
          width,
          height,
          compressFormat,
          100,
          0,
          (uri) => {
            resolve(uri);
          },
          outputType
        );
      })
  );
};
