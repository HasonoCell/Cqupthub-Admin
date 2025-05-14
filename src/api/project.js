import service from "../utils/http";

export const getProjectService = () => {
  return service.get("/project/acquire");
};

export const addProjectService = (data) => {
  return service.post("/project/append", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const editProjectService = (ID, data) => {
  return service.put(`/project/edit/${ID}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteProjectService = (ID) => {
  return service.delete(`/project/delete/${ID}`);
};

export const showProjectService = (fileID) => {
  return service.put("/project/display", {
    projectID: [...fileID],
  });
};
