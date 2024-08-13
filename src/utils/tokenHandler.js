const TOKEN_KEY = 'token';

export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function storeAuthToken(token) {
  return localStorage.setItem(TOKEN_KEY, token);
}

export function deleteAuthToken() {
  localStorage.removeItem(TOKEN_KEY);
}
