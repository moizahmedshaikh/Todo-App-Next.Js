"use client";

import { useEffect, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";

interface Task {
  task: string;
  desc: string;
  completed: boolean;
}

export default function Home() {
  const [task, setTask] = useState("");
  const [desc, setDesc] = useState("");
  const [maintask, setMaintask] = useState<Task[]>([]);
  const [showModel, setShowModel] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (task && desc) {
      setMaintask([...maintask, { task, desc, completed: false }]);
      setTask("");
      setDesc("");
      setShowModel(false);
      setNotification("Task added successfully!");
      setTimeout(() => setNotification(null), 1500);
    }
  };

  const deleteHandler = (i: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmDelete) {
      const copyTask = [...maintask];
      copyTask.splice(i, 1);
      setMaintask(copyTask);
      setNotification("Task Deleted successfully!");
      setTimeout(() => setNotification(null), 1500);
    }
  };

  const toggleCompletion = (i: number) => {
    const updateTask = [...maintask];
    updateTask[i].completed = !updateTask[i].completed;
    setMaintask(updateTask);
    setNotification(
      updateTask[i].completed
        ? "Task marked as completed!"
        : "Task marked as incomplete!"
    );
    setTimeout(() => setNotification(null), 1500);
  };

  useEffect(() => {
    document.title = `Tasks (${maintask.length}) - Todo App`;
  }, [maintask]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowModel(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);


  return (
    <div>
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 text-white px-4 py-2 rounded-lg ${
            notification.includes("deleted") || notification.includes("error")
              ? "bg-red-600"
              : notification.includes("success")
              ? "bg-green-600"
              : "bg-yellow-500"
          }`}
          role="alert"
        >
          {notification}
        </div>
      )}

      <div className="flex items-center justify-center">
        <h1 className="px-4 py-2 bg-black text-white sm:text-[2.5rem] text-[1.5rem] font-[800] mt-4 rounded-xl">
          Moiz Ahmed Todo App
        </h1>
      </div>

      <div className="flex justify-center sm:mt-4 mt-12">
        <button
          onClick={() => {
            setShowModel(true);
          }}
          className="py-2 px-6 rounded-lg bg-[#009688]  hover:bg-[#00796B] text-white font-[500]"
        >
          Add new Task
        </button>
      </div>

      {showModel && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/60 z-50">
          <div className=" bg-[#0F172A] text-center p-5 rounded-lg shadow-xl text-white md:w-[70%] lg:w-[40%] w-[90%] m-auto">
            <h1 className="font-bold text-[2rem] mb-4">Add new task</h1>
            <form onSubmit={submitHandler}>
              <input
                type="text"
                value={task}
                required
                placeholder="Task Name"
                onChange={(e) => {
                  setTask(e.target.value);
                }}
                className="border-[1px] bg-[#384152] text-gray-100  border-black w-full p-3 rounded-lg mb-3"
              />
              <input
                type="text"
                value={desc}
                required
                placeholder="Task Description"
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
                className="border-[1px] bg-[#384152] text-gray-100  border-black w-full p-3 rounded-lg mb-3"
              />{" "}
              <div className="flex justify-between px-2 mt-5">
                <button
                  onClick={() => {
                    setShowModel(false);
                  }}
                  className="py-2 px-5 sm:text-lg rounded-lg bg-[#F44336] hover:bg-[#D32F2F] text-white"
                >
                  Cancle
                </button>
                <button
                  type="submit"
                  className="py-2 px-5 sm:text-lg rounded-lg bg-[#3B80F5] hover:bg-[#0056b3] text-white "
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className=" mt-10">
        {maintask.length > 0 ? (
          maintask.map((t, i) => {
            return (
              <div
                key={i}
                className={`bg-[#0F172A] sm:w-[80%] w-[80%] py-3 px-6 items-center  rounded-xl mx-auto sm:flex justify-between  my-5 text-white ${
                  t.completed ? "opacity-[0.5]" : ""
                }`}
              >
                {/* Mark Button */}
                <button
                  onClick={() => {
                    toggleCompletion(i);
                  }}
                  className={` ${
                    t.completed
                      ? "bg-[#4CAF50] hover:bg-[#388E3C] text-white"
                      : "bg-[#2196F3] hover:bg-[#1976D2] text-white"
                  } text-white px-3 py-2 rounded-lg text-bold sm:block hidden`}
                >
                  {t.completed ? (
                    "Completed"
                  ) : (
                    <AiOutlineCheck className="text-[1.4rem] " />
                  )}
                </button>

                <div className="flex flex-col items-center gap-3 justify-between m-auto w-[70%] sm:w-[50%]">
                  <h1 className="text-[2rem] font-bold">{t.task}</h1>
                  <p className="line-clamp-2">{t.desc}</p>
                </div>

                {/* Delete & Mark Button */}

                <div className="flex justify-between mt-5">
                  <button
                    onClick={() => {
                      deleteHandler(i);
                    }}
                    className={`bg-[#F44336] hover:bg-[#D32F2F] text-white px-3 py-2 rounded-lg text-bold `}
                  >
                    <FaTrashAlt className="text-[1.4rem] " />
                  </button>

                  <button
                    onClick={() => {
                      toggleCompletion(i);
                    }}
                    className={` ${
                      t.completed
                        ? "bg-[#4CAF50] hover:bg-[#388E3C] text-white"
                        : "bg-[#2196F3] hover:bg-[#1976D2] text-white"
                    } text-white px-3 py-2 rounded-lg text-bold sm:hidden block`}
                  >
                    {t.completed ? (
                      "Completed"
                    ) : (
                      <AiOutlineCheck className="text-[1.4rem] " />
                    )}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex justify-center">
            <span className="mx-auto bg-[#0F172A] px-6 py-3 rounded-lg font-semibold text-white text-xl">
              No Task Available
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
