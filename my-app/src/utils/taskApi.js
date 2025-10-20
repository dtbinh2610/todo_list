import { data } from "react-router-dom";
import { toast } from "react-toastify";
const BASE_URL = "https://localhost:7176";

export const error = (innerText) => {
  toast.error(innerText, {
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
export const warning = (innerText) => {
    toast.warn(innerText, {
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
export const success = (innerText) =>{
    toast.success(innerText, {
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

export const updateImportantStatus = async (id, isImportant) => {
  const response = await fetch(
    `${BASE_URL}/api/Task/UpdateStatusImportant?id=${id}&StatusImportant=${!isImportant}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Lỗi khi cập nhật trạng thái quan trọng");
  }
  return response.json();
};
export const updateCompleteStatus = async (id, isCompleted) => {
  const response = await fetch(
    `${BASE_URL}/api/Task/UpdateStatusComplete?id=${id}&StatusComplete=${!isCompleted}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    }
  );
  if (!response.ok) {
    throw new Error("Lỗi khi cập nhật trạng thái hoàn thành ");
  }
  return response.json();
};

export const register = async (username, password, email) => {
  const data = {
    username: username,
    password: password,
    email: email,
  };
  const response = await fetch(
    `${BASE_URL}/Register?Username=${username}&Password=${password}&Email=${email}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    }
  );
  if (!response.ok) {
    throw new Error("Lỗi khi đăng ký ");
  }
  return response.json();
};
