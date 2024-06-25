import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Loading from "../Components/Loading";

const getRooms = () => fetch("/api/rooms").then((res) => res.json());

export default function Rooms() {
  const query = useQuery({ queryKey: ["rooms"], queryFn: getRooms });

  if (query.isLoading) {
    return (
      <main id="rooms" className="flex justify-center items-center h-screen">
        <Loading />
      </main>
    );
  }

  if (query.isError) {
    return <div>Error loading rooms.</div>;
  }

  return (
    <main id="rooms" className="w-3/4 mx-auto p-6">
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {query.data.rooms.map((room) => (
          <article
            key={room.id}
            className="bg-gray-300 p-4 rounded-lg shadow-lg flex justify-between items-center border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-800">{room.name}</h2>
            <Link className="text-blue-500 flex items-center hover:text-blue-700" to={`/rooms/${room.id}`}>
              <span className="mr-2">See the items in the category</span>
              <FaArrowRight />
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
