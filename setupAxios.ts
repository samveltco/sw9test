// // ©2024 Austin App House. All rights reserved.
// import axios from 'axios';
// import store from './storage/store';
// import { toggleModal } from './storage/actions/modalsActions';

// axios.interceptors.response.use(
//   (response) => {
//     const cookieVersion = window.localStorage.getItem('api-version');

//     if (cookieVersion === 'undefined' && response.headers['api-version']) {
//       window.localStorage.setItem('api-version', response.headers['api-version']);
//       return response;
//     }
//     if (response.headers['api-version'] && cookieVersion
//         && response.headers['api-version'] !== cookieVersion) {
//       store.dispatch(toggleModal(true, 'newApiVersion', true));
//       return response;
//     }

//     if (response.headers['api-version'] === cookieVersion) {
//       store.dispatch(toggleModal(false, 'newApiVersion', true));
//       return response;
//     }
//     return response;
//   },
//   (error) => Promise.reject(error),
// );
