import { Link, useNavigate } from "react-router-dom"

function Navbar(){

  const navigate = useNavigate()

  const logout = ()=>{

    localStorage.removeItem("token")

    navigate("/")

  }

  return(

    <div
      style={{
        display:"flex",
        gap:"20px",
        padding:"20px",
        borderBottom:"1px solid gray"
      }}
    >

      <Link to="/dashboard">
        Dashboard
      </Link>

      <Link to="/history">
        History
      </Link>

      <button onClick={logout}>
        Logout
      </button>

    </div>

  )

}

export default Navbar