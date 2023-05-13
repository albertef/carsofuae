const AUTH_KEY = "jwt_token";
const LOGIN_INFO = "login_info";
const SUPER_LOGIN_INFO = "super_login_info";

export function clearAuth() {
  sessionStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(AUTH_KEY);
  return !getAuth();
}

export function getAuth() {
  return sessionStorage.getItem(AUTH_KEY) || localStorage.getItem(AUTH_KEY);
}

export function setAuth(auth) {
  sessionStorage.setItem(AUTH_KEY, auth);
}

export function setLogin(value) {
  sessionStorage.setItem(LOGIN_INFO, value);
}

export function getLogin() {
  return (
    JSON.parse(sessionStorage.getItem(LOGIN_INFO)) ||
    JSON.parse(localStorage.getItem(LOGIN_INFO))
  );
}

export function clearLogin() {
  sessionStorage.removeItem(LOGIN_INFO);
  localStorage.removeItem(LOGIN_INFO);
  return !getLogin();
}

export function setSuperLogin(value) {
  sessionStorage.setItem(SUPER_LOGIN_INFO, value);
}

export function getSuperLogin() {
  return (
    JSON.parse(sessionStorage.getItem(SUPER_LOGIN_INFO)) ||
    JSON.parse(localStorage.getItem(SUPER_LOGIN_INFO))
  );
}

export function clearSuperLogin() {
  sessionStorage.removeItem(SUPER_LOGIN_INFO);
  localStorage.removeItem(SUPER_LOGIN_INFO);
  return !getLogin();
}
