import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow p-4 flex justify-between">
      <h1 className="font-bold text-lg cursor-pointer" onClick={() => navigate("/recommend")}>
        🎓 College Finder
      </h1>

      <div className="flex gap-3">
        <button
          onClick={() => navigate("/favorites")}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          ❤️ Favorites
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/");
          }}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}