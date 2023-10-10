import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import crossIcon from "../assets/icon-cross.svg";
import boardSlice from "../redux/boardSlice.js";
import { useDispatch, useSelector } from "react-redux";
export const AddEditBoardModal = ({ setBoardModalOpen, type }) => {
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [newColumns, setNewColumns] = useState([
    {
      name: "To Do",
      task: [],
      id: uuidv4(),
    },
    {
      name: "Doing",
      task: [],
      id: uuidv4(),
    },
  ]);

  const validate = () => {
    setIsValid(false);
    if (!name.trim()) {
      return;
    }

    for (let i = 0; i < newColumns.length; i++) {
      if (!newColumns[i].name.trim()) {
        return;
      }
    }

    setIsValid(true);
    return true;
  };

  const onSubmit = (type) => {
    setBoardModalOpen(false);
    if (type === "add") {
      dispatch(boardsSlice.actions.addBoard({ name, newColumns }));
    } else {
      dispatch(boardsSlice.actions.editBoard({ name, newColumns }));
    }
  };

  const onChange = (id, newValue) => {
    setNewColumns((prev) => {
      const newState = [...prev];
      const column = newState.find((column) => column.id === id);
      column.name = newValue;
      return newState;
    });
  };
  const onDelete = (id) => {
    setNewColumns((prev) => prev.filter((column) => column.id !== id));
  };
  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setBoardModalOpen(false);
      }}
      className="fixed right-0 left-0 top-0 scrollbar-hide bottom-0 px-2 py-4 overflow-scroll z-50 flex justify-center
    items-center  bg-[#00000080]"
    >
      {/*  Modal*/}
      <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full  px-8 py-8 rounded-xl">
        <h3 className="text-lg">
          {type === "edit" ? "Edit " : "Add New"} Board
        </h3>
        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            Board Columns
          </label>
          <input
            className="bg-transparent px-4 py-2 rounded-md text-sm border border-radius border-gray-600 focus:outline-[#635fc7] outline-1 ring-0"
            placeholder="e.g Web Development, Design"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="boar-name-input"
          />
        </div>

        {/*  Board Columns*/}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            Board Columns
          </label>
          {newColumns.map((column, index) => (
            <div className="flex items-center w-full" key={index}>
              <input
                className="bg-transparent flex-grow px-4 py-2 rounded-md text-sm border border-gray-600 foucs-outline-[#735fc7]"
                onChange={(e) => onChange(column.id, e.target.value)}
                value={column.name}
                type="text"
              />
              <img
                src={crossIcon}
                alt="crossIcon"
                className="cursor-pointer m-4"
                onClick={() => {
                  onDelete(column.id);
                }}
              />
            </div>
          ))}
        </div>
        <div>
          <button
            className="w-full items-center hover:opacity-75 dark:text-[#635fc7] dark:bg-white text-white bg-[#635fc7] rounded-full py-2 mt-2"
            onClick={() => {
              setNewColumns((prev) => [
                ...prev,
                {
                  name: "",
                  task: [],
                  id: uuidv4(),
                },
              ]);
            }}
          >
            + Add New Column
          </button>
          <button
            className="w-full items-center hover:opacity-75 dark:text-white dark:bg-[#635fc7] text-[#635fc7] bg-white rounded-full py-2 mt-8 relative border dark:border-0"
            onClick={() => {
              const isValid = validate();
              if (isValid === true) {
                onSubmit(type);
              }
            }}
          >
            {type === "add" ? "Create New Board " : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};
