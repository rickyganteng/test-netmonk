import axiosApiIntances from "../../utils/axios";

export const postData = (data) => {
  return {
    type: "POST",
    payload: axiosApiIntances.post('posts/', data),
  };
};
export const postComment = (data) => {
  return {
    type: "COMMENT",
    payload: axiosApiIntances.post('comments/', data),
  };
};
export const getListUser = () => {
  return {
    type: "USER",
    payload: axiosApiIntances.get("/users"),
  };
};
export const getPostUser = (Id) => {
  return {
    type: "GET_POST_USER",
    payload: axiosApiIntances.get(`/posts?userId=${Id}`),
  };
};
export const getComentPostsById = (Id) => {
  return {
    type: "GET_POSTT",
    payload: axiosApiIntances.get(`/posts/${Id}/comments`),
  };
};
export const updateData = (id, data) => {
  return {
    type: "UPDATE_POSTS",
    payload: axiosApiIntances.patch(`posts/${id}`, data),
  };
};
export const updateComment = (id, data) => {
  return {
    type: "UPDATE_COMMENT",
    payload: axiosApiIntances.patch(`comments/${id}`, data),
  };
};
export const deleteData = (id) => {
  return {
    type: "DELETE_POSTS",
    payload: axiosApiIntances.delete(`posts/${id}`),
  };
};
export const deleteComment = (id) => {
  return {
    type: "DELETE_COMMENT",
    payload: axiosApiIntances.delete(`comments/${id}`),
  };
};