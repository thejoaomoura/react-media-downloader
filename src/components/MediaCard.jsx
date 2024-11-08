export default function MediaCard({ data }) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex flex-col md:flex-row gap-6">
        <img 
          src={data.thumbnail} 
          alt={data.title}
          className="w-full md:w-48 h-48 rounded-lg object-cover"
        />
        <div className="flex-1 space-y-2">
          <h2 className="text-xl font-bold">{data.title}</h2>
          <p className="text-gray-400">Channel: {data.author?.name}</p>
          <p className="text-gray-400">Duration: {data.timestamp}</p>
          <p className="text-gray-400">Views: {data.views}</p>
          <p className="text-gray-400 line-clamp-3">{data.description}</p>
        </div>
      </div>
    </div>
  )
}
