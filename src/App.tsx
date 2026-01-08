import { Link, Route, Routes } from "react-router-dom";
import Table1 from "./table1/Table1";
import Table2Wrapper from "./table2/Table2Wrapper";

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
            <Link to="/table1" className="btn btn-accent btn-lg">
              Iteration 1
            </Link>
            <Link to="/table2" className="btn btn-primary btn-lg ml-4">
              Iteration 2
            </Link>
          </div>
        </div>
      </div>

      {/* Components Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">
          Available Components
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Table 1 Card */}
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
            <div className="card-body">
              <h2 className="card-title">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Table 1 (CSS)
              </h2>
              <p>
                Custom CSS implementation with sorting, filtering, and custom
                styling.
              </p>
              <div className="card-actions justify-end mt-4">
                <Link to="/table1" className="btn btn-primary">
                  View Demo
                </Link>
              </div>
            </div>
          </div>

          {/* Table 2 Card */}
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
            <div className="card-body">
              <h2 className="card-title">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Table 2 (AG Grid)
              </h2>
              <p>
                Modern implementation with AG Grid, Tailwind, and DaisyUI
                components.
              </p>
              <div className="card-actions justify-end mt-4">
                <Link to="/table2" className="btn btn-primary">
                  View Demo
                </Link>
              </div>
            </div>
          </div>

          {/* Wrapper 2 Card */}
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
            <div className="card-body">
              <h2 className="card-title">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Wrapper 2
              </h2>
              <p>Alternative wrapper implementation with enhanced features.</p>
              <div className="card-actions justify-end mt-4">
                <Link to="/wrapper2" className="btn btn-primary">
                  View Demo
                </Link>
              </div>
            </div>
          </div>

          {/* Placeholder cards for future components */}
          <div className="card bg-base-100 shadow-xl opacity-60">
            <div className="card-body">
              <h2 className="card-title">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Form Component
              </h2>
              <p>Coming soon - Advanced form handling with validation.</p>
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-disabled">Coming Soon</button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl opacity-60">
            <div className="card-body">
              <h2 className="card-title">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  />
                </svg>
                Chart Component
              </h2>
              <p>Coming soon - Beautiful data visualizations and charts.</p>
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-disabled">Coming Soon</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-300 text-base-content rounded">
        <div>
          <p className="font-bold">Component Library Demo</p>
          <p>Built with React, TypeScript, and daisyUI</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/table1" element={<Table1 />} />
      <Route path="/table2" element={<Table2Wrapper />} />
      <Route path="/wrapper2" element={<Table2Wrapper />} />
    </Routes>
  );
}

export default App;
