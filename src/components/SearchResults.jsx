import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { formatViews } from "../lib/utils"
import { Download, Music, Video } from "lucide-react"

export default function SearchResults({ results, onSelect }) {
  if (!results?.length) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {results.map((video) => (
        <Card key={video.url} className="bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs">
                {video.timestamp}
              </div>
            </div>
            <CardTitle className="text-lg text-white line-clamp-2">
              {video.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-gray-400">
              <p>Canal: {video.author.name}</p>
              <p>Visualizações: {formatViews(video.views)}</p>
            </div>
          </CardContent>
          <CardFooter className="justify-end space-x-2">
            <button
              onClick={() => onSelect(video, 'audio')}
              className="inline-flex items-center space-x-2 px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors"
            >
              <Music className="w-4 h-4" />
              <span>MP3</span>
            </button>
            <button
              onClick={() => onSelect(video, 'video')}
              className="inline-flex items-center space-x-2 px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition-colors"
            >
              <Video className="w-4 h-4" />
              <span>MP4</span>
            </button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
