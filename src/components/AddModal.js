import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  query,
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

function AddModal({ setIsModal, isNewData, userId }) {
  const [options, setOptions] = useState([]);
  const [formData, setFormData] = useState("");

  useEffect(() => {
    async function getUserData() {
      const q = query(collection(db, "starter_data"));
      const docs = await getDocs(q);
      console.log(docs.docs[0].data().data);
      console.log(docs.docs[0].id);
      setOptions(docs.docs.map((doc) => doc.id));
      //   setUseID(docs.docs[0].id);
      //   setUserItems(docs.docs[0].data().data);
    }

    getUserData().catch(console.error);
  }, []);

  const optElm = options.map((opt) => <option value={opt}>{opt}</option>);

  function handleSubmit() {
    console.log(formData);
    getStarterData();
  }
  async function getStarterData() {
    console.log("get data", formData);
    const ref = doc(db, "starter_data", formData);
    const docSnap = await getDoc(ref);
    console.log(docSnap.data());
    addItemDb(docSnap.data()).then(() => {
      isNewData(true);
      setIsModal(false);
    });
  }

  async function addItemDb(item) {
    const ref = doc(db, "users", userId);
    await updateDoc(ref, {
      data: arrayUnion({
        ...item,
        name: formData,
      }),
    });
  }

  function handleChange(event) {
    console.log(event.target.value);
    setFormData(event.target.value);
  }
  return (
    <div className="modal  is-active">
      <div className="modal-background model-bg"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Add Item</p>
          <button
            className="delete"
            aria-label="close"
            onClick={() => setIsModal(false)}
          ></button>
        </header>
        <section className="modal-card-body">
          <div className="select is-multiple is-large is-primary">
            <select
              //   size={optElm.length}
              value={formData}
              onChange={handleChange}
              name="item"
            >
              {optElm}
            </select>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={handleSubmit}>
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

export default AddModal;
