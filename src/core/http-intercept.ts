import axios from 'axios';

// 拦截请求
axios.interceptors.request.use(
  config => {
    //向请求头添加token
    // const token =
    //   'DTM eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHAiOiJJTUVSR0UiLCJhY2Nlc3NvciI6Il9MbVE1c2ZRU1M2aEpEMlYyTlZlMUEiLCJleHAiOjE2MzY2Njc2NDQsInRva2VuIjoiZWQxMjI0MWYtNGFmYy00YjFhLTkzNmYtYWViMDQyY2RlYzgzIn0.aXazhRezx31JvNRjVAwNFMOxEi95_4Gu1YlkxksnEnc';
    // if (config.headers) {
    //   config.headers.Authorization = token;
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 拦截响应
axios.interceptors.response.use(
  res => {
    // console.log(res);
    return res;
  },
  error => {
    //token失效返回401处理
    if (error.response.code == 401) {
      //刷新token
    }
    return Promise.reject(error.response.data); // 返回错误信息
  }
);
