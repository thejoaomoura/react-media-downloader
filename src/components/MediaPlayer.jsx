import { useState } from 'react'
import { downloadAudio, downloadVideo } from '../services/api'
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react'

export default function MediaPlayer({ data }) {
  const [downloading, setDownloading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleDownload = async () => {
    if (!data?.id) {
      toast.error('ID do vídeo inválido')
      return
    }

    setDownloading(true)
    setProgress(0)
    
    try {
      const blobUrl = data.downloadType === 'audio' 
        ? await downloadAudio(data.id, setProgress)
        : await downloadVideo(data.id, setProgress)

      const link = document.createElement('a')
      link.href = blobUrl
      link.download = `${data.title || 'download'}.${data.downloadType === 'audio' ? 'mp3' : 'mp4'}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      setTimeout(() => URL.revokeObjectURL(blobUrl), 100)
      toast.success(`Download do ${data.downloadType === 'audio' ? 'áudio' : 'vídeo'} concluído`)
    } catch (error) {
      console.error(`Erro no download:`, error)
      toast.error(`Falha no download. Por favor, tente novamente.`)
    } finally {
      setDownloading(false)
      setProgress(0)
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto max-w-2xl">
        <div className="flex items-center justify-between">
          <div className="flex-1 mr-4">
            <h3 className="text-lg font-semibold line-clamp-1">{data.title}</h3>
            <p className="text-sm text-gray-400">
              {data.downloadType === 'audio' ? 'Download MP3' : 'Download MP4'}
            </p>
          </div>
          
          <button
            onClick={handleDownload}
            disabled={downloading}
            className={`inline-flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
              downloading 
                ? 'bg-gray-500 cursor-not-allowed' 
                : data.downloadType === 'audio'
                  ? 'bg-blue-500 hover:bg-blue-600'
                  : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            {downloading && <Loader2 className="w-4 h-4 animate-spin" />}
            {downloading ? 'Baixando...' : 'Baixar'}
          </button>
        </div>
        
        {downloading && (
          <div className="mt-2">
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-center text-sm text-gray-400 mt-1">
              {progress}%
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
