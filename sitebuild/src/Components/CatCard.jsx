export default function CatCard({ name, image, description }) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="text-3xl font-semibold mb-2">{name}</h2>
          <p className="text-gray-800">{description}</p>
        </div>
      </div>
    );
  }


