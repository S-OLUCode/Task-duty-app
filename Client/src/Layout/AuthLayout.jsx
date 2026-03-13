import React from 'react'
import { Link, Outlet } from "react-router";

export default function AuthLayout() {
  return (
     <>
      <section className=" auth-layout auth-background  min-h-screen  lg:grid grid-cols-12">
        <div
          className="md:block col-span-6 h-full "
          style={{ backgroundImage: "url('/Tdbgimage.png')" }}
        >
        </div>
        <div className="col-span-12 md:col-span-6 p-4">
          <Outlet />
        </div>
      </section>
    </>
  )
}
