import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import iconCross from "../assets/icon-cross.svg";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../redux/boardSlice.js";

export const AddEditTaskModel = ({
  type,
  device,
  setOpenAddEditTask,
  taskIndex,
  prevColIndex = 0,
}) => {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );

  const columns = board.columns;
  const col = columns.find((col, index) => index === prevColIndex);

  const [status, setStatus] = useState(columns[prevColIndex].name);
  const [newColIndex, setNewColIndex] = useState(prevColIndex);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [subtasks, setSubtasks] = useState([
    {
      title: "",
      isCompleted: false,
      id: uuidv4(),
    },
    {
      title: "",
      isCompleted: false,
      id: uuidv4(),
    },
  ]);

  const onChange = (id, newValue) => {
    setSubtasks((prev) => {
      const newState = [...prev];
      const subtask = newState.find((subtask) => subtask.id === id);
      subtask.title = newValue;
      return newState;
    });
  };

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };
  const onDeleteSubtask = (id) => {
    setSubtasks((prev) => prev.filter((subtask) => subtask.id !== id));
  };

  const validate = () => {
    setIsValid(false);
    if (!title.trim()) {
      return false;
    }

    for (let i = 0; i < subtasks.length; i++) {
      if (!subtasks[i].title.trim()) {
        return false;
      }
    }

    setIsValid(true);
    return true;
  };

  const onSubmit = (type) => {
    setOpenAddEditTask(false);
    if (type === "add") {
      dispatch(
        boardsSlice.actions.addTask({
          title,
          description,
          subtasks,
          status,
          newColIndex,
        })
      );
    } else {
      dispatch(
        boardsSlice.actions.editTask({
          title,
          description,
          subtasks,
          taskIndex,
          status,
          newColIndex,
          prevColIndex,
        })
      );
    }
  };
  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenAddEditTask(false);
      }}
      className={
        device === "mobile"
          ? "  py-6 px-6 pb-40  absolute overflow-y-scroll  left-0 flex  right-0 bottom-[-100vh] top-0 dropdown"
          : "  py-6 px-6 pb-40  absolute overflow-y-scroll  left-0 flex  right-0 bottom-0 top-0 dropdown "
      }
    >
      {/*Modal Section*/}
      <div className="scrollbar-hide overflow-y-scroll max-h-[95vh]  my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl">
        {/*  Header*/}
        <h3 className="text-lg">{type === "edit" ? "Edit" : "Add New"} Task</h3>
        {/*  Task Name*/}
        <div className="mt-8 flex flex-col space-y-1">
          <label
            htmlFor="taskName"
            className="text-sm dark:text-white text-gray-500"
          >
            Task Name
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="task-name-input"
            type="text"
            className=" bg-transparent  px-4 py-2 outline-none focus:border-0 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0  "
            placeholder=" e.g Take coffee break"
          />
        </div>

        {/*  Description*/}

        <div className="mt-8 flex flex-col space-y-1">
          <label
            htmlFor="taskName"
            className="text-sm dark:text-white text-gray-500"
          >
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="task-name-input"
            className=" bg-transparent  min-h-[200px] px-4 py-2 outline-none focus:border-0 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0  "
            placeholder=" e.g It's always good to take a break and relax This 15 minute breake will recharge the the batteries a little"
          />
        </div>

        {/*  Subtask Section*/}
        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm dark:text-white text-gray-500">
            Subtasks
          </label>
          {
            // Subtask
            subtasks.map((subtask, index) => (
              <div key={index} className="flex items-center w-full">
                <input
                  onChange={(e) => {
                    onChange(subtask.id, e.target.value);
                  }}
                  value={subtask.title}
                  className="bg-transparent outline-none focus:border-0  border flex-grow px-4 py-2 rounded-md text-sm border-gray-600 focus-outline-[#635fc7]"
                  placeholder="e.g Take coffee break"
                />
                <img
                  onClick={() => {
                    onDeleteSubtask(subtask.id);
                  }}
                  src={iconCross}
                  alt="close icon"
                  className="m-4 cursor-pointer"
                />
              </div>
            ))
          }
          <button
            className="w-full items-center dark:text-white text-white bg-[#635fc7] py-2 rounded-full"
            onClick={() => {
              setSubtasks((prev) => [
                ...prev,
                {
                  title: "",
                  isCompleted: false,
                  id: uuidv4(),
                },
              ]);
            }}
          >
            + Add New Subtask
          </button>
        </div>

        {/*Current Status*/}

        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            Current Status
          </label>
          <select className="select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0  border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none">
            {columns.map((column, index) => (
              <option key={index}>{column.name}</option>
            ))}
          </select>
          <button
            onClick={() => {
              const isValid = validate();
              if (isValid) {
                onSubmit(type);
                setOpenAddEditTask(false);
              }
            }}
            className="w-full items-center text-white bg-[#635fc7] py-2 rounded-full"
          >
            {type === "edit" ? " save edit" : "Create task"}
          </button>
        </div>
      </div>
    </div>
  );
};
