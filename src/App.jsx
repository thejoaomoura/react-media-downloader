import { useState } from 'react'
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
import MediaPlayer from './components/MediaPlayer'
import { Toaster } from 'react-hot-toast'

function App() {
  const [searchResults, setSearchResults] = useState([])
  const [selectedMedia, setSelectedMedia] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleMediaSelect = (media, type) => {
    setSelectedMedia({ ...media, downloadType: type })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Atrox Media Downloader</h1>
        <SearchBar setSearchResults={setSearchResults} setLoading={setLoading} />
        <SearchResults 
          results={searchResults} 
          onSelect={handleMediaSelect}
        />
        {selectedMedia && <MediaPlayer data={selectedMedia} />}
      </div>
      <Toaster position="bottom-right" />
    </div>
  )
}

export default App
