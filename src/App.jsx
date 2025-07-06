import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage/HomePage";
import DetailPage from "./pages/DetailPage/DetailPage";

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Header/Navbar */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
        </Routes>
        {/* Footer */}
      </div>
    </Router>
  );
}

export default App;
