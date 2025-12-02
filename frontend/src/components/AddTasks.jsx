import React from "react";
import { useDispatch } from "react-redux";
import { addNewTask } from "../features/task/taskSlice";
import { Input, Button, Divider, message } from "antd";
import axios from "axios";
import { serverUrl } from "../utils/helper";

const AddTasks = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const info = () => {
    messageApi.info("Task created successfully!");
  };

  const [taskText, setTaskText] = React.useState("");
  const dispatch = useDispatch();

  async function handleAddTask() {
    // check to see if the task field is empty
    if (taskText.trim() === "") {
      return;
    }

    // using dispatch to call the addNewTask function because the function is coming for the redux store.
    dispatch(addNewTask(taskText));
    setTaskText("");
    try {
      const response = await axios.post(`${serverUrl}/task/addTask`, {
        task_content: taskText,
      });
      dispatch(addNewTask(response.data));
      if (response.data.status === "success") {
        info();
      }
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="p-20 grid bg-white gap-2">
      {contextHolder}
      <Input
        value={taskText}
        onChange={(event) => setTaskText(event.target.value)}
        placeholder="Enter task title"
        size="large"
      />
      <Button onClick={handleAddTask} type="primary" size="large" block>
        Create Task
      </Button>

      <Divider style={{ backgroundColor: "white", padding: "2rem" }} />
    </div>
  );
};

export default AddTasks;
