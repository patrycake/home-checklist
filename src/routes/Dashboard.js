import { useAuthState, db } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import AddModal from "../components/AddModal";
import CreateModal from "../components/CreateModal";
import List from "../components/List";

function Dashboard() {
  const state = useAuthState();
  const [userItems, setUserItems] = useState([]);
  const [isAddModal, setAddIsModal] = useState(false);
  const [isCreateModal, setCreateIsModal] = useState(false);
  const [userID, setUseID] = useState("");
  const [isNewData, setIsNewData] = useState(true);
  const [isActiveButton, setIsActiveButton] = useState("All");
  const [list, setList] = useState(userItems);

  useEffect(() => {
    console.log("useEfect Dash");
    async function getUserData() {
      const q = query(
        collection(db, "users"),
        where("uid", "==", state.user.uid)
      );
      const docs = await getDocs(q);
      console.log(docs.docs[0].data().data);
      console.log(docs.docs[0].id);
      setUseID(docs.docs[0].id);
      setUserItems(docs.docs[0].data().data);
      if (isActiveButton === "All") setList(docs.docs[0].data().data);
    }

    if (isNewData) {
      getUserData().catch(console.error);
      setIsNewData(false);
    }
  }, [isNewData]);

  function handleClick(event) {
    setIsActiveButton(event.target.innerText);
    if (event.target.innerText === "All") setList(userItems);
    else if (event.target.innerText === "Completed") setList([]);
    else if (event.target.innerText === "Not Completed") setList([]);
  }

  return (
    <div className="dashboard container block">
      {isAddModal && (
        <AddModal
          setIsModal={setAddIsModal}
          userId={userID}
          isNewData={setIsNewData}
        />
      )}
      {isCreateModal && (
        <CreateModal
          setIsModal={setCreateIsModal}
          userId={userID}
          isNewData={setIsNewData}
        />
      )}
      <h1 className="title is-1">Hello, {state.user.displayName}</h1>
      <div className="buttons">
        <button
          className="button block is-primary"
          onClick={() => setAddIsModal(true)}
        >
          Add Item
        </button>
        <button className="button block" onClick={() => setCreateIsModal(true)}>
          Create New Item
        </button>
      </div>
      <hr />
      <div className="container level">
        <div className="buttons container level-item">
          <button
            className={
              isActiveButton === "All"
                ? "button is-white has-text-primary"
                : "button is-white"
            }
            onClick={handleClick}
          >
            All
          </button>{" "}
          {"|"}
          <button
            className={
              isActiveButton === "Completed"
                ? "button is-white has-text-primary"
                : "button is-white"
            }
            onClick={handleClick}
          >
            Completed
          </button>
          {"|"}
          <button
            className={
              isActiveButton === "Not Completed"
                ? "button is-white has-text-primary"
                : "button is-white"
            }
            onClick={handleClick}
          >
            Not Completed
          </button>
        </div>
      </div>
      <div className="columns is-multiline">
        <List list={list} />
      </div>
    </div>
  );
}
export default Dashboard;
