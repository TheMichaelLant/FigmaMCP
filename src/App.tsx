import { Link, Route, Routes } from "react-router-dom";
import Table1 from "./table1/Table1";

function Home() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Component Demos</h1>
      <nav>
        <ul>
          <li>
            <Link to="/table1">Table 1</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/table1" element={<Table1 />} />
    </Routes>
  );
}

export default App;
