import { GET_ITEMS, ADD_ITEM, ITEMS_LOADING } from "./types";
import axios from "axios";

var route = "/api/articles";

export const getArticles = (params) => (dispatch) => {
  dispatch(setArticlesLoading());
  axios.get(route, { params: params }).then((res) =>
    dispatch({
      type: GET_ITEMS,
      payload: res.data,
    })
  );
};

export const addArticle = (params) => (dispatch) => {
  axios.post(route, params).then((res) =>
    dispatch({
      type: ADD_ITEM,
      payload: res.data
    })
  );
};

export const setArticlesLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
