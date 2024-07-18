import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
