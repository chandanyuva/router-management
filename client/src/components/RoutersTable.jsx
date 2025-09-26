import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import EditModal from './EditModal.jsx';

function RoutersTable({ routers }) {
  const [query, setQuery] = useState("");

  // Setup Fuse.js for fuzzy search
  const fuse = useMemo(() => new Fuse(routers, {
    keys: ["name", "ssid", "password"],// fields to search
    threshold: 0.3,// lower = stricter, higher = more fuzzy
  }), [routers]);

  const results = query ? fuse.search(query).map(r => r.item) : routers;

  return (
    <div>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="🔍 Search routers..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>SSID</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.length > 0 ? (
            results.map(router => (
              <tr key={router.id}>
                <td>{router.id}</td>
                <td>{router.name}</td>
                <td>{router.ssid}</td>
                <td>{router.password}</td>
                <td><EditModal router={router} /></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No routers found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RoutersTable;

