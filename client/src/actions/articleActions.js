import { GET_ITEMS, ITEMS_LOADING } from "./types";
import axios from "axios";

export const getArticles = (params) => (dispatch) => {
  dispatch(setArticlesLoading());
  axios.get("/api/articles", { params: params }).then((res) =>
    dispatch({
      type: GET_ITEMS,
      payload: res.data,
    })
  );
};

export const setArticlesLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
