export default function TravelImage() {
  return (
    <div className="relative h-full w-full">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/placeholder.svg?height=1080&width=720')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/30 to-blue-500/30"></div>
      </div>
      <div className="absolute bottom-0 left-0 p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Discover Your Next Adventure</h2>
        <p className="text-lg">Join Journee and explore the world's most beautiful destinations</p>
      </div>
    </div>
  )
}
