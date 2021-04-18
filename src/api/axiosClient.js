// Add a request interceptor
import axios from 'axios';
import firebase from 'firebase';
import queryString from 'query-string';

const getFirebaseToken = async () => {
  const currentUser = firebase.auth().currentUser;
  if (currentUser) return currentUser.getIdToken();

  // currentUser bi null co 2 li do
  // 1 la chua dang nhap, 2 la da dang nhap nhung thong tin chua ve kip

  // Not logged in
  const hasRememberedAccount = localStorage.getItem('firebaseui::rememberedAccounts');
  if (!hasRememberedAccount) return null;

  // Logged in but current user is not fetched -> wait (10s)
  return new Promise((resolve, reject) => {
    // Neu cho` doi qua 10s thi` reject lay token, neu no da chay token ben trong thi` phai clearTimeout di
    const waitTimer = setTimeout(() => {
      reject(null);
    }, 10000);

    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        reject(null);
      }

      const token = await user.getIdToken();
      console.log('[AXIOS] Logged in user token: ', token);
      resolve(token);

      unregisterAuthObserver();
      clearTimeout(waitTimer);
    });
  });
};

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
  async (config) => {
    // Handle token here...
    // const currentUser = firebase.auth().currentUser;
    // if(currentUser) {
    //   const token = await currentUser.getIdToken();
    //   // gan token vao` authorization
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    const token = await getFirebaseToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
