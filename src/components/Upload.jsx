import React, { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { request } from "../helpers/livepeer";
import Sidebar from "./Sidebar";
function UploadVideo() {
  const [video, setVideo] = useState();
  const [title, setTitle] = useState();
  const [description, setDesc] = useState();
   

  const [isAuth, setAuth] = useState(false);
  useEffect(() => {
    if (
      localStorage.getItem("CurrentCreator").toLowerCase() === localStorage.getItem("CurrentAccount").toLowerCase()
    ) {
      setAuth(true);
    }
  }, []);

  const handleVid = (event) => {
    setVideo(() => ([event.target.name] = event.target.value));
  };
  const handleTitle = (event) => {
    setTitle(() => ([event.target.name] = event.target.value));
  };
  const handleDesc = (event) => {
    setDesc(() => ([event.target.name] = event.target.value));
  };
  const handleSubmit = () => {
    request("0d8fda3d-24f6-4ff8-a53d-d74bec8ad10e");


  };
  if (isAuth) {
  return (
    <>
      <Sidebar />
      <form>
        <div className="container-fluid col-md-6">
          <h2 className="d-flex justify-content-center my-2">Upload Video</h2>
          <div className="mb-3">
            <label for="Title" className="form-label">
              Video Title
            </label>
            <input
              name="Title"
              onChange={handleTitle}
              type="text"
              className="form-control"
              id="Title"
              placeholder="ItemName"
            />
          </div>
          <div className="mb-3">
            <label for="description" className="form-label">
              Description
            </label>
            <textarea
              name="description"
              onChange={handleDesc}
              type="text-area"
              className="form-control"
              id="description"
              placeholder="Description"
            />
          </div>
          <div className="mb-3">
            <div className="input-group mb-3">
              <input
                type="file"
                className="form-control"
                id="inputGroupFile02"
                onChange={handleVid}
              />
              <label className="input-group-text" for="inputGroupFile02">
                Upload
              </label>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="d-grid btn btn-success my-3 col-2 mx-auto"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
  }else {
    return (
      <>
        <h1>Not Authorised</h1>
      </>
    );
  }
}
export default UploadVideo;
