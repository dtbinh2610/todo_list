// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/login/login.jsx";
import Register from "./component/register/register.jsx";
import ContentBody from "./component/Content/myday.jsx";
import App from "./App.jsx";
import "./assets/gloabal.css";
import MyDay from "./component/Content/myday.jsx";
import Important from "./component/Content/important.jsx";
import CompletedTask from "./component/Content/completed.jsx";
import Tasks from "./component/Content/tasks.jsx";
// const BASE_URL = "https://localhost:7176"
const BASE_URL =
  "https://gm-webapp-dev-01-f9cdd2ebb7drbadp.southeastasia-01.azurewebsites.net";

// const  router = createBrowserRouter([
//   {path:"/app",element:<App/>},
//   {path:"/login",element:<Login BASE_URL={BASE_URL}/>},
//   {path:"/Register",element:<Register/>}
// ]);

createRoot(document.getElementById("root")).render(
  <>
    {/* <RouterProvider router={router} /> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login BASE_URL={BASE_URL} />} />
        <Route path="/login" element={<Login BASE_URL={BASE_URL} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/app" element={<App />}>
          <Route path="MyDay" element={<MyDay BASE_URL={BASE_URL} />} />
          <Route path="Important" element={<Important BASE_URL={BASE_URL} />} />
          <Route
            path="CompletedTask"
            element={<CompletedTask BASE_URL={BASE_URL} />}
          />
          <Route path="Tasks" element={<Tasks BASE_URL={BASE_URL} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);

//Link to
