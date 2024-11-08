import express from 'express'
import cors from 'cors'
import yts from 'yt-search'
import ytdl from '@distube/ytdl-core'

const app = express()
app.use(cors())
app.use(express.json())

// Função para extrair o ID do vídeo da URL do YouTube
const getVideoId = (url) => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  const match = url.match(regex)
  return match ? match[1] : url
}

// Função para sanitizar o nome do arquivo
const sanitizeFilename = (filename) => {
  return filename
    .replace(/[^a-zA-Z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .substring(0, 200)
}

// Rota de busca de vídeos
app.get('/api/search', async (req, res) => {
  try {
    const { q } = req.query
    const results = await yts(q)
    const videos = results.videos.slice(0, 10).map(video => ({
      id: video.videoId,
      title: video.title,
      url: video.url,
      thumbnail: video.thumbnail,
      duration: video.duration,
      views: video.views,
      author: video.author,
      timestamp: video.timestamp,
      description: video.description
    }))
    res.json(videos)
  } catch (error) {
    console.error('Search error:', error)
    res.status(500).json({ error: 'Erro na busca' })
  }
})

// Rota de download de áudio
app.get('/api/download/audio', async (req, res) => {
  try {
    const { videoId } = req.query
    if (!videoId) {
      return res.status(400).json({ error: 'ID do vídeo não fornecido' })
    }

    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`
    const info = await ytdl.getInfo(videoUrl)
    const format = ytdl.chooseFormat(info.formats, { 
      quality: 'highestaudio',
      filter: 'audioonly'
    })

    const sanitizedTitle = sanitizeFilename(info.videoDetails.title)
    
    res.setHeader('Content-Type', 'audio/mpeg')
    res.setHeader('Content-Disposition', `attachment; filename=${sanitizedTitle}.mp3`)

    const stream = ytdl(videoUrl, {
      format: format,
      quality: 'highestaudio',
      filter: 'audioonly'
    })

    stream.pipe(res)

    stream.on('error', (error) => {
      console.error('Stream error:', error)
      if (!res.headersSent) {
        res.status(500).json({ error: 'Erro no streaming do áudio' })
      }
    })
  } catch (error) {
    console.error('Audio download error:', error)
    if (!res.headersSent) {
      res.status(500).json({ error: 'Erro no download do áudio' })
    }
  }
})

// Rota de download de vídeo
app.get('/api/download/video', async (req, res) => {
  try {
    const { videoId } = req.query
    if (!videoId) {
      return res.status(400).json({ error: 'ID do vídeo não fornecido' })
    }

    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`
    const info = await ytdl.getInfo(videoUrl)
    const format = ytdl.chooseFormat(info.formats, { quality: 'highest' })

    const sanitizedTitle = sanitizeFilename(info.videoDetails.title)
    
    res.setHeader('Content-Type', 'video/mp4')
    res.setHeader('Content-Disposition', `attachment; filename=${sanitizedTitle}.mp4`)

    const stream = ytdl(videoUrl, {
      format: format,
      quality: 'highest'
    })

    stream.pipe(res)

    stream.on('error', (error) => {
      console.error('Stream error:', error)
      if (!res.headersSent) {
        res.status(500).json({ error: 'Erro no streaming do vídeo' })
      }
    })
  } catch (error) {
    console.error('Video download error:', error)
    if (!res.headersSent) {
      res.status(500).json({ error: 'Erro no download do vídeo' })
    }
  }
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
