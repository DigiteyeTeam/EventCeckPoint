// Utility functions for localStorage management

export const generateDeviceId = () => {
  return 'device_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now()
}

export const saveUserData = (userData) => {
  try {
    localStorage.setItem('userData', JSON.stringify(userData))
    return true
  } catch (error) {
    console.error('Error saving user data:', error)
    return false
  }
}

export const getUserData = () => {
  try {
    const data = localStorage.getItem('userData')
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Error getting user data:', error)
    return null
  }
}

export const saveDeviceId = (deviceId) => {
  try {
    localStorage.setItem('deviceId', deviceId)
    return true
  } catch (error) {
    console.error('Error saving device ID:', error)
    return false
  }
}

export const getDeviceId = () => {
  try {
    return localStorage.getItem('deviceId')
  } catch (error) {
    console.error('Error getting device ID:', error)
    return null
  }
}

export const clearAllData = () => {
  try {
    localStorage.removeItem('userData')
    localStorage.removeItem('deviceId')
    return true
  } catch (error) {
    console.error('Error clearing data:', error)
    return false
  }
}

export const isUserRegistered = () => {
  const userData = getUserData()
  const deviceId = getDeviceId()
  return !!(userData && deviceId)
}
