import service from "../utils/http";

export const userLoginService = (data) => {
  return service.post("/login", data);
};

export const userChangePWDService = (data) => {
  return service.put("/account", data);
};
