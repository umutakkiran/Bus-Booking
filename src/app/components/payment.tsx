"use client";
import React, { useEffect, useState, } from 'react';
import { useRouter } from 'next/navigation'
import { successToaster } from '../../../services/useToaster';
import { ToastContainer } from 'react-toastify';

interface SearchResultProps {
  isOpen: boolean
  price: number
}

export default function Payment(props: SearchResultProps) {

  const [spinnerHidden, setSpinnerHidden] = useState(' hidden');
  const [successButton, setSuccessButton] = useState(' hidden');

  const [hidden, setHidden] = useState(props.isOpen)


  const router = useRouter()


  const closeModal = async () => {
    setHidden(true);
  }

  const handlePayment = (event : any) => {
        event.preventDefault();
        setSpinnerHidden(' absolute top-0 left-0 bg-white w-full h-full flex justify-center items-center');

        setTimeout(() => {
        setSuccessButton('absolute bottom-40 w-2/3 h-12 flex justify-center items-center text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2')
        successToaster('Ödeme Başarılı');
      }, 1200);
  }

  const handleRedirect = () => {
      router.push('/');
  }

  useEffect(() => {
    let unsubscribed = false;

   

  if (!unsubscribed && props.price > 0) {
    setHidden(props.isOpen)
  }

  return () => {
    unsubscribed = true;
  };
  }, [props.price]);

  return (
    <div hidden={hidden}  className=' fixed top-0 left-0 w-screen h-screen bg-transparent transition-all duration-500 ease-in-out'>
      <div  className=' fixed right-0 w-96 h-screen bg-slate-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100 shadow-lg'>

        <form onSubmit={handlePayment} >
          <button onClick={closeModal}  className='absolute left-5 top-10 z-50 h-8 w-8'>
            <svg  className=' w-6 h-6' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>
          </button>
           <div className=" pb-12 p-12">
             <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
               <div className="sm:col-span-3">
                 <label htmlFor="card-number" className="block text-sm font-medium leading-6 text-gray-900">Kart Numarası:</label>
                 <div className="mt-2">
                   <input required type="text" minLength={16} maxLength={16} name="card-number" id="card-number" autoComplete="card-number" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"/>
                 </div>
               </div>
             </div>
             <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
               <div className="sm:col-span-3">
                 <label htmlFor="user-name" className="block text-sm font-medium leading-6 text-gray-900">Kart Sahibinin Adı ve Soyadı:</label>
                 <div className="mt-2">
                   <input required type="text" name="user-name" id="user-name" autoComplete="given-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"/>
                 </div>
               </div>
             </div>
             <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
               <div className="sm:col-span-3">
                 <label htmlFor="expire-date" className="block text-sm font-medium leading-6 text-gray-900">Son Kullanma Tarihi:</label>
                 <div className="mt-2">
                   <input required type="date" name="expire-date" id="expire-date" autoComplete="number" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"/>
                 </div>
               </div>
               <div className="sm:col-span-3">
                 <label htmlFor="security-number" className="block text-sm font-medium leading-6 text-gray-900">CVV:</label>
                 <div className="mt-2">
                   <input required maxLength={3} type="tel" name="security-number" id="security-number" autoComplete="number" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"/>
                 </div>
               </div>
             </div>
              <button type="submit" className=' mt-10 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'>
                {props.price}₺ Öde ve Biletini Al
              </button>
           </div>
        </form>
            <div  className={spinnerHidden}>
               <div  className=' mt-5 border-b-2 border-black w-24'>
                <svg className=' w-12 h-12 animate-bounce' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M64 104v88h96V96H72c-4.4 0-8 3.6-8 8zm482 88L465.1 96H384v96H546zm-226 0V96H224v96h96zM592 384H576c0 53-43 96-96 96s-96-43-96-96H256c0 53-43 96-96 96s-96-43-96-96H48c-26.5 0-48-21.5-48-48V104C0 64.2 32.2 32 72 32H192 352 465.1c18.9 0 36.8 8.3 49 22.8L625 186.5c9.7 11.5 15 26.1 15 41.2V336c0 26.5-21.5 48-48 48zm-64 0a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM160 432a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>
               </div>
               <button onClick={handleRedirect} className={successButton} >Ana Sayfaya Dön</button>
            </div>
    </div>
    <ToastContainer className=" z-10" />
    </div>
    
  )
}
