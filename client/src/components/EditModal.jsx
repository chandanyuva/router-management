import { useState } from "react"

export default function EditModal({ router, onUpdate }) {
  const [currentRouter, setCurrentRouter] = useState({ ...router });
  function updateDetails(e, key) {
    console.log("update before", key, e.target.value);

    setCurrentRouter(prev => ({
      ...prev,
      [key]: e.target.value   // <-- FIXED: computed property
    }));

    console.log("update after", key, e.target.value);
  }

  async function dbUpdateDetails(e) {
    e.preventDefault();
    try {
      const { id, name, ssid, password } = currentRouter;
      console.log(id, name, ssid, password)
      const response = await fetch(`http://localhost:3000/api/routers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, ssid, password }),
      })
      const data = await response.json(); // <-- parse JSON
      console.log("✅ Update response:", data);
      // ✅ Tell parent about the update
      if (onUpdate) onUpdate(data);
    } catch (err) {
      console.log("❌ Update failed:", err)
    }
  }
  // console.log(currentRouter);
  return (<>
    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#id-${currentRouter.id}`}>
      Edit
    </button>

    <div className="modal fade" id={`id-${currentRouter.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">{currentRouter.name}</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={currentRouter.name || ""}
                  onChange={e => updateDetails(e, "name")}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">SSID</label>
                <input
                  type="text"
                  className="form-control"
                  value={currentRouter.ssid || ""}
                  onChange={e => updateDetails(e, "ssid")}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="text"
                  className="form-control"
                  value={currentRouter.password || ""}
                  onChange={e => updateDetails(e, "password")}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-primary" onClick={e => dbUpdateDetails(e)} >Save</button>
          </div>
        </div>
      </div>
    </div>
  </>)
}

