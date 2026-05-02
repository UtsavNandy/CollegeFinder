import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Favorites() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchFav = async () => {
      const email = localStorage.getItem("user");

      const res = await axios.get(
        `http://localhost:8080/favorite/get?email=${email}`
      );

      setData(res.data);
    };

    fetchFav();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="grid md:grid-cols-3 gap-6 p-6">
        {data.map((c) => (
          <div key={c.id} className="bg-white rounded-xl shadow-lg">
            <img src={c.imageUrl} className="w-full h-40 object-cover" />

            <div className="p-4">
              <h3 className="font-bold">{c.name}</h3>
              <p>₹{c.fees}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}