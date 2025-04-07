import { useState } from "react";
import "./body.css";
import { ToastContainer, toast } from "react-toastify";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Link,
} from "react-router-dom";

export default function Body() {
  const [openSidebar, setOpenSidebar] = useState(true);
  const [openDetailbar, setOpenDetailbar] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [task, setTask] = useState(null);
  const [id, setId] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const handleSideBar = (a) => {
    setOpenSidebar(a);
  };
  const handleDetailBar = (status, taskInfo) => {
    setOpenDetailbar(status);
    setTask(taskInfo);
  };

  return (
    <>
      <div
        className={`main ${openSidebar ? "shifted" : ""} ${
          openDetailbar ? "shifted-right" : ""
        }`}
      >
        <Outlet
          context={{
            handleSideBar,
            handleDetailBar,
            openSidebar,
            openDetailbar,
            id,
            refresh,
          }}
        />
      </div>
      {openSidebar && <SideBar setOpenSidebar={setOpenSidebar} />}
      {openDetailbar && (
        <DetailsBar
          setTask={setTask}
          setOpenDetailbar={setOpenDetailbar}
          infoTask={task}
          setId={setId}
          setRefresh={setRefresh}
        />
      )}
    </>
  );
}
// function ContentBody({setOpenDetailbar}) {
//   return (
//     <div className="content-container">
//       <div className="taskCreation-container">
//         <div className="taskCreation">
//           <button className="addTask">
//             <svg
//               class="fluentIcon ___12fm75w f1w7gpdv fez10in fg4l7m0"
//               aria-label=""
//               fill="currentColor"
//               aria-hidden="true"
//               width="20"
//               height="20"
//               viewBox="0 0 20 20"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M10 2.5a.5.5 0 00-1 0V9H2.5a.5.5 0 000 1H9v6.5a.5.5 0 001 0V10h6.5a.5.5 0 000-1H10V2.5z"
//                 fill="currentColor"
//               ></path>
//             </svg>
//           </button>
//           <input className="addInput" type="text" placeholder="Add text" />
//         </div>
//         <div className="taskCreation-detail">
//           <div className="dateButton-container">
//             <button className="dateButton">
//               <svg
//                 class="fluentIcon dateButton-icon ___12fm75w f1w7gpdv fez10in fg4l7m0"
//                 aria-label=""
//                 fill="currentColor"
//                 aria-hidden="true"
//                 width="20"
//                 height="20"
//                 viewBox="0 0 20 20"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M7 11a1 1 0 100-2 1 1 0 000 2zm1 2a1 1 0 11-2 0 1 1 0 012 0zm2-2a1 1 0 100-2 1 1 0 000 2zm1 2a1 1 0 11-2 0 1 1 0 012 0zm2-2a1 1 0 100-2 1 1 0 000 2zm4-5.5A2.5 2.5 0 0014.5 3h-9A2.5 2.5 0 003 5.5v9A2.5 2.5 0 005.5 17h9a2.5 2.5 0 002.5-2.5v-9zM4 7h12v7.5c0 .83-.67 1.5-1.5 1.5h-9A1.5 1.5 0 014 14.5V7zm1.5-3h9c.83 0 1.5.67 1.5 1.5V6H4v-.5C4 4.67 4.67 4 5.5 4z"
//                   fill="currentColor"
//                 ></path>
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="task ">
//         <div className=" chunkedComponentList">
//           <div className=" chunkedScrollContainer">
//             {/*scroll*/}
//             <div className="componentList">
//               <div className="taskFadeShrink">
//                 <div className="taskItem-container" onClick={()=> setOpenDetailbar((prevState)=> !prevState)}>
//                   <div className="taskItem-body">
//                     <span className="checkbox">
//                       {/*eventListener*/}
//                       <svg
//                         class="fluentIcon ___12fm75w f1w7gpdv fez10in fg4l7m0"
//                         aria-label=""
//                         fill="currentColor"
//                         aria-hidden="true"
//                         width="20"
//                         height="20"
//                         viewBox="0 0 20 20"
//                         xmlns="http://www.w3.org/2000/svg"
//                         focusable="false"
//                       >
//                         <path
//                           d="M10 3a7 7 0 100 14 7 7 0 000-14zm-8 7a8 8 0 1116 0 8 8 0 01-16 0z"
//                           fill="currentColor"
//                         ></path>
//                       </svg>
//                       <svg
//                         class="fluentIcon checkBox-hover ___12fm75w f1w7gpdv fez10in fg4l7m0"
//                         aria-label=""
//                         fill="currentColor"
//                         aria-hidden="true"
//                         width="20"
//                         height="20"
//                         viewBox="0 0 20 20"
//                         xmlns="http://www.w3.org/2000/svg"
//                         focusable="false"
//                       >
//                         <path
//                           d="M10 2a8 8 0 110 16 8 8 0 010-16zm0 1a7 7 0 100 14 7 7 0 000-14zm3.36 4.65c.17.17.2.44.06.63l-.06.07-4 4a.5.5 0 01-.64.07l-.07-.06-2-2a.5.5 0 01.63-.77l.07.06L9 11.3l3.65-3.65c.2-.2.51-.2.7 0z"
//                           fill="currentColor"
//                         ></path>
//                       </svg>
//                     </span>
//                     <button className="taskItem-titleWrapper">
//                       <span className="taskItem-title">ASDASDAS</span>
//                     </button>
//                     <div className="importantBtn-container">
//                       <span className="btn-important">
//                         {/*eventListener*/}
//                         <svg
//                           class="fluentIcon importantSvg1"
//                           aria-label=""
//                           fill="currentColor"
//                           aria-hidden="true"
//                           width="20"
//                           height="20"
//                           viewBox="0 0 20 20"
//                           xmlns="http://www.w3.org/2000/svg"
//                           focusable="false"
//                         >
//                           <path
//                             d="M9.1 2.9a1 1 0 011.8 0l1.93 3.91 4.31.63a1 1 0 01.56 1.7l-3.12 3.05.73 4.3a1 1 0 01-1.45 1.05L10 15.51l-3.86 2.03a1 1 0 01-1.45-1.05l.74-4.3L2.3 9.14a1 1 0 01.56-1.7l4.31-.63L9.1 2.9zm.9.44L8.07 7.25a1 1 0 01-.75.55L3 8.43l3.12 3.04a1 1 0 01.3.89l-.75 4.3 3.87-2.03a1 1 0 01.93 0l3.86 2.03-.74-4.3a1 1 0 01.29-.89L17 8.43l-4.32-.63a1 1 0 01-.75-.55L10 3.35z"
//                             fill="currentColor"
//                           ></path>
//                         </svg>
//                         <svg
//                           class="fluentIcon importantSvg2"
//                           aria-label=""
//                           fill="currentColor"
//                           aria-hidden="true"
//                           width="20"
//                           height="20"
//                           viewBox="0 0 20 20"
//                           xmlns="http://www.w3.org/2000/svg"
//                           focusable="false"
//                         >
//                           <path
//                             d="M9.1 2.9a1 1 0 011.8 0l1.93 3.91 4.31.63a1 1 0 01.56 1.7l-3.12 3.05.73 4.3a1 1 0 01-1.45 1.05L10 15.51l-3.86 2.03a1 1 0 01-1.45-1.05l.74-4.3L2.3 9.14a1 1 0 01.56-1.7l4.31-.63L9.1 2.9z"
//                             fill="currentColor"
//                           ></path>
//                         </svg>
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
function SideBar({ setOpenSidebar }) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-header-container">
          <span>
            <button
              className="btn-sidebar"
              onClick={() => setOpenSidebar((prevState) => !prevState)}
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
          </span>
        </div>
      </div>
      <div className="sidebar-content">
        <ul>
          <li className="listItem-container">
            <div id="myDay" className="listItem">
              <div className="listItem-inner">
                <span className="listItem-icon">
                  {" "}
                  {/*My day*/}
                  <svg
                    className="fluentIcon "
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
                      d="M10 2c.28 0 .5.22.5.5v1a.5.5 0 01-1 0v-1c0-.28.22-.5.5-.5zm0 12a4 4 0 100-8 4 4 0 000 8zm0-1a3 3 0 110-6 3 3 0 010 6zm7.5-2.5a.5.5 0 000-1h-1a.5.5 0 000 1h1zM10 16c.28 0 .5.22.5.5v1a.5.5 0 01-1 0v-1c0-.28.22-.5.5-.5zm-6.5-5.5a.5.5 0 000-1H2.46a.5.5 0 000 1H3.5zm.65-6.35c.2-.2.5-.2.7 0l1 1a.5.5 0 11-.7.7l-1-1a.5.5 0 010-.7zm.7 11.7a.5.5 0 01-.7-.7l1-1a.5.5 0 01.7.7l-1 1zm11-11.7a.5.5 0 00-.7 0l-1 1a.5.5 0 00.7.7l1-1a.5.5 0 000-.7zm-.7 11.7a.5.5 0 00.7-.7l-1-1a.5.5 0 00-.7.7l1 1z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>
                <Link className="listItem-title" to="MyDay">
                  My Day
                </Link>
               
              
              </div>
            </div>
          </li>

          <li className="listItem-container">
            <div id="important" className="listItem">
              <div className="listItem-inner">
                <span className="listItem-icon">
                  <svg
                    class="fluentIcon ___12fm75w f1w7gpdv fez10in fg4l7m0"
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
                      d="M9.1 2.9a1 1 0 011.8 0l1.93 3.91 4.31.63a1 1 0 01.56 1.7l-3.12 3.05.73 4.3a1 1 0 01-1.45 1.05L10 15.51l-3.86 2.03a1 1 0 01-1.45-1.05l.74-4.3L2.3 9.14a1 1 0 01.56-1.7l4.31-.63L9.1 2.9zm.9.44L8.07 7.25a1 1 0 01-.75.55L3 8.43l3.12 3.04a1 1 0 01.3.89l-.75 4.3 3.87-2.03a1 1 0 01.93 0l3.86 2.03-.74-4.3a1 1 0 01.29-.89L17 8.43l-4.32-.63a1 1 0 01-.75-.55L10 3.35z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>
                {/*Important*/}
                <Link className="listItem-title" to="Important">
                  Important
                </Link>
                
              </div>
            </div>
          </li>

          <div>
            <li className="listItem-container">
              <div id="planned" className="listItem">
                <div className="listItem-inner">
                  <span className="listItem-icon">
                    <svg
                      className="fluentIcon"
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
                        d="M7 11a1 1 0 100-2 1 1 0 000 2zm1 2a1 1 0 11-2 0 1 1 0 012 0zm2-2a1 1 0 100-2 1 1 0 000 2zm1 2a1 1 0 11-2 0 1 1 0 012 0zm2-2a1 1 0 100-2 1 1 0 000 2zm4-5.5A2.5 2.5 0 0014.5 3h-9A2.5 2.5 0 003 5.5v9A2.5 2.5 0 005.5 17h9a2.5 2.5 0 002.5-2.5v-9zM4 7h12v7.5c0 .83-.67 1.5-1.5 1.5h-9A1.5 1.5 0 014 14.5V7zm1.5-3h9c.83 0 1.5.67 1.5 1.5V6H4v-.5C4 4.67 4.67 4 5.5 4z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                  {/*Planned*/}
                  <Link className="listItem-title" to="CompletedTask">
                 Completed Task
                </Link>
                 
                </div>
              </div>
            </li>
          </div>
          <div>
            <li className="listItem-container">
              <div id="tasks" className="listItem">
                <div className="listItem-inner">
                  <span className="listItem-icon">
                    <svg
                      class="fluentIcon "
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
                        d="M9 2.39a1.5 1.5 0 012 0l5.5 4.94c.32.28.5.69.5 1.12v7.05c0 .83-.67 1.5-1.5 1.5H13a1.5 1.5 0 01-1.5-1.5V12a.5.5 0 00-.5-.5H9a.5.5 0 00-.5.5v3.5c0 .83-.67 1.5-1.5 1.5H4.5A1.5 1.5 0 013 15.5V8.45c0-.43.18-.84.5-1.12L9 2.39zm1.33.74a.5.5 0 00-.66 0l-5.5 4.94a.5.5 0 00-.17.38v7.05c0 .28.22.5.5.5H7a.5.5 0 00.5-.5V12c0-.83.67-1.5 1.5-1.5h2c.83 0 1.5.67 1.5 1.5v3.5c0 .28.22.5.5.5h2.5a.5.5 0 00.5-.5V8.45a.5.5 0 00-.17-.38l-5.5-4.94z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                  {/*Tasks*/}
                  <span className="listItem-title">Tasks</span>
                  <div className="listItem-count">10</div>
                </div>
              </div>
            </li>
            <div className="sidebar-staticline"></div>
          </div>
          <div className="sortable-list">
            <li className="listItem-container">
              <div id="important" className="listItem">
                <div className="listItem-inner">
                  <span className="listItem-icon">👋</span>
                  <span className="listItem-title">Getting started</span>
                  <div className="listItem-count">10</div>
                </div>
              </div>
            </li>
            <li className="listItem-container">
              <div id="important" className="listItem">
                <div className="listItem-inner">
                  <span className="listItem-icon">🛒</span>
                  {/*Important*/}
                  <span className="listItem-title">grocceries</span>
                  <div className="listItem-count">10</div>
                </div>
              </div>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
}
function DetailsBar({
  setOpenDetailbar,
  infoTask,
  setId,
  setRefresh,
  setTask,
}) {
  const BASE_URL = "https://localhost:7176";
  const [isClick, setIsClick] = useState(infoTask.isMyDay);
  const [inputValue, setInputValue] = useState("");
  const [inputDes, setInputDes] = useState(infoTask.description);
  const handleStatusMyDay = (id, isMyDay) => {
    fetch(
      `${BASE_URL}/api/Task/UpdateStatusMyDay?id=${id}&StatusMyDay=${!isMyDay}`,
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
        setTask((prev) => ({ ...prev, title: inputValue }));
        setRefresh((prev) => prev + 1);
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
    setIsClick(!isMyDay);
    setRefresh((prev) => prev + 1);
    setId(id);
  };
  const updateTitle = (event) => {
    if (event.key === "Enter") {
      console.log(infoTask.id);
      console.log(inputValue);
      fetch(
        `${BASE_URL}/api/Task/UpdateTitle?id=${infoTask.id}&newTitle=${inputValue}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((result) => {
          setTask((prev) => ({ ...prev, title: inputValue }));
          setRefresh((prev) => prev + 1);
        })
        .catch((error) => {
          console.error("Lỗi:", error);
        });
    }
  };
  const updateDescription = (event) => {
    if (event.key === "Enter") {
      console.log(infoTask.id);
      console.log(inputDes);
      fetch(
        `${BASE_URL}/api/Task/UpdateDescription?id=${infoTask.id}&newDes=${inputDes}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((result) => {
          setTask((prev) => ({ ...prev, description: inputDes }));
          setRefresh((prev) => prev + 1);
        })
        .catch((error) => {
          console.error("Lỗi:", error);
        });
    }
  };
  
const success = () =>{
  toast.success("Delete success !", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}
  const deleteTask = () =>{
    
    fetch(
      `${BASE_URL}/api/Task/Delete?id=${infoTask.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((result) => {
       success();
        setRefresh((prev) => prev + 1);
        setOpenDetailbar((prevState) => !prevState)
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
  }
  
  console.log(infoTask);
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
    <div className="detailBar-container">
      <div className="details-body">
        <div className="detailHeader">
          <div className="detailHeader-titleWrapper">
            <div className="editableContent width-100">
              <input
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => updateTitle(e)}
                className="width-100"
                type="text"
                placeholder={infoTask.title}
              />
            </div>
          </div>
        </div>
        <div className="section-container">
          <div className="section">
            <div className="section-item">
              {/**add to my day */}
              <button
                className="section-innerClick"
                onClick={() => handleStatusMyDay(infoTask.id, infoTask.isMyDay)}
              >
                <div className="section-inner">
                  <div className="section-icon">
                    <svg
                      class={`fluentIcon ${isClick ? "isClick" : ""} `}
                      aria-label=""
                      fill="currentColor"
                      aria-hidden="true"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 2c.28 0 .5.22.5.5v1a.5.5 0 01-1 0v-1c0-.28.22-.5.5-.5zm0 12a4 4 0 100-8 4 4 0 000 8zm0-1a3 3 0 110-6 3 3 0 010 6zm7.5-2.5a.5.5 0 000-1h-1a.5.5 0 000 1h1zM10 16c.28 0 .5.22.5.5v1a.5.5 0 01-1 0v-1c0-.28.22-.5.5-.5zm-6.5-5.5a.5.5 0 000-1H2.46a.5.5 0 000 1H3.5zm.65-6.35c.2-.2.5-.2.7 0l1 1a.5.5 0 11-.7.7l-1-1a.5.5 0 010-.7zm.7 11.7a.5.5 0 01-.7-.7l1-1a.5.5 0 01.7.7l-1 1zm11-11.7a.5.5 0 00-.7 0l-1 1a.5.5 0 00.7.7l1-1a.5.5 0 000-.7zm-.7 11.7a.5.5 0 00.7-.7l-1-1a.5.5 0 00-.7.7l1 1z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                  <div className="section-content">
                    <div
                      className={`section-title ${isClick ? "isClick" : ""}`}
                    >
                     {isClick ? "Added to my day" : "Add to my day "}
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
          <div className="section">
            <div className="section-item">
              <button className="section-innerClick">
                <div className="section-inner">
                  <div className="section-icon">
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
                        d="M7 11a1 1 0 100-2 1 1 0 000 2zm1 2a1 1 0 11-2 0 1 1 0 012 0zm2-2a1 1 0 100-2 1 1 0 000 2zm1 2a1 1 0 11-2 0 1 1 0 012 0zm2-2a1 1 0 100-2 1 1 0 000 2zm4-5.5A2.5 2.5 0 0014.5 3h-9A2.5 2.5 0 003 5.5v9A2.5 2.5 0 005.5 17h9a2.5 2.5 0 002.5-2.5v-9zM4 7h12v7.5c0 .83-.67 1.5-1.5 1.5h-9A1.5 1.5 0 014 14.5V7zm1.5-3h9c.83 0 1.5.67 1.5 1.5V6H4v-.5C4 4.67 4.67 4 5.5 4z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                  <div className="section-content">Add due date</div>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="section-item">
            <div className="noteContainer">
              
              <div
                className="addNote"
                contentEditable
                suppressContentEditableWarning={true}
                onInput={(e) => setInputDes(e.currentTarget.textContent)}
                onKeyDown={(e) => updateDescription(e)}
              >
                {infoTask.description}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="detail-footer">
        <div className="detailFooter-container">
          <div className="btn-closeDetailBarContainer">
            <button
              className="btn-closeDetailBar"
              onClick={() => setOpenDetailbar((prevState) => !prevState)}
            >
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
                  d="M9.18 10.5l-1 .87a.5.5 0 10.66.76l2-1.75a.5.5 0 000-.76l-2-1.75a.5.5 0 10-.66.76l1 .87H5.5a.5.5 0 000 1h3.68zM16 16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v8c0 1.1.9 2 2 2h12zm1-2a1 1 0 01-1 1h-3V5h3a1 1 0 011 1v8zm-5-9v10H4a1 1 0 01-1-1V6a1 1 0 011-1h8z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </div>

          <div className="btn-removeTaskContainer">
            <button className="btn-removeTask" onClick={() => deleteTask()}>
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
                  d="M8.5 4h3a1.5 1.5 0 00-3 0zm-1 0a2.5 2.5 0 015 0h5a.5.5 0 010 1h-1.05l-1.2 10.34A3 3 0 0112.27 18H7.73a3 3 0 01-2.98-2.66L3.55 5H2.5a.5.5 0 010-1h5zM5.74 15.23A2 2 0 007.73 17h4.54a2 2 0 001.99-1.77L15.44 5H4.56l1.18 10.23zM8.5 7.5c.28 0 .5.22.5.5v6a.5.5 0 01-1 0V8c0-.28.22-.5.5-.5zM12 8a.5.5 0 00-1 0v6a.5.5 0 001 0V8z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}