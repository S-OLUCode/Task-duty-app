import { Link, Outlet } from "react-router";
import Nav from "../Components/Nav";



export default function Rootlayout() {
  return (
      <>
      <Nav />
      <hr className="border-t border-gray-400"/>
      <Link/>
      <Outlet/>
    </>
  )
}
