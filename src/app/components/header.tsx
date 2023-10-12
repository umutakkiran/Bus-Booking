"use client";
import React, { useState } from 'react';
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCheckLoggedIn } from '../../../services/useCheckLoggedIn';
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function Header() {

  const router = useRouter()

  const {loggedIn} = useCheckLoggedIn();

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  

  const handleSignOut = async () => {
    localStorage.setItem("userToken", "");
    window.location.reload();
  }

  const handleRedirect = (data: string) => {

    switch (data) {
      case "login":
        // Yönlendirmeyi gerçekleştir
        router.push('/login')
        break;

        case "signUp":
        // Yönlendirmeyi gerçekleştir
        router.push('/signUp')
        break;
        case "home":
        // Yönlendirmeyi gerçekleştir
        router.push('/')
        break;
    
      default:
        break;
    }
    
  }


  return (
    <div className=' absolute top-0 row-auto flex items-end justify-end content-end w-screen mt-3 z-10'>
      {loggedIn === false ? (
        <div className='mr-10'>
           < button onClick={() => handleRedirect("login")} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"> Giriş Yap </button>
           < button onClick={() => handleRedirect("signUp")} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"> Kayıt Ol </button>
        </div>
      ):(
        <div className=' mr-10 flex flex-row'>
          <button onClick={() => handleRedirect("home")} className=' rounded-full w-10 p-1 bg-white flex items-center justify-center shadow-lg'>
           <svg className=' w-4 h-4' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
          </button>
         <Menu as="div" className="relative inline-block text-left">
             <div>
               <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-full bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                 Hoşgeldin, { localStorage.getItem("userToken")}
                 <ChevronDownIcon className="-mr-1 h-5 w-5 text-green-400" aria-hidden="true" />
               </Menu.Button>
             </div>

             <Transition
               enter="transition ease-out duration-100"
               enterFrom="transform opacity-0 scale-95"
               enterTo="transform opacity-100 scale-100"
               leave="transition ease-in duration-75"
               leaveFrom="transform opacity-100 scale-100"
               leaveTo="transform opacity-0 scale-95"
             >
               <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                 <div className="py-1">
                     <Menu.Item>
                       {({ active }) => (
                         <button
                           onClick={handleSignOut}
                           className={classNames(
                             active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                             'block w-full px-4 py-2 text-left text-sm'
                           )}
                         >
                           Çıkış Yap
                         </button>
                       )}
                     </Menu.Item>
                 </div>
               </Menu.Items>
             </Transition>
           </Menu>
        </div>
      )}
    </div>
  )
}
