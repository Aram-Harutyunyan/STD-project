const BASE_URL: string = import.meta.env.VITE_API_URL

interface AuthTokens {
  authToken: string | null
  refreshToken: string | null
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Something went wrong')
  }

  return response.json()
}

const updateAuthToken = (newAuthToken: string, newRefreshToken: string) => {
  if (localStorage.getItem('authToken')) {
    localStorage.setItem('authToken', newAuthToken)
    localStorage.setItem('refreshToken', newRefreshToken)
  } else if (sessionStorage.getItem('authToken')) {
    sessionStorage.setItem('authToken', newAuthToken)
    localStorage.setItem('refreshToken', newRefreshToken)
  }
}

const api = {
  getAuthToken: (): AuthTokens => {
    const authToken =
      sessionStorage.getItem('authToken') || localStorage.getItem('authToken')
    const refreshToken =
      sessionStorage.getItem('refreshToken') ||
      localStorage.getItem('refreshToken')
    return { authToken, refreshToken }
  },

  handleAuthenticationFailure: (): void => {
    console.error('Authentication failure')
    window.location.href = '/login'
  },

  handle401Error: async (): Promise<boolean> => {
    const { refreshToken } = api.getAuthToken()
    try {
      if (refreshToken) {
        const refreshResponse = await fetch(`${BASE_URL}/user/refresh/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh: refreshToken }),
        })
        if (refreshResponse.ok) {
          console.log('401', refreshResponse.ok)
          const { access, refresh } = await refreshResponse.json()
          updateAuthToken(access, refresh)

          return true
        }
      }
    } catch (error) {
      console.log('401 handling is failed')
      api.handleAuthenticationFailure()
    }
    return false
  },

  get: async (endpoint: string): Promise<any> => {
    try {
      const { authToken } = api.getAuthToken()
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
          Authorization: `JWT ${authToken}`,
        },
      })
      if (response.status === 401) {
        const retryOriginalRequest = await api.handle401Error()

        if (retryOriginalRequest) {
          return api.get(endpoint)
        }
      }

      return handleResponse(response)
    } catch (error) {
      console.error('Error during GET request:', error)
    }
  },

  post: async (
    endpoint: string,
    data: any,
    requiresAuth = true,
    contentType = 'application/json',
  ): Promise<any> => {
    try {
      const formattedData =
        contentType === 'application/json' ? JSON.stringify(data) : data
      let requestOptions: RequestInit = {
        method: 'POST',
        body: formattedData,
      }
      if (contentType === 'application/json') {
        requestOptions = {
          ...requestOptions,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      }
      if (requiresAuth) {
        const { authToken } = api.getAuthToken()

        if (authToken) {
          requestOptions.headers = {
            ...requestOptions.headers,
            Authorization: `JWT ${authToken}`,
          }
        }
      }
      const response = await fetch(`${BASE_URL}${endpoint}`, requestOptions)

      if (response.status === 401) {
        const retryOriginalRequest = await api.handle401Error()

        if (retryOriginalRequest) {
          return api.post(endpoint, data)
        }
      }

      return handleResponse(response)
    } catch (error) {
      console.error('Error during POST request:', error)
      throw error
    }
  },

  put: async (
    endpoint: string,
    data: any,
    contentType = 'application/json',
  ): Promise<any> => {
    try {
      const formattedData =
        contentType === 'application/json' ? JSON.stringify(data) : data
      const { authToken } = api.getAuthToken()
      let requestOptions: RequestInit = {
        method: 'PUT',
        body: formattedData,
      }
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
          Authorization: `JWT ${authToken}`,
        },
        body: formattedData,
      })
      if (contentType === 'application/json') {
        requestOptions.headers = {
          ...requestOptions.headers,
          'Content-Type': 'application/json',
        }
      }
      if (response.status === 401) {
        const retryOriginalRequest = await api.handle401Error()

        if (retryOriginalRequest) {
          return api.put(endpoint, data)
        }
      }

      return handleResponse(response)
    } catch (error) {
      console.error('Error during PUT request:', error)
      throw error
    }
  },

  delete: async (endpoint: string): Promise<any> => {
    try {
      const { authToken } = api.getAuthToken()

      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: {
          Authorization: `JWT ${authToken}`,
        },
      })

      if (response.status === 401) {
        const retryOriginalRequest = await api.handle401Error()

        if (retryOriginalRequest) {
          return api.delete(endpoint)
        }
      }
      return handleResponse(response)
    } catch (error) {
      console.error('Error during DELETE request:', error)
      throw error
    }
  },
}

export default api
