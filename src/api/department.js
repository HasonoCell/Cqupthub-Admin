import service from "../utils/http";

export const addDepartmentService = (data) => {
  return service.post("/department/append", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const editDepartmentService = (ID, data) => {
  console.log([...data]);
  return service.put(`/department/edit/${ID}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteDepartmentService = (ID) => {
  return service.delete(`/department/delete/${ID}`);
};

export const getDepartmentService = () => {
  return service.get("/department/acquire");
};
