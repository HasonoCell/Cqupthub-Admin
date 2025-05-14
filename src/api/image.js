import service from "../utils/http";

export const addImageService = (image) => {
  return service.post("/image/uploads", image, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteImageService = (imageName) => {
  return service.delete("/image/delete", imageName);
};

export const getImageService = () => {
  return service.get("/image/acquire");
};

export const setImageService = (imageNames) => {
  return service.put("/image/homepage", imageNames);
};
