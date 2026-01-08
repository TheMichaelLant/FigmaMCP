import { Link, Route, Routes } from "react-router-dom";

import Table1 from "./table1/Table1";
import Table2 from "./table2/Table2";
import Table3 from "./table3/Table3";
import Demo4 from "./demo4";

function Home() {
  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <div className="hero min-h-screen bg-gradient-to-br from-primary to-secondary">
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold mb-8">
              Welcome to Component Demos
            </h1>
            <p className="text-lg mb-8">
              Explore our beautiful collection of UI components built with React
              and daisyUI
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <Link to="/table1" className="btn btn-accent btn-lg">
                  Iteration 1
                </Link>
                <Link to="/table2" className="btn btn-primary btn-lg">
                  Iteration 2
                </Link>
              </div>
              <Link to="/table3" className="btn btn-secondary btn-lg">
                Table 3 - Split Layout
              </Link>
              <Link to="/demo4" className="btn btn-info btn-lg">
                Demo 4 - Auth Form
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
