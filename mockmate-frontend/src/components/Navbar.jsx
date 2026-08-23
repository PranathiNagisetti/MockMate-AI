
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const location = useLocation();

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/main-dashboard"
    },
    {
      name: "Interview History",
      path: "/history"
    },
    {
      name: "Resume History",
      path: "/resume/history"
    },
    {
      name: "Profile",
      path: "/profile"
    }
  ];

  return (

    <nav className="bg-white shadow-md border-b sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-8">

        <div className="flex justify-between items-center h-16">

          {/* Logo */}

          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/main-dashboard")}
          >

            <div className="text-3xl">
              🤖
            </div>

            <div>

              <h1 className="text-xl font-bold text-green-700">
                MockMate AI
              </h1>

              

            </div>


          </div>

          {/* Navigation */}

          <div className="hidden md:flex gap-8">

            {navItems.map((item) => (

              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition ${
                  location.pathname === item.path
                    ? "text-green-600 border-b-2 border-green-600 pb-1"
                    : "text-gray-600 hover:text-green-600"
                }`}
              >
                {item.name}
              </Link>

            ))}

          </div>

          {/* Right Side */}

          <div className="flex items-center gap-4">

            

            <button

              onClick={logout}

              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-semibold transition"

            >

              Logout

            </button>

          </div>

        </div>

      </div>

    </nav>

  );

}

export default Navbar;
