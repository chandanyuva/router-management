import { useState } from "react";


export default function CreateRouter() {
  const [newRouter, setNewRouter] = useState({ name: "", ssid: "", password: "" });



  function updateDetails(e, key) {
    // console.log(key, e.target.value);


    setNewRouter(prev => ({
      ...prev,
      [key]: e.target.value   // <-- FIXED: computed property
    }));

    // console.log("Set", key, "to:", newRouter[`${key}`]);
  }


  async function dbUpdateDetails(e) {
    e.preventDefault();
    try {
      const { name, ssid, password } = newRouter;
      console.log(name, ssid, password)
      const response = await fetch(`http://localhost:3000/api/routers/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, ssid, password }),
      })
      const data = await response.json(); // <-- parse JSON
      console.log("✅ Post response:", data);
      window.location = "/"; // remove this to see logs before submiting the form
    } catch (err) {
      console.log("❌ Post failed:", err)
    }
  }

  return (<>
    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createRouter">
      + Add Router
    </button>

    <div className="modal fade" id="createRouter" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => {
              setNewRouter({ name: "", ssid: "", password: "" })
            }}></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Router Name"
                  value={newRouter.name}
                  onChange={e => updateDetails(e, "name")}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">SSID</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Router SSID"
                  value={newRouter.ssid}
                  onChange={e => updateDetails(e, "ssid")}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Router Password"
                  value={newRouter.password}
                  onChange={e => updateDetails(e, "password")}
                />
              </div>
            </form>

          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => {
              setNewRouter({ name: "", ssid: "", password: "" })
            }}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={(e) => { dbUpdateDetails(e) }}>Add</button>
          </div>
        </div>
      </div>
    </div></>)
}
