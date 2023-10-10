import { useSelector } from "react-redux";
import boardIcon from "../assets/icon-board.svg";
import { useState } from "react";
import lightIcon from "../assets/icon-light-theme.svg";
import darkIcon from "../assets/icon-dark-theme.svg";
import { Switch } from "@headlessui/react";
import useDarkMode from "../hooks/useDarkMode.js";
import { useDispatch } from "react-redux";
export const HeaderDropdown = ({ setOpenDropdown, setBoardModalOpen }) => {
  const dispatch = useDispatch();
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );
  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  const boards = useSelector((state) => state.boards);

  return (
    <div
      className="py-10 px-6 left-0 right-0  absolute bottom-[-100vh] top-16 bg-[#00000080]"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenDropdown(false);
      }}
    >
      {/*  DropDown Modal*/}
      <div className="bg-white dark:bg-[#2b2c37] rounded-xl shadow-md shadow-[#364e7e1a] py-4">
        <h3 className="dark:text-gray-300 text-600 font-semibold mx-4 mb-8">
          All Boards ({boards?.length})
        </h3>
        <div>
          {boards.map((board, index) => (
            <div
              key={index}
              className={`flex items-center space-x-2 px-5 py-4 ${
                board.isActive && "bg-[#635fc7] rounded-r-full text-white mr-8"
              }`}
              onClick={() => {
                dispatch(boardsSlice.actions.setBoardActive({ index }));
              }}
            >
              <img src={boardIcon} alt="board icon" className="h-4" />
              <p className="text-lg font-bold dark:text-white">{board.name}</p>
            </div>
          ))}
          <div
            className="flex items-center space-x-2 text-[#635fc7] px-5 py-4 cursor-pointer"
            onClick={() => {
              setBoardModalOpen(true);
              setOpenDropdown(false);
            }}
          >
            <img src={boardIcon} className="h-4" alt="boardIcon" />
            <p className="text-lg font-bold">Create New Board</p>
          </div>
          <div className="mx-2 p-4 space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg">
            <img src={lightIcon} alt="lightIcon" />
            {/*  Switch*/}
            <Switch
              checked={darkSide}
              onChange={toggleDarkMode}
              className={`${
                darkSide ? "bg-[#635fc7]" : "bg-gray-200"
              } relative inline-flex items-center h-6 rounded-full w-11`}
            >
              <span
                className={`${
                  darkSide ? "translate-x-6" : "translate-x-1"
                } inline-block w-4 h-4 transform bg-white rounded-full transition ease-in-out duration-200`}
              ></span>
            </Switch>

            <img src={darkIcon} alt="darkIcon" />
          </div>
        </div>
      </div>
    </div>
  );
};
