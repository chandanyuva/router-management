import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import EditModal from './EditModal.jsx';

function RoutersTable({ routers }) {
  const [query, setQuery] = useState("");

  // Setup Fuse.js for fuzzy search
  const fuse = useMemo(() => new Fuse(routers, {
    keys: ["name", "ssid"],// fields to search
    threshold: 0.3,// lower = stricter, higher = more fuzzy
  }), [routers]);

  const results = query ? fuse.search(query).map(r => r.item) : routers;

  async function dbUpdateDetails(e, id) {
    e.preventDefault();
    try {
      console.log("ID:", id)
      const response = await fetch(`http://localhost:3000/api/routers/${id}`, {
        method: "DELETE",
        // headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ name, ssid, password }),
      })
      const data = await response.json(); // <-- parse JSON
      console.log("✅ Delete response:", data);
      window.location = "/"; // remove this to see logs before submiting the form
    } catch (err) {
      console.log("❌ Delete failed:", err)
    }
  }


  return (
    <div>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="🔍 Search routers..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <table className="table table-bordered table-striped table-hover caption-top">
        <caption>List of routers</caption>
        <thead className="table-dark">
          <tr>
            <th>Sl.No</th>
            <th>DB ID</th>
            <th>Name</th>
            <th>SSID</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.length > 0 ? (
            results.map((router, index) => (
              <tr key={router.id} >
                <td>{index + 1}</td>
                <td>{router.id}</td>
                <td>{router.name}</td>
                <td>{router.ssid}</td>
                <td>{router.password}</td>
                <td className="d-flex justify-content-evenly">
                  <EditModal router={router} />
                  <button className="btn btn-danger" type="button" onClick={(e) => {
                    dbUpdateDetails(e, router.id);
                  }}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No routers found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RoutersTable;

