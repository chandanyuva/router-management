import { useState } from "react"

export default function EditModal({ router }) {
  const [currentRouter, setCurrentRouter] = useState({ ...router });
  function updateDetails(e, key) {
    console.log("update", key, e.target.value)
    setCurrentRouter({ ...currentRouter, key: e.target.value })
  }
  async function dbUpdateDetails(e) {
    e.preventDefault();
    try {
      const body = { currentRouter }
      const response = await fetch(`/api/routers/${currentRouter.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
      console.log(response)
    } catch (err) {
      console.log(err)
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
                  defaultValue={currentRouter.name}
                  onChange={e => updateDetails(e, "name")}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">SSID</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={currentRouter.ssid}
                  onChange={e => updateDetails(e, "ssid")}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={currentRouter.password}
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

