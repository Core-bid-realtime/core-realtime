import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Swal from 'sweetalert2'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    isError: false,
    errorMessage: '',
    dataHome: [],
    whoLogin: {},
    loadingHome: true,
    timeLimit: {},
    loadingTimeLimit: true,
    dataProductsWin: [],
    loadingProductsWinBid: true,
  },
  reducers: {
    changeIsError: (state, action) => {
      state.isError = action.payload
    },
    changeErrorMessage: (state, action) => {
      state.errorMessage = action.payload
    },
    changeDataHome: (state, action) => {
      state.dataHome = action.payload
    },
    changeWhoLogin: (state, action) => {
      state.whoLogin = action.payload
    },
    changeLoadingHome: (state, action) => {
      state.loadingHome = action.payload
    },
    changeTimeLimit: (state, action) => {
      state.timeLimit = action.payload
    },
    changeLoadingTimeLimit: (state, action) => {
      state.loadingTimeLimit = action.payload
    },
    changeProductsWinBid: (state, action) => {
      state.dataProductsWin = action.payload
    },
    changeLoadingProductsWinBid: (state, action) => {
      state.loadingProductsWinBid = action.payload
    },
  }
})

export const {
  changeIsError,
  changeErrorMessage,
  changeDataHome,
  changeWhoLogin,
  changeLoadingHome,
  changeTimeLimit,
  changeLoadingTimeLimit,
  changeProductsWinBid,
  changeLoadingProductsWinBid,
} = appSlice.actions

export const login = (input) => {
  return async (dispatch) => {
    try {
      let link = import.meta.env.VITE_BASE_URL + `/login`
      let { data } = await axios({
        method: 'post',
        url: link,
        data: input
      })
      localStorage.access_token = data.access_token
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      })
      throw error
    }
  }
}

export const register = (input) => {
  return async (dispatch) => {
    try {
      let link = import.meta.env.VITE_BASE_URL + `/register`
      await axios({
        method: 'post',
        url: link,
        data: input,
      })
      Swal.fire({
        title: "Success!",
        text: "Your registration is successfully",
        icon: "success"
      })
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      })
      dispatch(changeErrorMessage(error.response.data.message))
      dispatch(changeIsError(true))
      throw error
    }
  }
}

export const fetchHome = () => {
  return async (dispatch) => {
    try {
      let link = import.meta.env.VITE_BASE_URL + `/products`
      let { data } = await axios({
        method: 'get',
        url: link,
        headers: {
          Authorization: 'Bearer ' + localStorage.access_token
        }
      })
      dispatch(changeDataHome(data.data))
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      })
      throw error
    } finally {
      dispatch(changeLoadingHome(false))
    }
  }
}

export const getWhoLogin = () => {
  return async (dispatch) => {
    try {
      let link = import.meta.env.VITE_BASE_URL + `/user/me`
      let { data } = await axios({
        method: 'get',
        url: link,
        headers: {
          Authorization: 'Bearer ' + localStorage.access_token
        }
      })
      dispatch(changeWhoLogin(data))
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      })
      throw error
    }
  }
}

export const getTimeLimit = (productId) => {
  return async (dispatch) => {
    try {
      let link = import.meta.env.VITE_BASE_URL + `/product/timelimit/${productId}`
      let { data } = await axios({
        method: 'get',
        url: link,
        headers: {
          Authorization: 'Bearer ' + localStorage.access_token
        }
      })
      dispatch(changeTimeLimit(data))
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      })
      throw error
    } finally {
      dispatch(changeLoadingTimeLimit(false))
    }
  }
}

export const getProductsWinBid = () => {
  return async (dispatch) => {
    try {
      let link = import.meta.env.VITE_BASE_URL + `/user/products`
      let { data } = await axios({
        method: 'get',
        url: link,
        headers: {
          Authorization: 'Bearer ' + localStorage.access_token
        }
      })
      console.log(data)
      dispatch(changeProductsWinBid(data))
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      })
      throw error
    } finally {
      dispatch(changeLoadingProductsWinBid(false))
    }
  }
}



export default appSlice.reducer