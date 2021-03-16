import axios from 'axios';
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
} from './types';
import { USER_SERVER } from '../components/Config.js'; // '/api/users'

/* 회원가입 요청 */
export function registerUser(dataToSubmit) {
  const request = axios.post(`${USER_SERVER}/register`, dataToSubmit)
    .then(response => response.data);
  return {
    type: REGISTER_USER,
    payload: request
  }
}

/* 로그인 요청 */
export function loginUser(dataToSubmit) {
  const request = axios.post(`${USER_SERVER}/login`, dataToSubmit)
    .then(response => response.data);
  return {
    //action
    type: LOGIN_USER,
    payload: request // payload 는 body 에 담기는 data
  }
}

/* 권한 확인 요청 */
export function auth() {
  const request = axios.get(`${USER_SERVER}/auth`)
    .then(response => response.data);

  return {
    type: AUTH_USER,
    payload: request
  }
}

export function logoutUser() {
  const request = axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data);

  return {
    type: LOGOUT_USER,
    payload: request
  }
}

