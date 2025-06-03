import { NavLink } from "react-router-dom"

const Navlink = (props) => {

    const {children, icon, href} = props
    
  return (
    <NavLink
    to={href}
    className={({ isActive }) =>
        `flex items-center px-6 py-2.5 ${
        isActive
            ? "bg-indigo-600 text-white rounded"
            : "text-gray-800 hover:text-indigo-600"
        }`
    }
    >
    <i className={`${icon} mr-2`}></i>
    {children}
    </NavLink>
  )
}

export default Navlink