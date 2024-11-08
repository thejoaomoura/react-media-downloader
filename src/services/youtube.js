import yts from 'yt-search'
import ytdl from '@distube/ytdl-core'

export const searchVideos = async (query) => {
  try {
    const results = await yts(query)
    return results.videos.slice(0, 10)
  } catch (error) {
    console.error('Erro na busca:', error)
    throw error
  }
}

export const searchPlaylist = async (listId) => {
  try {
    const playlist = await yts({ listId })
    return {
      title: playlist.title,
      videos: playlist.videos
    }
  } catch (error) {
    console.error('Erro na busca da playlist:', error)
    throw error
  }
}

export const getVideoInfo = async (videoId) => {
  try {
    const video = await yts({ videoId })
    return video
  } catch (error) {
    console.error('Erro ao obter informações do vídeo:', error)
    throw error
  }
}

export const downloadAudio = async (url, onProgress) => {
  try {
    const info = await ytdl.getInfo(url)
    const audioFormat = ytdl.chooseFormat(info.formats, { 
      quality: 'highestaudio',
      filter: 'audioonly'
    })
    
    const response = await fetch(audioFormat.url)
    if (!response.ok) throw new Error('Falha ao baixar áudio')
    
    const blob = await response.blob()
    return URL.createObjectURL(blob)
  } catch (error) {
    console.error('Erro no download do áudio:', error)
    throw error
  }
}

export const downloadVideo = async (url, onProgress) => {
  try {
    const info = await ytdl.getInfo(url)
    const videoFormat = ytdl.chooseFormat(info.formats, { quality: 'highest' })
    
    const response = await fetch(videoFormat.url)
    if (!response.ok) throw new Error('Falha ao baixar vídeo')
    
    const blob = await response.blob()
    return URL.createObjectURL(blob)
  } catch (error) {
    console.error('Erro no download do vídeo:', error)
    throw error
  }
}
