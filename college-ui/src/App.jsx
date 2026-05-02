import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Recommend from "./pages/Recommend";
import Favorites from "./pages/Favorites";

function App() {
  const isLoggedIn = localStorage.getItem("user");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recommend" element={isLoggedIn ? <Recommend /> : <Login />} />
        <Route path="/favorites" element={isLoggedIn ? <Favorites /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;