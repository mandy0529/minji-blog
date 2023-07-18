import axios, { AxiosError, AxiosResponse } from "axios";
import { getCookie, setCookie } from "cookies-next";

const baseURL = "http://localhost:3333/api/v1";
const refreshURL = "http://localhost:3333/api/v1/auth/refreshToken";

export const makeRequest = axios.create({
  baseURL,
  withCredentials: true,
});

// Interceptor
makeRequest.interceptors.request.use(
  (config: any) => {
    if (config) {
      if (!config.url.includes("refresh")) {
        if (config.headers.Authorization !== false) {
          const accessToken = getCookie(`accessToken`) as string;
          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
        }
      }
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

let failedQueue: any[] = [];
let isRefreshing = false;
const processQueue = (error: any) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });

  failedQueue = [];
};

makeRequest.interceptors.response.use(
  (response: AxiosResponse) => {
    // 2xx 범위 내의 모든 상태 코드는 이 함수를 트리거합니다.
    // 응답 데이터를 처리합니다.
    return response;
  },
  (error: AxiosError) => {
    const originalRequest = error.config!;
    // "axios": "^1.1.3" 버전에서 헤더와 관련된 문제가 있으므로 이를 해결하기 위한 코드입니다.
    originalRequest.headers = JSON.parse(
      JSON.stringify(originalRequest.headers || {})
    );

    const refreshToken = getCookie(`refreshToken`);

    // 에러가 발생한 경우, 큐에 있는 모든 요청을 처리하고 사용자를 로그아웃합니다.
    const handleError = (error: AxiosError) => {
      console.log(error, "예러");
      processQueue(error);
      // logout();
      return Promise.reject(error);
    };

    // 토큰 갱신 조건
    if (
      refreshToken &&
      error.response?.status === 401 &&
      //@ts-expect-error
      error.response?.data?.message === "Unauthorized" &&
      originalRequest?.url !== refreshURL &&
      //@ts-expect-error
      originalRequest?._retry !== true
    ) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return makeRequest(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }
      isRefreshing = true;
      //@ts-expect-error
      originalRequest._retry = true;

      return makeRequest
        .post(refreshURL, null, {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        })
        .then((res: AxiosResponse) => {
          setCookie("accessToken", res.data.access_token);
          processQueue(null);

          return makeRequest(originalRequest);
        }, handleError)
        .finally(() => {
          isRefreshing = false;
        });
    }

    // 토큰이 누락되었거나 만료된 경우 => 사용자 로그아웃
    if (
      error.response?.status === 401 &&
      //@ts-expect-error
      error.response?.data?.message === "Unauthorized"
    ) {
      return handleError(error);
    }

    // 2xx 범위를 벗어난 모든 상태 코드는 이 함수를 트리거합니다.
    // 응답 에러를 처리합니다.
    return Promise.reject(error);
  }
);
