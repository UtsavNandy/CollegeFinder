import axios from "axios";
import { useState } from "react";
import Navbar from "../components/Navbar";
import BASE_URL from "../api";

export default function Recommend() {
  const [rank, setRank] = useState("");
  const [budget, setBudget] = useState("");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/college/recommend?rank=${rank}&budget=${budget}`
      );
      setData(res.data);
    } catch (error) {
      console.error(error);
      alert("Error fetching data ❌");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="p-6 max-w-xl mx-auto">
        <input
          className="border p-2 w-full mb-2"
          placeholder="Rank"
          onChange={(e) => setRank(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Budget"
          onChange={(e) => setBudget(e.target.value)}
        />

        <button
          onClick={fetchData}
          className="bg-green-500 text-white p-2 w-full rounded hover:bg-green-600"
        >
          Search
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 p-6">
        {data.map((item) => {
          const c = item.college;

          return (
            <div key={c.id} className="bg-white rounded-xl shadow-lg">
              <img
                src={c.imageUrl}
                alt={c.name}
                className="w-full h-40 object-cover"
              />

              <div className="p-4">
                <h3 className="font-bold">{c.name}</h3>

                <p>Match: {item.score}%</p>

                <div className="bg-gray-200 h-2 rounded">
                  <div
                    className="bg-green-500 h-2 rounded"
                    style={{ width: `${item.score}%` }}
                  />
                </div>

                <p>₹{c.fees}</p>

                {/* ✅ SAVE FAVORITE */}
                <button
                  onClick={async () => {
                    try {
                      const email = localStorage.getItem("user");

                      await axios.post(`${BASE_URL}/favorite/save`, {
                        email,
                        collegeId: c.id,
                      });

                      alert("Saved!");
                    } catch (error) {
                      console.error(error);
                      alert("Failed to save ❌");
                    }
                  }}
                  className="bg-pink-500 text-white w-full mt-2 p-2 rounded hover:bg-pink-600"
                >
                  ❤️ Save
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}