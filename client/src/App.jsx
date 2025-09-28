import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import RoutersTable from './components/RoutersTable.jsx';

import { useEffect, useState } from "react";

function App() {
  const [routers, setRouters] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/routers") // backend API
      .then(res => res.json())
      .then(data => setRouters(data))
      .catch(err => console.error("Error fetching routers:", err));
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-primary">Routers Dashboard</h1>
      <RoutersTable routers={routers} />
    </div>
  );
}

export default App;
