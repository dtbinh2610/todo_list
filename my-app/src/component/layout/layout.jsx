import "./layout.css";
import { useState } from "react";
import photoSearch from "../../assets/search.svg";
import photoSetting from "../../assets/setting2.svg";

export default function Layout({ children }) {
  const [openSetting, setOpenSetting] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  // const[openSidebar,setOpenSidebar] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <>
      <Header 
      user={user}
        openSetting={openSetting}
        setOpenSetting={setOpenSetting}
        setOpenProfile={setOpenProfile}
        openProfile={openProfile}
      /> 
       <div className="main">
        {children}
       </div>
      {/* {openSidebar&&<SideBar setOpenSidebar={setOpenSidebar} />} */}
    </>
  );
}

function Header({ openSetting, setOpenSetting, openProfile, setOpenProfile,user }) {
  const getInitials = (name) => {
    const nameParts = name.split(" "); // Tách tên thành các phần
    const initials = nameParts.map(part => part[0].toUpperCase()).join(""); // Lấy chữ cái đầu mỗi phần và ghép lại
    return initials;
  };
  const initials = getInitials(user.username); 
  return (
    <>
      <div className="header">
        <HeaderItems
          name={initials}
          setOpenSetting={setOpenSetting}
          setOpenProfile={setOpenProfile}
        />
        <SearchBar />
      </div>
      {openSetting && <HiddenSetting setOpenSetting={setOpenSetting} />}
      {openProfile && <HiddenProfile user={user} />}
    </>
  );
}
function HeaderItems({ name, setOpenSetting, setOpenProfile }) {
  return (
    <>
      <div className="header-items">
        <div className="setting full">
          <button
            className="btn-setting"
            onClick={() => setOpenSetting((prevState) => !prevState)}
          >
            <img className="setting-img" src={photoSetting} alt="" />
          </button>
        </div>
        <div className="profile full">
          <div className="profile-detail">
            <button
              className="btn-profile"
              onClick={() => setOpenProfile((prevState) => !prevState)}
            >
              {" "}
              {name}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
function SearchBar() {
  return (
    <div className="search-bar">
      <span>
        <img className="search-img" src={photoSearch} alt="" />
        <input type="" />
      </span>
    </div>
  );
}
function HiddenSetting({ setOpenSetting, setOpenProfile }) {
  const [toggled, setToggled] = useState(false);
  const [toggledDark, setToggledDark] = useState(false);

  return (
    <>
      <div className="setting-block ">{/*z-index adjust*/}
        <div className="setting-heading">
          <div className="setting-heading-title">
            <h2>Settings</h2>
          </div>
          <div className="setting-heading-btn">
            <button className="exit" onClick={() => setOpenSetting(false)}>
              X
            </button>
          </div>
        </div>

        <div className="language">
          <div className="language-title">
            <h3>Language </h3>
          </div>
          <div className="language-toggle">
            <button
              className={`toggle-btn ${toggled ? "toggled" : ""}`}
              onClick={() => setToggled(!toggled)}
            >
              <div className="thumb"></div>
            </button>
          </div>
        </div>
        <div className="mode">
          <div className="mode-title">
            <h3>Dark mode </h3>
          </div>
          <div className="mode-toggle">
            <button
              className={`toggle-btn ${toggledDark ? "toggled" : ""}`}
              onClick={() => setToggledDark(!toggledDark)}
            >
              <div className="thumb"></div>
            </button>
          </div>
        </div>
        <div className="change-password">
          <div className="password-title">
            <h3>Password </h3>
            <div className="password-link">
              <button className="btn-change-password">
                Change your password <span>&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
function HiddenProfile({user}) {
  return (
    <>
      <div className="profile-block">{/*z-index adjust*/}
        <div className="profile-content">
          <div className="avatar">
            <button className="btn-avatar"></button>
          </div>
          <div className="profile-details">
            <ul>
              <li className="username">
                <h3>{user.username}</h3>
              </li>
              <li className="gmail">
                <p>{user.email}</p>
              </li>
              <li className="link-profile">
                <a href="#">Logout</a>  
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
// function SideBar({setOpenSidebar}) {
//   return (
//     <div className="sidebar">
//       <div className="sidebar-header">
//         <div className="sidebar-header-container">
//           <span>
//             <button className="btn-sidebar" onClick={()=> setOpenSidebar((prevState) =>!prevState)}>
//             <svg
//               className="fluentIcon"
//               aria-label=""
//               fill="currentColor"
//               aria-hidden="true"
//               width="20"
//               height="20"
//               viewBox="0 0 20 20"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M2 4.5c0-.28.22-.5.5-.5h15a.5.5 0 010 1h-15a.5.5 0 01-.5-.5zm0 5c0-.28.22-.5.5-.5h15a.5.5 0 010 1h-15a.5.5 0 01-.5-.5zm.5 4.5a.5.5 0 000 1h15a.5.5 0 000-1h-15z"
//                 fill="currentColor"
//               ></path>
//             </svg>
//             </button>
//           </span>
//         </div>
//       </div>
//       <div className="sidebar-content">
//         <ul>
//           <li className="listItem-container">
//             <div id="myDay" className="listItem">
//               <div className="listItem-inner">
//                 <span className="listItem-icon">
//                   {" "}
//                   {/*My day*/}
//                   <svg
//                     className="fluentIcon "
//                     aria-label=""
//                     fill="currentColor"
//                     aria-hidden="true"
//                     width="20"
//                     height="20"
//                     viewBox="0 0 20 20"
//                     xmlns="http://www.w3.org/2000/svg"
//                     focusable="false"
//                   >
//                     <path
//                       d="M10 2c.28 0 .5.22.5.5v1a.5.5 0 01-1 0v-1c0-.28.22-.5.5-.5zm0 12a4 4 0 100-8 4 4 0 000 8zm0-1a3 3 0 110-6 3 3 0 010 6zm7.5-2.5a.5.5 0 000-1h-1a.5.5 0 000 1h1zM10 16c.28 0 .5.22.5.5v1a.5.5 0 01-1 0v-1c0-.28.22-.5.5-.5zm-6.5-5.5a.5.5 0 000-1H2.46a.5.5 0 000 1H3.5zm.65-6.35c.2-.2.5-.2.7 0l1 1a.5.5 0 11-.7.7l-1-1a.5.5 0 010-.7zm.7 11.7a.5.5 0 01-.7-.7l1-1a.5.5 0 01.7.7l-1 1zm11-11.7a.5.5 0 00-.7 0l-1 1a.5.5 0 00.7.7l1-1a.5.5 0 000-.7zm-.7 11.7a.5.5 0 00.7-.7l-1-1a.5.5 0 00-.7.7l1 1z"
//                       fill="currentColor"
//                     ></path>
//                   </svg>
//                 </span>
//                 <span className="listItem-title">My Day</span>
//                 <div className="listItem-count">10</div>
//               </div>
//             </div>
//           </li>

//           <li className="listItem-container">
//             <div id="important" className="listItem">
//               <div className="listItem-inner">
//                 <span className="listItem-icon">
//                   <svg
//                     class="fluentIcon ___12fm75w f1w7gpdv fez10in fg4l7m0"
//                     aria-label=""
//                     fill="currentColor"
//                     aria-hidden="true"
//                     width="20"
//                     height="20"
//                     viewBox="0 0 20 20"
//                     xmlns="http://www.w3.org/2000/svg"
//                     focusable="false"
//                   >
//                     <path
//                       d="M9.1 2.9a1 1 0 011.8 0l1.93 3.91 4.31.63a1 1 0 01.56 1.7l-3.12 3.05.73 4.3a1 1 0 01-1.45 1.05L10 15.51l-3.86 2.03a1 1 0 01-1.45-1.05l.74-4.3L2.3 9.14a1 1 0 01.56-1.7l4.31-.63L9.1 2.9zm.9.44L8.07 7.25a1 1 0 01-.75.55L3 8.43l3.12 3.04a1 1 0 01.3.89l-.75 4.3 3.87-2.03a1 1 0 01.93 0l3.86 2.03-.74-4.3a1 1 0 01.29-.89L17 8.43l-4.32-.63a1 1 0 01-.75-.55L10 3.35z"
//                       fill="currentColor"
//                     ></path>
//                   </svg>
//                 </span>
//                 {/*Important*/}
//                 <span className="listItem-title">Important</span>
//                 <div className="listItem-count">10</div>
//               </div>
//             </div>
//           </li>

//           <div>
//             <li className="listItem-container">
//               <div id="planned" className="listItem">
//                 <div className="listItem-inner">
//                   <span className="listItem-icon">
//                     <svg
//                       className="fluentIcon"
//                       aria-label=""
//                       fill="currentColor"
//                       aria-hidden="true"
//                       width="20"
//                       height="20"
//                       viewBox="0 0 20 20"
//                       xmlns="http://www.w3.org/2000/svg"
//                       focusable="false"
//                     >
//                       <path
//                         d="M7 11a1 1 0 100-2 1 1 0 000 2zm1 2a1 1 0 11-2 0 1 1 0 012 0zm2-2a1 1 0 100-2 1 1 0 000 2zm1 2a1 1 0 11-2 0 1 1 0 012 0zm2-2a1 1 0 100-2 1 1 0 000 2zm4-5.5A2.5 2.5 0 0014.5 3h-9A2.5 2.5 0 003 5.5v9A2.5 2.5 0 005.5 17h9a2.5 2.5 0 002.5-2.5v-9zM4 7h12v7.5c0 .83-.67 1.5-1.5 1.5h-9A1.5 1.5 0 014 14.5V7zm1.5-3h9c.83 0 1.5.67 1.5 1.5V6H4v-.5C4 4.67 4.67 4 5.5 4z"
//                         fill="currentColor"
//                       ></path>
//                     </svg>
//                   </span>
//                   {/*Planned*/}
//                   <span className="listItem-title">Planned</span>
//                   <div className="listItem-count">10</div>
//                 </div>
//               </div>
//             </li>
//           </div>
//           <div>
//             <li className="listItem-container">
//               <div id="tasks" className="listItem">
//                 <div className="listItem-inner">
//                   <span className="listItem-icon">
//                     <svg
//                       class="fluentIcon "
//                       aria-label=""
//                       fill="currentColor"
//                       aria-hidden="true"
//                       width="20"
//                       height="20"
//                       viewBox="0 0 20 20"
//                       xmlns="http://www.w3.org/2000/svg"
//                       focusable="false"
//                     >
//                       <path
//                         d="M9 2.39a1.5 1.5 0 012 0l5.5 4.94c.32.28.5.69.5 1.12v7.05c0 .83-.67 1.5-1.5 1.5H13a1.5 1.5 0 01-1.5-1.5V12a.5.5 0 00-.5-.5H9a.5.5 0 00-.5.5v3.5c0 .83-.67 1.5-1.5 1.5H4.5A1.5 1.5 0 013 15.5V8.45c0-.43.18-.84.5-1.12L9 2.39zm1.33.74a.5.5 0 00-.66 0l-5.5 4.94a.5.5 0 00-.17.38v7.05c0 .28.22.5.5.5H7a.5.5 0 00.5-.5V12c0-.83.67-1.5 1.5-1.5h2c.83 0 1.5.67 1.5 1.5v3.5c0 .28.22.5.5.5h2.5a.5.5 0 00.5-.5V8.45a.5.5 0 00-.17-.38l-5.5-4.94z"
//                         fill="currentColor"
//                       ></path>
//                     </svg>
//                   </span>
//                   {/*Tasks*/}
//                   <span className="listItem-title">Tasks</span>
//                   <div className="listItem-count">10</div>
//                 </div>
//               </div>
//             </li>
//             <div className="sidebar-staticline"></div>
            
//           </div>
//           <div className="sortable-list">
//           <li className="listItem-container">
//               <div id="important" className="listItem">
//                 <div className="listItem-inner">
//                   <span className="listItem-icon">👋</span>
//                   <span className="listItem-title">Getting started</span>
//                   <div className="listItem-count">10</div>
//                 </div>
//               </div>
//             </li>
//             <li className="listItem-container">
//               <div id="important" className="listItem">
//                 <div className="listItem-inner">
//                   <span className="listItem-icon">🛒</span>
//                   {/*Important*/}
//                   <span className="listItem-title">grocceries</span>
//                   <div className="listItem-count">10</div>
//                 </div>
//               </div>
//             </li>
//           </div>
//         </ul>
//       </div>
//     </div>
//   );
// }
