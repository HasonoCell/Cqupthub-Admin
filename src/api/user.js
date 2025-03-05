import service from "../utils/http";

export const userLoginService = (data) => {
  return service.post("/login", data);
};
