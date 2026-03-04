import React from 'react'

export default function AuthLayout() {
  return (
     <>
      <section className=" auth-layout auth-background  min-h-screen  lg:grid grid-cols-12">
        <div
          className="md:block col-span-6 h-full "
          style={{ backgroundImage: "url('/LaundryMachine.svg')" }}
        >
          <div className="flex  justify-center pt-4">
            <Link to="/" className="   w-[300px] ">
              <LogoTwo />
            </Link>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 p-4">
          <Outlet />
        </div>
      </section>
    </>
  )
}
