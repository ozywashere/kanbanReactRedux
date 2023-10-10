import React, { useState } from "react";
import { Header } from "./components/Header.jsx";
import { Center } from "./components/Center.jsx";
import boardsSlice from "./redux/boardSlice.js";
import { useDispatch, useSelector } from "react-redux";
import EmptyBoard from "./components/EmptyBoard.jsx";
function App() {
  const [boardModalOpen, setBoardModalOpen] = useState(false);
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((board) => board.isActive);
  if (!activeBoard && boards.length > 0)
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
  return (
    <>
      <div className="overflow-hidden overflow-x-scroll">
        {/*Header*/}
        {boards.length > 0 ? (
          <>
            <Header
              boardModalOpen={boardModalOpen}
              setBoardModalOpen={setBoardModalOpen}
            />
            <Center
              setBoardModalOpen={setBoardModalOpen}
              boardModalOpen={boardModalOpen}
            />
          </>
        ) : (
          <>
            <EmptyBoard type="add" />
          </>
        )}
      </div>
    </>
  );
}

export default App;
