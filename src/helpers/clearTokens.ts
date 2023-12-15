export const clearTokens = () => {
  if (localStorage.getItem('authToken')) {
    localStorage.removeItem('authToken')
    localStorage.removeItem('refreshToken')
  } else if (sessionStorage.getItem('authToken')) {
    sessionStorage.removeItem('authToken')
    sessionStorage.removeItem('refreshToken')
  }
}
