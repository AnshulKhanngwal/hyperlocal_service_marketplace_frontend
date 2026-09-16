import React, { useContext, useState } from 'react'
import UserContext from './UserContext'

const SideNav = ({titles, setContent, open}) => {
  // const user = useContext(UserContext);
  const sideElements = titles.CUSTOMER; //user.role == 'ADMIN' ? titles.ADMIN : titles.CUSTOMER;

  return (
    <div fixed left-0 right-0 top-640 bottom-0>
      <aside
        id="default-sidebar"
        className={`fixed top-15 left-0 z-100 sm:w-64 w-40 h-[calc(100vh-3.75rem)]
            transition-transform sm:translate-x-0
            ${open ? "translate-x-0" : "-translate-x-full"}`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-neutral-primary-soft border-e border-default">
          <ul className="space-y-2 font-medium">
            {sideElements.map((item) => (
            <li>
              <a
              onClick={()=> setContent(item.component)}
                href="#"
                className="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group"
              >
                <svg
                  className="w-5 h-5 transition duration-75 group-hover:text-fg-brand"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6.025A7.5 7.5 0 1 0 17.975 14H10V6.025Z"
                  />
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.5 3c-.169 0-.334.014-.5.025V11h7.975c.011-.166.025-.331.025-.5A7.5 7.5 0 0 0 13.5 3Z"
                  />
                </svg>

                <span className="ms-3">{item.name}</span>
              </a>
            </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  )
}

export default SideNav
