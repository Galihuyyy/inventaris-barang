import axios from "axios";
import getToken from "../utils/helper";
import { Navigate } from "react-router-dom";

export default function Auth(props) {
  const { children, role, exceptRole } = props;

  const userDetail = JSON.parse(localStorage.getItem("user"));
  const userRole = userDetail?.role;
  const userToken = userDetail?.token;

  const apiUrl = import.meta.env.VITE_API_URL

  if (!userToken) {
    return <Navigate to={'/login'}/>
  }

  if (userToken) {
    axios.get(`${apiUrl}/user-me`, {headers : {Authorization : `Bearer ${getToken()}`}})
    .then(res => {
    })
    .catch(err => {
      if (err.status === 401) {
        window.location.href = "/login";
        return null
      }
    })
  }

  if (role) {
    const allowedRoles = Array.isArray(role) ? role : [role];
    if (!allowedRoles.includes(userRole)) {
      window.location.href = "/forbidden";
      return null;
    }
  }

  if (exceptRole) {
    const blockedRoles = Array.isArray(exceptRole) ? exceptRole : [exceptRole];
    if (blockedRoles.includes(userRole)) {
      window.location.href = "/forbidden";
      return null;
    }
  }

  return children;
}
