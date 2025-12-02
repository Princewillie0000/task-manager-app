import { useState } from "react";
import { Modal, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { updateTask } from "../features/task/taskSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const { TextArea } = Input;

const EditTask = (props) => {
  const dispatch = useDispatch();

  const [updateTaskContent, setUpdateTaskContent] = useState(
    props.task_content
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setUpdateTaskContent(props.task_content);
  }, [props.task_content]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    if (updateTaskContent.trim() === "") {
      return;
    }
    dispatch(
      updateTask({
        task_id: props.task_id,
        update_task_content: updateTaskContent.trim(),
      })
    );

    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <button onClick={showModal}>
        <EditOutlined style={{ color: "blue", fontSize: "1.5rem" }} />
      </button>

      <Modal
        title="Edit task content"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h2>Editing task with id: {props.task_id}</h2>
        <TextArea
          value={updateTaskContent}
          onChange={(e) => setUpdateTaskContent(e.target.value)}
          placeholder="Starting typing..."
          autoSize={{
            minRows: 4,
            maxRows: 6,
          }}
        />
      </Modal>
    </>
  );
};
export default EditTask;
