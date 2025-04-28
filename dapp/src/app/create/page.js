"use client";

import { useState } from "react";
import { addCampaing, nextId } from "@/services/web3Service";

export default function Create() {
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [campaign, setCampaign] = useState({});

  function onInputChange(event) {
    setCampaign({ ...campaign, [event.target.id]: event.target.value });
  }

  function btnSaveClick() {
    setMessage('');
    setErrorMessage('');
    setMessage('Saving campaing');
    addCampaing(campaign)
      .then(() => nextId())
      .then(id => {
        setMessage(`Campaign created! Please use this link to donate: http://localhost:3000/donate/${id}`);
      })
      .catch(err => {
        setMessage('');
        console.error(err);
        setErrorMessage(err.message);
      });
  }

  return (
    <>
      <div className="container">
        <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3 mt-5">Donate Crypto</h1>
        <p>Fill the form to create our campaign</p>
        <hr className="mb-4" />
        <div className="col-6">
          <div className="form-floating mb-3">
            <input type="text" id="title" className="form-control" placeholder="Title"
              onChange={onInputChange} value={campaign.title || ""} />
            <label htmlFor="title">Title</label>
          </div>
          <div className="form-floating mb-3">
            <textarea id="description" className="form-control" placeholder="Description"
              onChange={onInputChange} value={campaign.description || ""} />
            <label htmlFor="description">Description</label>
          </div>
          <div className="form-floating mb-3">
            <input type="text" id="imageUrl" className="form-control" placeholder="Link"
              onChange={onInputChange} value={campaign.imageUrl || ""} />
            <label htmlFor="link">Image URL</label>
          </div>
          <div className="form-floating mb-3">
            <input type="text" id="videoUrl" className="form-control" placeholder="Image"
              onChange={onInputChange} value={campaign.videoUrl || ""} />
            <label htmlFor="image">Video URL</label>
          </div>
          <div className="col-12 mb-3">
            <button className="btn btn-primary col-12 p-3" onClick={btnSaveClick}>Create</button>
          </div>
          {
            message ?
              <div className="alert alert-success p-3 col-12 mt-3" role="alert">{message}</div> :
              <></>
          }
          {
            errorMessage ?
              <div className="alert alert-danger p-3 col-12 mt-3" role="alert">{errorMessage}</div> :
              <></>
          }
        </div>

      </div>
    </>
  );
}
