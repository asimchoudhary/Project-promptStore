import QueryBox from "./QueryBox";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Store from "./components/Store";

function App() {
  return (
    <Router>
      <div className="bg-[#fbfff0] min-h-screen">
        <nav className="flex justify-center pt-3">
          <div className="w-fit border-b-2 border-black">
            <h1 className="text-2xl font-mono">Prompt Store</h1>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<QueryBox />} />
          <Route path="/store" element={<Store />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
