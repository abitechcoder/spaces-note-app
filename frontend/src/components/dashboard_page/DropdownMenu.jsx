import React, { Fragment, useEffect, useContext } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FiStar, FiArchive } from "react-icons/fi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { PiDotsThreeCircleLight } from "react-icons/pi";
import { deleter } from "../../util/fetcher";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { useSelector } from "react-redux";
import { DashboardContext } from "../../context/DashboardContextProvider";

function DropdownMenu({ noteId }) {
  const { user } = useSelector((state) => state.auth);
  const {setActiveNote} = useContext(DashboardContext);
  const icons = [
    { icon: <FiStar className="mr-4 h-5 w-5" />, label: "Add to favorites" },
    { icon: <FiArchive className="mr-4 h-5 w-5" />, label: "Archive" },
    { icon: <RiDeleteBin7Line className="mr-4 h-5 w-5" />, label: "Delete" },
  ];

  const addToFavorite = (noteId) => {
    alert(`Note ${noteId} will be added to favorite`);
  };

  const archiveNote = (noteId) => {
    alert(`Note ${noteId} will be archived`);
  };

  const deleteNote = async (noteId) => {
    try {
      const response = await deleter(`/note/${noteId}`);
      toast.success(response?.message);
      mutate(`/note/user/${user?.userAccount._id}`);
      setActiveNote(null);
    } catch (error) {
      toast.error("Error occured while deleting note");
    }
  };

  const handleClick = (index) => {
    if (index === 2) {
      deleteNote(noteId);
    } else if (index === 1) {
      archiveNote(noteId);
    } else {
      addToFavorite(noteId);
    }
  };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button>
        <PiDotsThreeCircleLight className="w-8 h-8 text-white/60" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-60 origin-top-right divide-y divide-gray-100 rounded-md bg-white/40 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-4 grid">
            {icons.map((icon, index) => (
              <Menu.Item key={index}>
                <button
                  onClick={() => handleClick(index)}
                  className={`${
                    icons.length - 1 === index
                      ? "ui-active:bg-red-700 mt-4 border-t-2"
                      : "ui-active:bg-violet-500"
                  } ui-active:text-white font-bold ui-not-active:text-white group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {icon?.icon}
                  {icon?.label}
                </button>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default DropdownMenu;
