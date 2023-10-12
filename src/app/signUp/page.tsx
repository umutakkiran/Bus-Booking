"use client";
import React, { useState } from 'react';
import { User } from '../../../classes/User';
import { useRouter } from 'next/navigation'
import { successToaster, warningToaster } from '../../../services/useToaster';
import { ToastContainer } from 'react-toastify';
import Image from 'next/image';


export default function SignUp() {

  const router = useRouter()



  const handleSignUpButton = async (event: any) => {
    event.preventDefault();

    const username = document.getElementById("user-name") as HTMLInputElement
    const email = document.getElementById("email") as HTMLInputElement
    const password = document.getElementById("password") as HTMLInputElement
    const repassword = document.getElementById("confirm-password") as HTMLInputElement
    const birthday = document.getElementById("birthday") as HTMLInputElement
    const gender = document.getElementById("gender") as HTMLSelectElement
    const age = document.getElementById("age") as HTMLInputElement

    const userInfo = new User(
        "asfasf",
        username.value,
        email.value,
        password.value,
        birthday.value,
        gender.value,
        age.value
    ) 
    
    if (repassword.value == password.value) {

      if (!userInfo) {
        console.log(userInfo)
      }else{
        const requestOptions: RequestInit = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Diğer gerektiğinde başlıkları ekleyebilirsiniz
          },
          body: JSON.stringify(userInfo),
        };
    
        try {
          const response = await fetch('/api/user', requestOptions);
          if (!response.ok) {
            throw new Error('Veri alınamadı.');
          }
          const responseData: User[] = await response.json();
          console.log(responseData)
          successToaster("Kayıt Başarılı...")
          setTimeout(() => {
          router.push('/login')
          }, 900);
        } catch (error:any) {
          console.log(error)
        }
      } 
      
    }else{
      warningToaster("Şifreler Uyuşmuyor.")
    }
  }

  return (
    <div className=' grid grid-cols-12 h-screen w-screen'>
    <form className=' col-span-9  bg-slate-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100 shadow-lg' onSubmit={handleSignUpButton} >
    <div className=" pb-12 p-12">
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="col-span-3">
          <label htmlFor="user-name" className="block text-sm font-medium leading-6 text-gray-900">Kullanıcı Adı</label>
          <div className="mt-2">
            <input required type="text" name="user-name" id="user-name" autoComplete="given-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"/>
          </div>
        </div>

        <div className="col-span-3">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email Adresi</label>
          <div className="mt-2">
            <input required id="email" name="email" type="email" autoComplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"/>
          </div>
        </div>

        <div className="col-span-3">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Şifre</label>
          <div className="mt-2">
            <input required pattern='^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$' minLength={8} type="password" name="password" id="password" autoComplete="address-level1" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"/>
          </div>
        </div>

        <div className="col-span-3">
          <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-gray-900">Şifreyi Tekrar Et</label>
          <div className="mt-2">
            <input required type="password" name="confirm-password" id="confirm-password" autoComplete="confirm-password" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"/>
          </div>
        </div>

       

        <div className="sm:col-span-2 sm:col-start-1">
          <label htmlFor="birthday" className="block text-sm font-medium leading-6 text-gray-900">Doğum Tarihi</label>
          <div className="mt-2">
            <input required type="date" name="birthday" id="birthday" autoComplete="bday" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"/>
          </div>
        </div>

       
        <div className="col-span-3">
          <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">Cinsiyet</label>
          <div className="mt-2">
            <select id="gender" name="gender" autoComplete="gender-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 p-5">
              <option>Diğer</option>
              <option>Kadın</option>
              <option>Erkek</option>
            </select>
          </div>
        </div>

        <div className="col-span-2">
          <label htmlFor="age" className="block text-sm font-medium leading-6 text-gray-900">Yaş</label>
          <div className="mt-2">
            <input required type="number" name="age" id="age" autoComplete="age" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"/>
          </div>
        </div>
      </div>
      <button type="submit"  className='text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-2'>Kaydol</button>
    </div>
    <ToastContainer />
    </form>
    <div className="col-span-3 ">
              <Image alt='figma'  width={300} height={150} src={"/notebook.png"} className='w-full h-full aspect-auto object-cover' />
          </div>
    </div>
   
   
  )
}
