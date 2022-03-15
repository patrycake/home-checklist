import React, { useState } from "react";
import {
  doc,
  setDoc,
  updateDoc,
  query,
  collection,
  where,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../firebase";

export default function CreateModal({ setIsModal, userId, isNewData }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    frequency: 1,
  });
  function handleSubmit() {
    console.log(formData);
    if (
      formData.name !== "" &&
      formData.description !== "" &&
      parseInt(formData.frequency) > 0
    ) {
      //add to firestore
      console.log("save", {
        ...formData,
        completed: new Array(formData.frequency).fill(false),
      });
      addItemDb();
      console.log("close modal");
      setIsModal(false);
      isNewData(true);
    }
  }
  async function addItemDb() {
    // const q = query(collection(db, "users"), where("uid", "==", userId));
    const ref = doc(db, "users", userId);
    await updateDoc(ref, {
      data: arrayUnion({
        ...formData,
        completed: new Array(formData.frequency).fill(false),
      }),
    });
  }

  function handleChange(event) {
    let { name, value } = event.target;
    if (name === "frequency") value = parseInt(value);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }
  return (
    <div className="modal is-active">
      <div className="modal-background model-bg"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Create Item</p>
          <button
            className="delete"
            aria-label="close"
            onClick={() => setIsModal(false)}
          ></button>
        </header>
        <section className="modal-card-body">
          <div className="field">
            <label className="label">Item Name</label>
            <div className="control">
              <input
                className="input is-primary"
                type="text"
                placeholder="Name"
                value={formData.name}
                name="name"
                onChange={handleChange}
              />
            </div>
            {formData.name === "" && (
              <p class="help is-danger">Name cannot be blank</p>
            )}
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                className="textarea is-primary"
                placeholder="Description"
                value={formData.description}
                name="description"
                onChange={handleChange}
              ></textarea>
            </div>
            {formData.description === "" && (
              <p class="help is-danger">Description cannot be blank</p>
            )}
          </div>
          <div className="field">
            <label className="label">Frequency per Year</label>
            <div className="control">
              <input
                type="number"
                min="1"
                max="24"
                className="is-primary"
                name="frequency"
                onChange={handleChange}
                value={formData.frequency}
              />
            </div>
            {formData.frequency <= 0 && (
              <p class="help is-danger">Frequency needs to be greater than 0</p>
            )}
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-primary" onClick={handleSubmit}>
            Save changes
          </button>
          <button className="button" onClick={() => setIsModal(false)}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
}
