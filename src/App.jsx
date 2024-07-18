import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="*" element={<NotFound/>}/>
          <Route path="/" element={<Login  />} />
        </Routes>
      <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
