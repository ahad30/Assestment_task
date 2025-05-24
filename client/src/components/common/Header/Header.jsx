
import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const Header = () => {
    const [openNav, setOpenNav] = React.useState(false);
 
    React.useEffect(() => {
      window.addEventListener(
        "resize",
        () => window.innerWidth >= 960 && setOpenNav(false),
      );
    }, []);
   
    const navList = (
      <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <Typography
          as="li"
          variant="large"
          color="blue-gray"
          className={`p-1 text-sm`}
        >
          <NavLink
            style={({ isActive, isPending, isTransitioning }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isPending ? "red" : "black",
                  viewTransitionName: isTransitioning ? "slide" : "",
                };
              }}
           to="/" className="flex items-center text-[#150B2BB3]">
          Home
        </NavLink>
        </Typography>
        <Typography
          as="li"
          variant="large"
          color="blue-gray"
          className={`p-1 text-sm`}
        >
        <NavLink
         style={({ isActive, isPending, isTransitioning }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isPending ? "red" : "black",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
        to="/about" className="flex items-center text-[#150B2BB3]">
          About
        </NavLink>
        </Typography>
        <Typography
          as="li"
          variant="large"
          color="blue-gray"
          className={`p-1 text-sm`}
        >
        <NavLink
         style={({ isActive, isPending, isTransitioning }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isPending ? "red" : "black",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
        to="/blog" className="flex items-center text-[#150B2BB3]">
          Blog
        </NavLink>
        </Typography>
        <Typography
          as="li"
          variant="large"
          color="blue-gray"
          className={`p-1 text-sm`}
        >
        <NavLink
         style={({ isActive, isPending, isTransitioning }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isPending ? "red" : "black",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
        to="/contact" className="flex items-center text-[#150B2BB3]">
          Contact
        </NavLink>
        </Typography>
     
      
      </ul>
    );
   
    return (
      <div className="max-h-[768px]  lg:max-w-7xl mx-auto">
        <Navbar className="sticky top-0 z-10  py-2 lg:px-8 lg:py-5 shadow-none">
          <div className="flex items-center justify-between text-blue-gray-900">
            <div className="flex items-center">
              <Typography
                as="a"
                className="mr-7 cursor-pointer py-1.5 font-medium"
              >
                <NavLink to="/">
                <h1 className="font-bold text-xl">Boiler Plate</h1>
                </NavLink>
              </Typography>           
            </div>

            <div className="flex items-center gap-4 ">
              <div className="mr-2 hidden lg:block">{navList}</div>   
     
            </div>

            <div className="flex items-center gap-2">
            <div className="gap-4 relative lg:w-[80%] hidden lg:block">
            <span className ="absolute inset-y-0 start-2 grid place-content-center text-gray-500">
            <IoSearchOutline />
            </span>
            <input type="text" id="search-field" placeholder="   Search"
            className="w-full rounded-full border-gray-200  shadow-sm sm:text-sm py-2 px-5 text-black bg-[#150B2B0D]"/>           
            </div>
            <IconButton
                variant="text"
                className=" h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                ripple={false}
                onClick={() => setOpenNav(!openNav)}
              >
                {openNav ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </IconButton>
            <div>
            <div className="bg-[#0BE58A] p-2 rounded-full hidden lg:block">
            <FaRegUserCircle/>
            </div>   
            </div>
            </div>
          </div>
          <MobileNav open={openNav} className={`flex justify-center`}>{navList}</MobileNav>
        </Navbar>
      </div>
    );
};

export default Header;