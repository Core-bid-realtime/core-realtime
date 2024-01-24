// import { createSlice } from '@reduxjs/toolkit'
// import axios from 'axios'
// import Swal from 'sweetalert2'

// export const appSlice = createSlice({
//   name: 'app',
//   initialState: {
//     isError: false,
//     errorMessage: '',
//   },
//   reducers: {
//     changeIsError: (state, action) => {
//       state.isError = action.payload
//     },
//     changeErrorMessage: (state, action) => {
//       state.errorMessage = action.payload
//     },
//   }
// })

// export const {
//   changeIsError,
//   changeErrorMessage,
// } = appSlice.actions

// export const login = (input) => {
//   return async (dispatch) => {
//     try {
//       let link = import.meta.env.VITE_BASE_URL + `/login`
//       let { data } = await axios({
//         method: 'post',
//         url: link,
//         data: input
//       })
//       localStorage.access_token = data.access_token
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: `${error.response.data.message}`,
//       })
//       throw error
//     }
//   }
// }

// export const register = (input) => {
//   return async (dispatch) => {
//     try {
//       let link = import.meta.env.VITE_BASE_URL + `/register`
//       await axios({
//         method: 'post',
//         url: link,
//         data: input,
//       })
//       Swal.fire({
//         title: "Success!",
//         text: "Your registration is successfully",
//         icon: "success"
//       })
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: `${error.response.data.message}`,
//       })
//       dispatch(changeErrorMessage(error.response.data.message))
//       dispatch(changeIsError(true))
//       throw error
//     }
//   }
// }

// export default appSlice.reducer

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    isError: false,
    errorMessage: '',
  },
  reducers: {
    changeIsError: (state, action) => {
      state.isError = action.payload;
    },
    changeErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  changeIsError,
  changeErrorMessage,
} = appSlice.actions;

export const login = (input) => {
  return async (dispatch) => {
    try {
      let link = import.meta.env.VITE_BASE_URL + `/login`;
      let { data } = await axios({
        method: 'post',
        url: link,
        data: input,
      });
      localStorage.access_token = data.access_token;
    } catch (error) {
      if (error.response) {
        await Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${error.response.data.message}`,
        });
        dispatch(changeErrorMessage(error.response.data.message));
        dispatch(changeIsError(true));
      } else {
        // Handle non-response errors here
        console.error('Non-response error:', error);
      }
      throw error;
    }
  };
};

export const register = (input) => {
  return async (dispatch) => {
    try {
      let link = import.meta.env.VITE_BASE_URL + `/register`;
      await axios({
        method: 'post',
        url: link,
        data: input,
      });
      await Swal.fire({
        title: 'Success!',
        text: 'Your registration is successful',
        icon: 'success',
      });
    } catch (error) {
      if (error.response) {
        await Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${error.response.data.message}`,
        });
        dispatch(changeErrorMessage(error.response.data.message));
        dispatch(changeIsError(true));
      } else {
        // Handle non-response errors here
        console.error('Non-response error:', error);
      }
      throw error;
    }
  };
};

export default appSlice.reducer;
