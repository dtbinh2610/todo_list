import { useState, useEffect, useRef } from "react";
import "tailwindcss";
import "./content.css";
import { useOutletContext } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function CompletedTask({ BASE_URL }) {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [tasks, setTasks] = useState([]);
  const {
 
    handleSideBar,
    handleDetailBar,
    openSidebar,
    openDetailbar,
    id,
    refresh,
  } = useOutletContext();
  const inputRef = useRef(null);

  useEffect(() => {
    if (!user) return;

    fetch(`${BASE_URL}/api/Task/GetTaskIscomplete?userid=${user.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Lỗi khi khi tải dữ liệu");
        }
        return response.json();
      })
      .then((result) => {
        console.log("aloasd:", result);
        setTasks(result)      
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
  }, [refresh]);

  const handleImportantClick = (id, isImportant) => {
    fetch(
      `${BASE_URL}/api/Task/UpdateStatusImportant?id=${id}&StatusImportant=${!isImportant}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Lỗi khi cập nhật trạng thái quan trọng");
        }
        return response.json();
      })
      .then((result) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? { ...task, isImportant: !isImportant } : task
          )
        );
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
  };

  const handleCompleteClick = (id, isCompleted) => {
    fetch(
      `${BASE_URL}/api/Task/UpdateStatusComplete?id=${id}&StatusComplete=${!isCompleted}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Lỗi khi cập nhật trạng thái quan trọng");
        }

        return response.json();
      })
      .then((result) => {
        console.log(result);
        
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? { ...task, isCompleted: !isCompleted } : task
          )
        );
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
  };
  const notify = () => {
    toast.warn("Add tittle !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const handleAddClick = () => {
    
    if (inputRef.current.value == "") {
      return notify();
    }
    const data = {
      title: inputRef.current.value,
      description: "",
      userId: user.id,
      isCompleted: false,
      isImportant: true,
      isMyDay: false,
    };
    fetch(`${BASE_URL}/api/Task/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Lỗi khi up dữ liệu");
        }
        return response.json();
      })
      .then((result) => {
        const newTask = result;

        // Thêm trực tiếp vào state
        setTasks((prevTasks) => [...prevTasks, newTask]);
        inputRef.current.value = "";
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <HeaderBody handleSideBar={handleSideBar} openSidebar={openSidebar} />
      <div className="content-container">
        <div className="taskCreation-container">
          <div className="taskCreation">
            <button className="addTask" onClick={() => handleAddClick()}>
              <svg
                className="fluentIcon ___12fm75w f1w7gpdv fez10in fg4l7m0"
                aria-label=""
                fill="currentColor"
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 2.5a.5.5 0 00-1 0V9H2.5a.5.5 0 000 1H9v6.5a.5.5 0 001 0V10h6.5a.5.5 0 000-1H10V2.5z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
            <input
              ref={inputRef}
              id="addTask"
              className="addInput"
              type="text"
              placeholder="Add text"
            
            />
          </div>
          <div className="taskCreation-detail">
            <div className="dateButton-container">
              <button className="dateButton">
                <svg
                  className="fluentIcon dateButton-icon ___12fm75w f1w7gpdv fez10in fg4l7m0"
                  aria-label=""
                  fill="currentColor"
                  aria-hidden="true"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 11a1 1 0 100-2 1 1 0 000 2zm1 2a1 1 0 11-2 0 1 1 0 012 0zm2-2a1 1 0 100-2 1 1 0 000 2zm1 2a1 1 0 11-2 0 1 1 0 012 0zm2-2a1 1 0 100-2 1 1 0 000 2zm4-5.5A2.5 2.5 0 0014.5 3h-9A2.5 2.5 0 003 5.5v9A2.5 2.5 0 005.5 17h9a2.5 2.5 0 002.5-2.5v-9zM4 7h12v7.5c0 .83-.67 1.5-1.5 1.5h-9A1.5 1.5 0 014 14.5V7zm1.5-3h9c.83 0 1.5.67 1.5 1.5V6H4v-.5C4 4.67 4.67 4 5.5 4z"
                    fill="currentColor"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="task ">
          <div className=" chunkedComponentList">
            <div className=" chunkedScrollContainer">
              {/*scroll*/}
              <div className="componentList">
                {tasks.length === 0 ? (
                  <p>Không có task nào trong ngày hôm nay</p>
                ) : (
                  tasks
                    .filter(
                      (task) =>
                        task.isCompleted == true 
                    )
                    .map((task) => (
                      <div key={task.id} className="taskItem-container">
                        <div className="taskItem-body">
                          <button
                            className="checkbox"
                            onClick={() =>
                              handleCompleteClick(task.id, task.isCompleted)
                            }
                          >
                            {/*eventListener*/}
                            <svg
                              className={`fluentIcon icon-default ${
                                task.isCompleted ? "hidden" : ""
                              }`}
                              aria-label=""
                              fill="currentColor"
                              aria-hidden="true"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                              focusable="false"
                            >
                              <path
                                d="M10 3a7 7 0 100 14 7 7 0 000-14zm-8 7a8 8 0 1116 0 8 8 0 01-16 0z"
                                fill="currentColor"
                              ></path>
                            </svg>
                            <svg
                              className={`fluentIcon icon-hover ${
                                task.isCompleted ? "" : "hidden"
                              }`}
                              aria-label=""
                              fill="currentColor"
                              aria-hidden="true"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                              focusable="false"
                            >
                              <path
                                d="M10 2a8 8 0 110 16 8 8 0 010-16zm0 1a7 7 0 100 14 7 7 0 000-14zm3.36 4.65c.17.17.2.44.06.63l-.06.07-4 4a.5.5 0 01-.64.07l-.07-.06-2-2a.5.5 0 01.63-.77l.07.06L9 11.3l3.65-3.65c.2-.2.51-.2.7 0z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </button>
                          <button
                            className="taskItem-titleWrapper"
                            onClick={() =>
                              handleDetailBar(!openDetailbar, task)
                            }
                          >
                            <span className="taskItem-title">{task.title}</span>
                          </button>
                          <div className="importantBtn-container">
                            <button
                              className="btn-important"
                              onClick={() =>
                                handleImportantClick(task.id, task.isImportant)
                              }
                            >
                              {/* Icon mặc định */}
                              <svg
                                className={`fluentIcon icon-default importantSvg1 ${
                                  task.isImportant ? "hidden" : ""
                                }`}
                              >
                                <path
                                  d="M9.1 2.9a1 1 0 011.8 0l1.93 3.91 4.31.63a1 1 0 01.56 1.7l-3.12 3.05.73 4.3a1 1 0 01-1.45 1.05L10 15.51l-3.86 2.03a1 1 0 01-1.45-1.05l.74-4.3L2.3 9.14a1 1 0 01.56-1.7l4.31-.63L9.1 2.9zm.9.44L8.07 7.25a1 1 0 01-.75.55L3 8.43l3.12 3.04a1 1 0 01.3.89l-.75 4.3 3.87-2.03a1 1 0 01.93 0l3.86 2.03-.74-4.3a1 1 0 01.29-.89L17 8.43l-4.32-.63a1 1 0 01-.75-.55L10 3.35z"
                                  fill="currentColor"
                                ></path>
                              </svg>

                              {/* Icon hover, sẽ giữ nguyên khi đã nhấn */}
                              <svg
                                className={`fluentIcon icon-hover importantSvg2 ${
                                  task.isImportant ? "" : "hidden"
                                }`}
                              >
                                <path
                                  d="M9.1 2.9a1 1 0 011.8 0l1.93 3.91 4.31.63a1 1 0 01.56 1.7l-3.12 3.05.73 4.3a1 1 0 01-1.45 1.05L10 15.51l-3.86 2.03a1 1 0 01-1.45-1.05l.74-4.3L2.3 9.14a1 1 0 01.56-1.7l4.31-.63L9.1 2.9z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
// function HeaderBody({ setOpenSidebar }) {
function HeaderBody({ handleSideBar, openSidebar }) {
  return (
    <>
      <div className="header-body">
        <div className="toolbar-headline">
          <div className="toolbar-container">
            <button
              className="btn-sidebar"
              onClick={() => handleSideBar(!openSidebar)}
            >
              <svg
                className="fluentIcon"
                aria-label=""
                fill="currentColor"
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 4.5c0-.28.22-.5.5-.5h15a.5.5 0 010 1h-15a.5.5 0 01-.5-.5zm0 5c0-.28.22-.5.5-.5h15a.5.5 0 010 1h-15a.5.5 0 01-.5-.5zm.5 4.5a.5.5 0 000 1h15a.5.5 0 000-1h-15z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>

            <div className="toolbar-title">
              <h2 className="list-title">
                <span>Completed</span> 
              </h2>
            </div>
          </div>

          <div className="toolbarSort-btn ">
            <svg
              class="fluentIcon ___12fm75w f1w7gpdv fez10in fg4l7m0"
              aria-label=""
              fill="currentColor"
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.35 7.35L5 4.71V16.5a.5.5 0 001 0V4.7l2.65 2.65a.5.5 0 00.7-.7l-3.49-3.5A.5.5 0 005.5 3a.5.5 0 00-.39.18L1.65 6.65a.5.5 0 10.7.7zm15.3 5.3L15 15.29V3.5a.5.5 0 00-1 0v11.8l-2.65-2.65a.5.5 0 00-.7.7l3.49 3.5a.5.5 0 00.36.15.5.5 0 00.39-.18l3.46-3.47a.5.5 0 10-.7-.7z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
