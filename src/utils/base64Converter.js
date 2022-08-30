export const getBase64 = (files) => {
  try {
    let baseURL = [];

    files.forEach((el) => {
      let reader = new FileReader();
      reader.readAsDataURL(el);
      reader.onload = () => {
        baseURL.push(reader.result);
      };
    });

    return baseURL;
  } catch (error) {
    console.log(error);
  }
};
