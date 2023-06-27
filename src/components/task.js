import React, { useEffect, useState } from "react";
import "../assets/styles/workspace.css";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon, Cross1Icon, PlusIcon } from "@radix-ui/react-icons";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/firebase";
import AlertDialogDemo from "./alert";
import ModalInput from "./modal-input";

function Rectangle() {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [deletingTaskId, setDeletingTaskId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTitle, setEditingTitle] = useState("");

  const getTasks = async () => {
    const userId = localStorage.getItem("uid");
    const workspaceId = localStorage.getItem("WorkspaceId");
    const tasksData = await fetchTasks(userId, workspaceId);
    console.log("Tasks Data: ", tasksData);
    setTasks(tasksData);
  };

  const handleCreateModalOpen = () => {
    setShowCreateModal(true);
  };

  const handleCreateModalClose = () => {
    setShowCreateModal(false);
    setNewTaskTitle("");
  };

  const handleEditModalOpen = (taskId, taskTitle) => {
    setEditingTaskId(taskId);
    setEditingTitle(taskTitle);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setEditingTaskId(null);
    setEditingTitle("");
    setShowEditModal(false);
  };

  const handleCreateTask = async (taskTitle) => {
    if (taskTitle.trim() !== "") {
      const newTask = {
        title: taskTitle,
        completed: false,
      };
      const userId = localStorage.getItem("uid");
      const workspaceId = localStorage.getItem("WorkspaceId");
      const taskId = await createTask(userId, workspaceId, newTask);
      const updatedTasks = [...tasks, { id: taskId, ...newTask }];
      setTasks(updatedTasks);
      setShowCreateModal(false);
    }
  };

  const handleTaskCompletion = async (taskId, completed) => {
    const userId = localStorage.getItem("uid");
    const workspaceId = localStorage.getItem("WorkspaceId");
    await updateTask(userId, workspaceId, taskId, { completed });
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed };
      }
      return task;
    });
    setTasks(updatedTasks);
    await getTasks();
  };

  const handleDeleteAlertOpen = (taskId) => {
    setDeletingTaskId(taskId);
    setShowDeleteAlert(true);
  };

  const handleDeleteAlertClose = () => {
    setDeletingTaskId(null);
    setShowDeleteAlert(false);
  };

  const handleDeleteTask = async () => {
    if (deletingTaskId) {
      const userId = localStorage.getItem("uid");
      const workspaceId = localStorage.getItem("WorkspaceId");
      await deleteTask(userId, workspaceId, deletingTaskId);
      const updatedTasks = tasks.filter((task) => task.id !== deletingTaskId);
      setTasks(updatedTasks);
      setDeletingTaskId(null);
      setShowDeleteAlert(false);
    }
  };

  const handleEditTask = async (taskId, taskTitle) => {
    if (taskTitle.trim() !== "") {
      const userId = localStorage.getItem("uid");
      const workspaceId = localStorage.getItem("WorkspaceId");
      await updateTask(userId, workspaceId, taskId, { title: taskTitle });
      const updatedTasks = tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, title: taskTitle };
        }
        return task;
      });
      setTasks(updatedTasks);
      handleEditModalClose();
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="task-rectangle rectangle">
      <div className="rectangle-title d-flex align-items-center">
        <h3>Tasks</h3>
        <button onClick={handleCreateModalOpen} className="create-icon">
          <PlusIcon style={{ width: "25px", height: "25px" }} />
        </button>
      </div>
      <div className="tasks">
        {tasks.map((task) => (
          <div
            className="check-task rectangle-item"
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
            key={task.id}
          >
            <Checkbox.Root
              className="CheckboxRoot"
              checked={task.completed}
              onCheckedChange={(isChecked) =>
                handleTaskCompletion(task.id, isChecked)
              }
              id={`checkbox-${task.id}`}
            >
              <Checkbox.Indicator
                style={{
                  backgroundColor: task.completed ? "#3a4d51" : "white",
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
                className="CheckboxIndicator"
              >
                <CheckIcon
                  style={{ color: "white", width: "100%", height: "100%" }}
                />
              </Checkbox.Indicator>
            </Checkbox.Root>
            {editingTaskId === task.id ? (
              <div>
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                />
              </div>
            ) : (
              <label
                className="Label"
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  opacity: task.completed ? "0.5" : "1",
                }}
                onClick={() => handleEditModalOpen(task.id, task.title)}
              >
                {task.title}
              </label>
            )}
            {editingTaskId !== task.id && (
              <button
                onClick={() => handleDeleteAlertOpen(task.id)}
                className="delete-icon"
              >
                <Cross1Icon style={{ width: "25px", height: "25px" }} />
              </button>
            )}
          </div>
        ))}
      </div>
      {showCreateModal && (
        <ModalInput
          title="New Task"
          description="Enter the new task title:"
          confirmText="Create"
          onClose={handleCreateModalClose}
          onConfirm={handleCreateTask}
          open={showCreateModal}
        />
      )}
      {showEditModal && (
        <ModalInput
          title="Edit Task"
          description="Enter the updated task title:"
          confirmText="Save"
          onClose={handleEditModalClose}
          onConfirm={(taskTitle) => handleEditTask(editingTaskId, taskTitle)}
          open={showEditModal}
        />
      )}
      {showDeleteAlert && (
        <AlertDialogDemo
          title="Delete Task"
          description="Are you sure you want to delete this task?"
          confirmText="Delete"
          onCancel={handleDeleteAlertClose}
          onConfirm={handleDeleteTask}
          open={showDeleteAlert}
        />
      )}
    </div>
  );
}

export default Rectangle;
