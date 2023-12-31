import React, { useState } from "react";
import "./index.css"; // Assuming you have a custom CSS file for additional styles
import { BsArrowLeft, BsArrowRight, BsTrash } from "react-icons/bs"; // Import Bootstrap icons

export default function KanbanBoard(props) {
  const [newTaskName, setNewTaskName] = useState("");
  const [tasks, setTasks] = useState([
    { name: "1", stage: 0 },
    { name: "2", stage: 0 },
  ]);
  const stagesNames = ["Backlog", "To Do", "Ongoing", "Done"];

  const stagesTasks = [];
  for (let i = 0; i < stagesNames.length; ++i) {
    stagesTasks.push([]);
  }
  for (let task of tasks) {
    const stageId = task.stage;
    stagesTasks[stageId].push(task);
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <section className="layout-row align-items-center justify-content-center">
            <input
              id="create-task-input"
              type="text"
              className="form-control"
              placeholder="New task name"
              data-testid="create-task-input"
            />
            <button
              type="submit"
              className="btn btn-primary ml-2"
              data-testid="create-task-button"
            >
              Create task
            </button>
          </section>
        </div>

        <div className="col-md-6">
          {/* Additional content for the right column can be added here */}
        </div>
      </div>

      <div className="row mt-3">
        {stagesTasks.map((tasks, i) => {
          return (
            <div className="col-md-3" key={i}>
              <div className="card mb-3">
                <div className="card-body">
                  <h4 className="card-title">{stagesNames[i]}</h4>
                  <ul className="list-unstyled" data-testid={`stage-${i}`}>
                    {tasks.map((task, taskIndex) => {
                      return (
                        <li
                          className="d-flex justify-content-between align-items-center"
                          key={taskIndex}
                        >
                          <span
                            data-testid={`${task.name
                              .split(" ")
                              .join("-")}-name`}
                          >
                            {task.name}
                          </span>
                          <div className="btn-group">
                            <button
                              className="btn btn-secondary btn-sm"
                              data-testid={`${task.name
                                .split(" ")
                                .join("-")}-back`}
                            >
                              <BsArrowLeft /> {/* Back Icon */}
                            </button>
                            <button
                              className="btn btn-secondary btn-sm"
                              data-testid={`${task.name
                                .split(" ")
                                .join("-")}-forward`}
                            >
                              <BsArrowRight /> {/* Forward Icon */}
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              data-testid={`${task.name
                                .split(" ")
                                .join("-")}-delete`}
                            >
                              <BsTrash /> {/* Delete Icon */}
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
