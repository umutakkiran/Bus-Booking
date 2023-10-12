"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { data } from 'autoprefixer';
import { useRouter } from 'next/navigation'
import { useUser } from '../../../services/useUsers';
import { User } from '../../../classes/User';
import { ToastContainer } from 'react-toastify';
import { successToaster, warningToaster } from '../../../services/useToaster';

export default function Login() {

  const [user, setUser] = useState<User>();

  const router = useRouter()

  const { userInfo, isLoading, error } = useUser();
  
 //Login işlemi sırasında bilgileri karşılaştırdığım yer
 const compareInfos = async () => {
  let text = document.getElementById("text") as HTMLInputElement;
  let password = document.getElementById("password") as HTMLInputElement;

  const values = {
    username: text.value,
    password: password.value
  }

  if (values.password == user?.password && values.username == user.username) {
    localStorage.setItem("userToken" , user.username)
    router.push('/')
    successToaster("Giriş Başarılı")
  }else{
    localStorage.setItem("userToken" , "")
    warningToaster("Kullanıcı Adı veya Şifre Hatalı!")
  }
}


  useEffect(() => {

    let unsubscribed = false;

  if (!unsubscribed) {
    setUser(userInfo)
  }

  return () => {
    unsubscribed = true;
  };
  }, [userInfo]);

 
  

  return (

      <div className=' grid grid-cols-6 '>
        <div className="flex col-span-4 min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-slate-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100 shadow-lg">
          <ToastContainer />
               <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Hoşgeldiniz</h2>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" action="#" method="POST">
                <div>
                  <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">Kullanıcı Adı</label>
                  <div className="mt-2">
                    <input id="text" name="text" type="text" autoComplete="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"/>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Şifre</label>
                    <div className="text-sm">
                      <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Şifreni mi unuttun?</a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"/>
                  </div>
                </div>

                <div>
                  <button onClick={() => compareInfos()} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                Üye değil misin?
                <a href="/signUp" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Hemen Kaydol</a>
              </p>
            </div>
          </div>
          <div className="col-span-2 ">
              <Image alt='figma'  width={300} height={150} src={"/map.png"} className='w-full h-full aspect-auto object-cover' />
          </div>
      </div>


  )
}
