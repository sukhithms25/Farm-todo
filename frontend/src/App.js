import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import ListToDoLists from "./ListTODOList";
import ToDoList from "./ToDoList";

function App() {
  const [listSummaries, setListSummaries] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    reloadData();
  }, []);

  async function reloadData() {
    try {
      const response = await axios.get("/api/lists");
      setListSummaries(response.data || []); // ✅ SAFE
    } catch (error) {
      console.error("Error loading data:", error);
      setListSummaries([]); // ✅ prevent crash
    }
  }

  async function handleNewToDoList(newName) {
    try {
      await axios.post(`/api/lists`, { name: newName });
      reloadData();
    } catch (error) {
      console.error("Error creating list:", error);
    }
  }

  async function handleDeleteToDoList(id) {
    try {
      await axios.delete(`/api/lists/${id}`);
      reloadData();
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  }

  function handleSelectList(id) {
    setSelectedItem(id);
  }

  function backToList() {
    setSelectedItem(null);
    reloadData();
  }

  return (
    <div className="App">
      {selectedItem === null ? (
        <ListToDoLists
          listSummaries={listSummaries}
          handleSelectList={handleSelectList}
          handleNewToDoList={handleNewToDoList}
          handleDeleteToDoList={handleDeleteToDoList}
        />
      ) : (
        <ToDoList listId={selectedItem} handleBackButton={backToList} />
      )}
    </div>
  );
}

export default App;