import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import {
  addNewTask,
  deleteTask,
  setUserTasks,
} from "../features/task/taskSlice";
import EditTask from "./EditTask";
import { serverUrl } from "../utils/helper";
import axios from "axios";
import { useState, useEffect } from "react";

const DisplayUserTasks = () => {
  // const [taskContents, setTaskContents] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const userTasks = useSelector((state) => state.task.userTasks);
  console.log("Component is rendering. Current tasks:", userTasks);

  // const userTasks = taskContent?.data?.task_content;
  console.log("Redux userTasks :", userTasks);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${serverUrl}/task/allTask`);

      // store tasks array in redux store
      dispatch(
        setUserTasks(
          response.data.allTasks.map((t) => {
            return {
              ...t,
              task_id: t.task_id || t._id,
            };
          })
        )
      );

      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    // Fetch tasks when the component mounts
    console.log("Fetching tasks from backend...");

    fetchTasks();
    // Cleanup function to avoid memory leaks
    return () => {
      // Any cleanup logic if needed
    };
  }, []);

  if (loading) {
    return (
      <p className="text-white font-extrabold text-5xl">Loading tasks...</p>
    );
  }
  if (!userTasks || userTasks.length === 0) {
    return (
      <p className="text-white font-extrabold text-5xl">No tasks available</p>
    );
  }
  return (
    <div className="bg-red-200 p-20 rounded-lg shadow-lg pt-50">
      {userTasks.map((item) => {
        return (
          <div
            key={item.task_id || item._id}
            className="border-b py-3 flex justify-between"
          >
            <div>
              <li className="font-medium tracking-wide ">
                {item.task_content}
              </li>
              <li className="text-gray-500 font-light text-sm mt-2">
                {item.task_createdAt}
              </li>
              <li className="font-medium tracking-wide ">{item.taskStatus}</li>
            </div>

            <div>
              <select name="" id="">
                <option value="">Ongoing</option>
                <option value="">Completed</option>
              </select>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  dispatch(deleteTask(item.task_id));
                  console.log("Deleting:", item.task_id);
                }}
              >
                <DeleteOutlined style={{ color: "red", fontSize: "1.5rem" }} />
              </button>

              <EditTask
                taskId={item.task_id}
                task_content={item.task_content}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayUserTasks;
