import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

export default function App(props) {
  const [tasks, setTasks] = useState([
    { name: "1", stage: 0 },
    { name: "2", stage: 0 },
  ]);

  const [stagesNames, setStagesNames] = useState([
    "Backlog",
    "To Do",
    "Ongoing",
    "Done",
  ]);
  const [newTaskName, setNewTaskName] = useState("");

  const stagesTasks = [];
  for (let i = 0; i < stagesNames.length; ++i) {
    stagesTasks.push([]);
  }
  for (let task of tasks) {
    const stageId = task.stage;
    stagesTasks[stageId].push(task);
  }

  function createTask() {
    if (newTaskName.trim() !== "") {
      const newTask = { name: newTaskName, stage: 0 }; // Adding to the Backlog (stage 0)
      setTasks([...tasks, newTask]);
      setNewTaskName(""); // Clearing the input field
    }
  }

  function moveTask(task, direction) {
    const updatedTasks = [...tasks];
    const taskIndex = updatedTasks.indexOf(task); // Find the index of the task
    const currentStage = updatedTasks[taskIndex].stage;
    if (direction === "back" && currentStage > 0) {
      updatedTasks[taskIndex].stage--;
    } else if (
      direction === "forward" &&
      currentStage < stagesNames.length - 1
    ) {
      updatedTasks[taskIndex].stage++;
    }
    setTasks(updatedTasks);
  }

  function deleteTask(task) {
    const updatedTasks = tasks.filter((t) => t !== task);
    setTasks(updatedTasks);
  }

  return (
    <div className="container">
      <div className="mt-20 layout-column justify-content-center align-items-center">
        <section className="mt-50 layout-row align-items-center justify-content-center">
          <input
            id="create-task-input"
            type="text"
            className="large"
            placeholder="New task name"
            data-testid="create-task-input"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
          />
          <button
            type="submit"
            onClick={createTask}
            className="ml-30"
            data-testid="create-task-button"
          >
            Create task
          </button>
        </section>

        <div className="mt-50 layout-row">
          {stagesTasks.map((tasks, i) => {
            return (
              <div className="card outlined ml-20 mt-0" key={i}>
                <div className="card-text">
                  <h4>{stagesNames[i]}</h4>
                  <ul className="styled mt-50" data-testid={`stage-${i}`}>
                    {tasks.map((task, taskIndex) => {
                      return (
                        <li className="slide-up-fade-in" key={taskIndex}>
                          <div className="li-content layout-row justify-content-between align-items-center">
                            <span
                              data-testid={`${task.name
                                .split(" ")
                                .join("-")}-name`}
                            >
                              {task.name}
                            </span>
                            <div className="icons">
                              <button
                                className="icon-only x-small mx-2"
                                data-testid={`${task.name
                                  .split(" ")
                                  .join("-")}-back`}
                                onClick={() => moveTask(task, "back")}
                                disabled={task.stage === 0}
                              >
                                <i className="material-icons">arrow_back</i>
                              </button>
                              <button
                                className="icon-only x-small mx-2"
                                data-testid={`${task.name
                                  .split(" ")
                                  .join("-")}-forward`}
                                onClick={() => moveTask(task, "forward")}
                                disabled={task.stage === stagesNames.length - 1}
                              >
                                <i className="material-icons">arrow_forward</i>
                              </button>
                              <button
                                className="icon-only danger x-small mx-2"
                                data-testid={`${task.name
                                  .split(" ")
                                  .join("-")}-delete`}
                                onClick={() => deleteTask(task)}
                              >
                                <i className="material-icons">delete</i>
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
