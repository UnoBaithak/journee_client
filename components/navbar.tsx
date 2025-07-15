"use client"

import { useSession } from '@/context/session-context';
import { Globe2Icon, HomeIcon, ListIcon, LogIn, LogOutIcon, Menu, MenuIcon, PlaneIcon, SettingsIcon, User, User2 } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'

interface MenuButtonProps {
  buttonTitle: string,
  onClick: React.MouseEventHandler<HTMLButtonElement>,
  icon: React.ReactNode
}

function MenuButton({ buttonTitle, onClick, icon }: MenuButtonProps) {
  return (
    <div className='font-sans w-full border-b-slate-400 border-b-[1px] hover:bg-white/65'>
      <button className='p-2 w-full min-w-1/2 m-auto flex justify-center' onClick={(e) => onClick(e)}>
        {icon}
        <p>{buttonTitle}</p>
      </button>
    </div>
  )
}

function Navbar() {
  const [menu, showMenu] = React.useState(false);
  const [showProfileMenu, setProfileMenu] = React.useState(false)
  const router = useRouter();
  const { isLoggedIn, username } = useSession();

  const handleNavClick = (navPage: string, setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(false)
    router.push(navPage);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "end" }}>
      <div className='flex justify-between w-full p-[7px] bg-white/85 shadow-lg rounded-lg items-center'>
        <div className='flex-grow-0'>
          <Globe2Icon className='size-8' /> {/* Journee Icon */}
          Hi {username.toUpperCase()}
        </div>
        <div className='flex-grow-1' />
        <div className='flex'>
          <button className='border-black border rounded-full p-1 hover:bg-black/10 mr-2' onClick={() => {setProfileMenu(false); showMenu(!menu)}}>
            <MenuIcon />
          </button>
          <button className='border-black border rounded-full p-1 hover:bg-black/10' onClick={() => {showMenu(false) ; setProfileMenu(!showProfileMenu)}}>
            <User />
          </button>
        </div>
      </div>
      {
        menu ?
          <div className='bg-white/65 shadow-lg  min-w-48  mt-1 pb-0 mr-10'>
            <MenuButton icon={<HomeIcon className='mr-1' />} buttonTitle='Home' onClick={(_) => handleNavClick("/home", showMenu)} />
            <MenuButton icon={<PlaneIcon className='mr-1' />} buttonTitle='Plan' onClick={(_) => handleNavClick("/plan", showMenu)} />
            <MenuButton icon={<ListIcon className='mr-1' />} buttonTitle='Itineraries' onClick={(_) => handleNavClick("/itineraries", showMenu)} />
          </div>
          : 
          <></>
      }
      {
        showProfileMenu ?
          isLoggedIn ?
            <div className='bg-white/65 shadow-lg  min-w-48  mt-1 pb-0'>
              <MenuButton icon={<User2 className='mr-1' />} buttonTitle={username!} onClick={(_) => handleNavClick(`/user/${username}`, setProfileMenu)} />
              <MenuButton icon={<SettingsIcon className='mr-1' />} buttonTitle='Settings' onClick={(_) => handleNavClick(`/user/${username}/settings`, setProfileMenu)} />
              <MenuButton icon={<LogOutIcon className='mr-1' />} buttonTitle='Log Out' onClick={(_) => handleNavClick(`/user/${username}/logout`, setProfileMenu)} />
            </div>
            : 
            <div className='bg-white/65 shadow-lg  min-w-48  mt-1 pb-0'>
              <MenuButton icon={<LogIn className='mr-1' />} buttonTitle={"Log In or Sign Up"} onClick={(_) => handleNavClick("/auth", setProfileMenu)} />
            </div>
        : <></>
      }
    </div>
  )
}

export default Navbar