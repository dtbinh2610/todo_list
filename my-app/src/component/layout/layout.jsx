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
