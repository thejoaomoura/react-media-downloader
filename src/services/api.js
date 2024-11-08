import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

export const searchMedia = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/search`, {
      params: { q: query }
    })
    return response.data // Retorna todos os resultados
  } catch (error) {
    console.error('Erro na busca:', error)
    throw error
  }
}

export const downloadAudio = async (videoId, onProgress) => {
  try {
    const response = await axios.get(`${API_URL}/download/audio`, {
      params: { videoId },
      responseType: 'blob',
      onDownloadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          onProgress(percentCompleted)
        }
      }
    })
    return URL.createObjectURL(response.data)
  } catch (error) {
    console.error('Erro no download do áudio:', error)
    throw error
  }
}

export const downloadVideo = async (videoId, onProgress) => {
  try {
    const response = await axios.get(`${API_URL}/download/video`, {
      params: { videoId },
      responseType: 'blob',
      onDownloadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          onProgress(percentCompleted)
        }
      }
    })
    return URL.createObjectURL(response.data)
  } catch (error) {
    console.error('Erro no download do vídeo:', error)
    throw error
  }
}
