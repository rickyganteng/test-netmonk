const initialState = {
  dataList: {},
  datapostUser: {},
  pagination: {},
  isLoading: false,
  isError: false,
  msg: "",
};

const app = (state = initialState, action) => {
  switch (action.type) {

    case "POST_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "POST_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "POST_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.data.msg,
      };
    case "USER_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "USER_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataList: action.payload.data.data,
        msg: action.payload.data.msg,
        pagination: action.payload.data.pagination,
      };
    case "USER_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        dataList: [],
        msg: action.payload.data.msg,
        pagination: {},
      };
    case "GET_POST_USER_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_POST_USER_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        datapostUser: action.payload.data.data,
        msg: action.payload.data.msg,
        pagination: action.payload.data.pagination,
      };
    case "GET_POST_USERR_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        datapostUser: [],
        msg: action.payload.data.msg,
        pagination: {},
      };
    case "GET_POSTT_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_POSTT_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        datapostUser: action.payload.data.data,
        msg: action.payload.data.msg,
        pagination: action.payload.data.pagination,
      };
    case "GET_POSTT_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        datapostUser: [],
        msg: action.payload.data.msg,
        pagination: {},
      };

    default:
      return state;
  }
};

export default app;