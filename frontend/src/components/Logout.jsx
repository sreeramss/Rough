export const logout = (navigate) => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId")
    navigate("/");
  };