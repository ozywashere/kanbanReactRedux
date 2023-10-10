export const DeleteModal = ({
  title,
  type,
  setIsDeleteModalOpen,
  onDeleteBtnClick,
}) => {
  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsDeleteModalOpen(false);
      }}
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center"
    >
      {/*deleteModal*/}
      <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl">
        <h3 className="text-xl font-bold mb-4 text-red-500">
          Delete this{type}
        </h3>
        {type === "task" ? (
          <p className="text-gray-500 font-semibold tracking-wide text-xs pt-6">
            Are you sure you want to delete the "{title}" task and its subtasks?
            This action cannot be reversed.
          </p>
        ) : (
          <p className="text-gray-500 font-semibold tracking-wide text-xs pt-6">
            Are you sure you want to delete the "{title}" board? This action
            will remove all columns and tasks and cannot be reversed.
          </p>
        )}
        <div className="flex w-full mt-4 items-center justify-center space-x-4">
          <button
            className="w-full items-center text-white hover:opacity-75 bg-red-500 py-2 rounded-full"
            onClick={onDeleteBtnClick}
          >
            Delete
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="w-full items-center text-[#635fc7] dark:bg-white hover:opacity-75 bg-[#635fc71a]  py-2 rounded-full"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
