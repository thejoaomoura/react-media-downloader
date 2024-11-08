import { useState } from 'react'
import { searchMedia } from '../services/api'
import toast from 'react-hot-toast'
import { Search, Loader2 } from 'lucide-react'

export default function SearchBar({ setSearchResults, setLoading }) {
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsSearching(true)
    setLoading(true)
    try {
      const results = await searchMedia(query)
      setSearchResults(results)
    } catch (error) {
      console.error('Erro na busca:', error)
      toast.error('Falha ao buscar mídia')
    } finally {
      setIsSearching(false)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar música ou vídeo..."
            className="w-full px-4 py-2 pl-10 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSearching}
          />
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button
          type="submit"
          disabled={isSearching}
          className={`px-6 py-2 rounded-lg transition-colors inline-flex items-center gap-2 ${
            isSearching 
              ? 'bg-gray-500 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isSearching ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Buscando...
            </>
          ) : (
            <>
              <Search className="w-4 h-4" />
              Buscar
            </>
          )}
        </button>
      </div>
    </form>
  )
}
