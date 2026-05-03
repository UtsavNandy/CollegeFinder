import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BASE_URL from "../api"; // ✅ import base URL


export default function Favorites() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchFav = async () => {
      try {
        const email = localStorage.getItem("user");

        if (!email) {
          alert("Please login first");
          return;
        }

        const res = await axios.get(
          `${BASE_URL}/favorite/get?email=${email}`
        );

        setData(res.data);
      } catch (error) {
        console.error(error);
        alert("Failed to load favorites ❌");
      }
    };

    fetchFav();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="grid md:grid-cols-3 gap-6 p-6">
        {data.map((c) => (
          <div key={c.id} className="bg-white rounded-xl shadow-lg">
            <img
              src={c.imageUrl}
              alt={c.name}
              className="w-full h-40 object-cover"
            />

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