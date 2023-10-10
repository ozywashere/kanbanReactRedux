import { useState } from "react";
import logo from "../assets/logo-mobile.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import iconDown from "../assets/icon-chevron-down.svg";
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import { HeaderDropdown } from "./HeaderDropdown.jsx";
import { AddEditBoardModal } from "../modals/AddEditBoardModal.jsx";
import { useDispatch, useSelector } from "react-redux";
import { AddEditTaskModel } from "../modals/AddEditTaskModel.jsx";
import { ElipsisMenu } from "./ElipsisMenu.jsx";
import { DeleteModal } from "./DeleteModal.jsx";
import boardsSlice from "../redux/boardSlice.js";

export const Header = ({ setBoardModalOpen, boardModalOpen }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openAddEditTask, setOpenAddEditTask] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [boardType, setBoardType] = useState("add");
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);

  const dispatch = useDispatch();

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

  const setOpenEditModal = () => {
    setBoardModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsElipsisMenuOpen(false);
  };
  const onDropdownClick = () => {
    setOpenDropdown((state) => !state);
    setIsElipsisMenuOpen(false);
    setBoardType("add");
  };

  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      dispatch(boardsSlice.actions.deleteBoard());
      dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="p-4 fixed left-0 right-0 bg-white dark:bg-[#2b2c37] z-50">
      <header className="flex justify-between dark:text-white items-center">
        {/*Left Side*/}
        <div className="flex items-center space-x-2 md:space-x-4">
          <img src={logo} alt="logo" className="h-6 w-6" />
          <h3 className="hidden md:inline-block font-bold font-sans md:text-4xl">
            Kanban
          </h3>
          <div className="flex items-center">
            <h3 className="truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans">
              {board?.name}
            </h3>
            <img
              src={openDropdown ? iconUp : iconDown}
              alt="dropdown icon"
              className="w-3 mt-[6px] ml-2 md:hidden cursor-pointer"
              onClick={onDropdownClick}
            />
          </div>
        </div>
        {/*Right Side*/}

        <div className="flex space-x-4 items-center md:space-x-6">
          <button
            className="btn hidden md:block"
            onClick={() => setOpenAddEditTask(true)}
          >
            + Add New Task
          </button>
          <button
            className="btn py-1 px-3 md:hidden"
            onClick={() => {
              setBoardModalOpen((prev) => !prev);
            }}
          >
            +
          </button>
          <button
            onClick={() => {
              setBoardType("edit");
              setOpenDropdown(false);
              setIsElipsisMenuOpen((prev) => !prev);
            }}
            className="btn-outline"
          >
            <img src={elipsis} alt="elipsis" className="cursor-pointer h-5" />
          </button>
          {
            // <ElipsisMenu type="Boards" />
            isElipsisMenuOpen && (
              <ElipsisMenu
                type="Boards"
                setOpenEditModal={setOpenEditModal}
                setOpenDeleteModal={setOpenDeleteModal}
              />
            )
          }
        </div>

        {/*Dropdown*/}
        {openDropdown && (
          <HeaderDropdown
            setOpenDropdown={setOpenDropdown}
            setBoardModalOpen={setBoardModalOpen}
          />
        )}
      </header>

      {boardModalOpen && (
        <AddEditBoardModal setBoardModalOpen={setBoardModalOpen} type="add" />
      )}
      {openAddEditTask && (
        <AddEditTaskModel
          setOpenAddEditTask={setOpenAddEditTask}
          device="mobile"
          type="add"
        />
      )}
      {
        // <DeleteModal
        isDeleteModalOpen && (
          <DeleteModal
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            type="board"
            title={board.name}
            onDeleteBtnClick={onDeleteBtnClick}
          />
        )
      }
    </div>
  );
};
