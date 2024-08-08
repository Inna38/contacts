import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage/MainPage";
import ContactDetailsPage from "./pages/ContactDetailsPage/ContactDetailsPage";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/:contactId" element={<ContactDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
