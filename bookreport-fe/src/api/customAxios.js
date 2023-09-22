import axios, { AxiosInstance } from "axios";
import { setCookie, getCookie } from "./cookie.js";

const SERVER_ADDRESS = "http://localhost:8080";

const memberURL = {
  MEMBER_JOIN_URL: "/member/join",
  MEMBER_LOGIN_URL: "/member/login",
};

const bookURL = {
  BOOK_SEARCH_URL: "/book/search",
  BOOK_SEARCH_DETAIL_URL: "/book/detail",
};

const myBookURL = {
  MY_BOOK_SAVE_URL: "/myBook/save",
  MY_BOOK_CHECK: "/myBook/check",
  MY_BOOK_LIST_URL: "/myBooks",
  MY_BOOK_DETAIL_URL: "/myBook/detail",
  MY_BOOK_UPDATE_URL: "/myBook/update",
  MY_BOOK_DELETE_URL: "/myBook/delete",
};

const reportURL = {
  REPORTS_URL: "/reports",
  REPORT_DETAIL_URL: "/report/detail",
  REPORT_SAVE_URL: "/report/create",
  REPORT_UPDATE_URL: "/report/update",
};

const api = axios.create({
  baseURL: `${SERVER_ADDRESS}`,
  headers: { "Content-type": "application/json" },
  timeout: 5000,
});

let accessToken = getCookie("accessToken");
let refreshToken = getCookie("refreshToken");

const updateAccessToken = (newAccessToken) => {
  accessToken = newAccessToken;
  setCookie("accessToken", accessToken, {
    path: "/",
    secure: true,
    maxAge: 3600,
  });
};

const updateRefreshToken = (newRefreshToken) => {
  refreshToken = newRefreshToken;
  setCookie("refreshToken", refreshToken, {
    path: "/",
    secure: true,
    maxAge: 3600 * 24,
  });
};

api.interceptors.request.use((config) => {
  // 요청 전 수행 로직
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

api.interceptors.response.use((response) => {
  // 응답 수행 로직
  return response;
});

const customAxios = {
  join: async (data) => {
    const response = await api.post(memberURL.MEMBER_JOIN_URL, data);
    return response;
  },
  login: async (data) => {
    const response = await api.post(memberURL.MEMBER_LOGIN_URL, data);
    return response;
  },
  search: async (keyword) => {
    const response = await api.get(bookURL.BOOK_SEARCH_URL, {
      params: { query: keyword },
    });
    return response;
  },
  search_detail: async (isbn) => {
    const response = await api.get(`${bookURL.BOOK_SEARCH_DETAIL_URL}/${isbn}`);
    return response;
  },

  myBook_save: async (data) => {
    const response = await api.post(myBookURL.MY_BOOK_SAVE_URL, data);
    return response;
  },

  myBook_check: async (isbn) => {
    const response = await api.get(`${myBookURL.MY_BOOK_CHECK}/${isbn}`);
    return response;
  },

  myBooks: async (year, currentPage) => {
    const response = await api.get(
      `${myBookURL.MY_BOOK_LIST_URL}?year=${year}&page=${currentPage}`
    );
    return response;
  },

  myBook_detail: async (id) => {
    const response = await api.get(`${myBookURL.MY_BOOK_DETAIL_URL}/${id}`);
    return response;
  },

  myBook_update: async (id, data) => {
    const response = await api.patch(
      `${myBookURL.MY_BOOK_UPDATE_URL}/${id}`,
      data
    );
    return response;
  },

  myBook_delete: async (id) => {
    const response = await api.delete(`${myBookURL.MY_BOOK_DELETE_URL}/${id}`);
    return response;
  },

  reports: async (isbn, currentPage) => {
    const response = await api.get(
      `${reportURL.REPORTS_URL}/${isbn}?page=${currentPage}`
    );
    return response;
  },

  report_by_mybook: async (myBookId) => {
    const response = await api.get(
      `${reportURL.REPORT_DETAIL_URL}?myBook=${myBookId}`
    );
    return response;
  },

  report_by_id: async (id) => {
    const response = await api.get(`${reportURL.REPORT_DETAIL_URL}/${id}`);
    return response;
  },

  report_save: async (myBookId, data) => {
    const response = await api.post(
      `${reportURL.REPORT_SAVE_URL}/${myBookId}`,
      data
    );
    return response;
  },
  report_update: async (reportId, data) => {
    const response = await api.patch(
      `${reportURL.REPORT_UPDATE_URL}/${reportId}`,
      data
    );
    return response;
  },
};

export { customAxios, updateAccessToken, updateRefreshToken };
