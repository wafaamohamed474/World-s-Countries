import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import CountryDetails from "./pages/CountryDetailes/CountryDetailes";
import CountrySearch from "./pages/Home/test";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/country/:CountryID" element={<CountryDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
