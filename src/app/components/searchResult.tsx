"use client";
import React, { useState, useContext, useEffect } from 'react';
import Image from 'next/image'
import { GenericContext } from './myContext';
import { Expedition } from "../../../classes/Expedition";
import { useCheckLoggedIn } from '../../../services/useCheckLoggedIn';
import { useRouter } from 'next/navigation'
import { warningToaster } from '../../../services/useToaster';


interface SearchResultProps {
  result: {
    starting: string;
    destination: string;
    date:string;
  }
}

export default function SearchResult(props: SearchResultProps) {

  const {loggedIn} = useCheckLoggedIn();
  const [result, setResult] = useState<Expedition[]>([])


  let expeditionInfo : Expedition[] = [];
  expeditionInfo = useContext(GenericContext)
  const router = useRouter()

  
  useEffect(() => {
    let unsubscribed = false;

    const filteredExpeditions = expeditionInfo.filter((expedition) => {
      return expedition.baslangic === props.result.starting && expedition.varis === props.result.destination && expedition.tarih === props.result.date;
    });

  if (!unsubscribed) {
    setResult(filteredExpeditions)
    console.log(filteredExpeditions)
  }

  return () => {
    unsubscribed = true;
  };
  }, [props]);

  return (
    <main className=" flex items-start justify-center min-h-full h-fit bg-slate-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100 shadow-lg">
       <ul role="list" className="divide-y divide-gray-100 w-full flex flex-col items-center justify-center">
        {
        loggedIn ? (
          result.length > 0 ? (
            result.map((item, index) => (
              <li key={index} className="flex justify-between gap-x-6 py-5 w-full p-6">
                <div className=' bg-white w-full h-fit rounded-lg shadow-lg'>
                  <div className="flex flex-col min-w-0 gap-x-4 p-10">
                     <div className="min-w-0 flex-auto">
                       <p className="text-sm font-semibold leading-6 text-gray-900">Başlangıç Yeri:{item.baslangic}</p>
                       <p className="text-sm font-semibold leading-6 text-gray-900">Varış Yeri:{item.varis}</p>
                       <p className="text-sm font-semibold leading-6 text-gray-500">Tarih:{item.tarih}</p>
                       <p className="text-sm font-semibold leading-6 text-gray-500">Saat:{item.saat}</p>
                     </div>
                     <div className="sm:flex sm:flex-col sm:items-end">
                       <p className="text-sm font-semibold leading-6 text-gray-500">Fiyat:{item.fiyat}</p>
                       <p className="text-sm font-semibold leading-6 text-gray-500">Boş Koltuk Sayısı:{item.boskoltuksayisi}</p>
                     </div>
                     <button onClick={() => router.push('/buyTicket/' + `${item.id}`)} className='text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-3' >İncele</button>
                  </div>
                </div>
            </li>

          ))) : (
              <div className=' mt-5 border-b-2 border-black'>
                <svg className=' w-12 h-12 animate-bounce' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M64 104v88h96V96H72c-4.4 0-8 3.6-8 8zm482 88L465.1 96H384v96H546zm-226 0V96H224v96h96zM592 384H576c0 53-43 96-96 96s-96-43-96-96H256c0 53-43 96-96 96s-96-43-96-96H48c-26.5 0-48-21.5-48-48V104C0 64.2 32.2 32 72 32H192 352 465.1c18.9 0 36.8 8.3 49 22.8L625 186.5c9.7 11.5 15 26.1 15 41.2V336c0 26.5-21.5 48-48 48zm-64 0a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM160 432a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>
              </div>
        )
        ) : (
          <li className="flex justify-between gap-x-6 py-5">
           <a onClick={() => router.push("/login")} className=' hover:cursor-pointer' >Sonuçları Görebilmek İçin Giriş Yapın...</a>
         </li>
        )
        }
      </ul>
    </main>
  )
}
