import { Link, Route, Routes } from "react-router-dom";

import Table1 from "./table1/Table1";
import Table2 from "./table2/Table2";
import Table3 from "./table3/Table3";
import Demo4 from "./demo4";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center px-4">
          <div className="max-w-md mx-auto">
            <h1 className="text-5xl font-bold mb-8">
              Welcome to Component Demos
            </h1>
            <p className="text-lg mb-8">
              Explore our beautiful collection of UI components built with React
              and Tailwind CSS
            </p>
            <div className="flex flex-col gap-4">
              <Link
                to="/table1"
                className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors"
              >
                Table 1 - HTML Table
              </Link>
              <Link
                to="/table2"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Table 2 - AG Grid
              </Link>
              <Link
                to="/table3"
                className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
              >
                Table 3 - Split Layout
              </Link>
              <Link
                to="/demo4"
                className="px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 transition-colors"
              >
                Auth Form
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/table1" element={<Table1 />} />
      <Route path="/table2" element={<Table2 />} />
      <Route path="/table3" element={<Table3 />} />
      <Route path="/demo4" element={<Demo4 />} />
    </Routes>
  );
}

export default App;
