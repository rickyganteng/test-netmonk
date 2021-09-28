import axiosApiIntances from "../../utils/axios";

export const postData = (data) => {
  return {
    type: "POST",
    payload: axiosApiIntances.post('post/', data),
  };
};
export const getListUser = () => {
  return {
    type: "USER",
    payload: axiosApiIntances.get("/users"),
  };
};
export const getPostUser = () => {
  return {
    type: "GET_POST_USER",
    payload: axiosApiIntances.get("/posts?userId=2"),
  };
};