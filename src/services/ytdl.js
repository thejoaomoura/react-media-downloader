import ytdl from '@distube/ytdl-core'

export const getVideoInfo = async (url) => {
  try {
    const info = await ytdl.getInfo(url)
    return info
  } catch (error) {
    console.error('Error getting video info:', error)
    throw error
  }
}

export const downloadAudioStream = async (url, onProgress) => {
  try {
    const info = await ytdl.getInfo(url)
    const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio', filter: 'audioonly' })
    
    const response = await fetch(audioFormat.url)
    const blob = await response.blob()
    return URL.createObjectURL(blob)
  } catch (error) {
    console.error('Error downloading audio:', error)
    throw error
  }
}

export const downloadVideoStream = async (url, onProgress) => {
  try {
    const info = await ytdl.getInfo(url)
    const videoFormat = ytdl.chooseFormat(info.formats, { quality: 'highest' })
    
    const response = await fetch(videoFormat.url)
    const blob = await response.blob()
    return URL.createObjectURL(blob)
  } catch (error) {
    console.error('Error downloading video:', error)
    throw error
  }
}
