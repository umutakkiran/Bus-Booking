"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SearchResult from './components/searchResult';
import Header from './components/header';
import { useCheckLoggedIn } from '../../services/useCheckLoggedIn';
import Select from 'react-select';
import { ToastContainer } from 'react-toastify';
import { warningToaster } from '../../services/useToaster';

export default function Home() {

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStarting, setSelectedStarting] = useState({value:"",label:"Başlangıç Yeri Seç"});
  const [selectedDestination, setSelectedDestination] = useState({value:"",label:"Varış Yeri Seç"});
  const [date, setDate] = useState("");

  const [result , setResult] = useState({starting: "", destination: "", date: ""});



  const {loggedIn} = useCheckLoggedIn();

  // Deeğerlerin değişimini kontrol ettiğim yer
  const handleChangeStarting = async (selected:any) => {
    if (selectedDestination.value == selected.value) {
      warningToaster("Başlangıç ve Varış Noktaları Aynı Şehir Olamaz.");
    }else{
      setSelectedStarting(selected);
    }
  }
  const handleChangeDestination = async (selected:any) => {
    if (selectedStarting.value == selected.value) {
      warningToaster("Başlangıç ve Varış Noktaları Aynı Şehir Olamaz.");
    }else{
      setSelectedDestination(selected);
    }
  }
  const handleChangeDate = async (selected:any) => {
    setSelectedDate(selected);
    console.log(selectedDate)

    const formattedDate = formatDateToDDMMYYYY(selected);
    setDate(formattedDate);
  }

  //Tarihi formatlıyorum
   function formatDateToDDMMYYYY(date: any) {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Ay indeksi 0'dan başlar, bu nedenle +1 ekliyoruz.
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }

  const options = [
    { value: 'Ankara', label: 'Ankara' },
    { value: 'İstanbul', label: 'İstanbul' },
    { value: 'İzmir', label: 'İzmir' },
  ];

  //Arama butonu 
  const handleNotLoggedInSearchButton = async (event: any) => {
    event.preventDefault();
    warningToaster("Arama Yapabilmek İçin Önce Giriş Yapın")
  }

  const handleSearchButton = async (event : any) => {
    event.preventDefault();
    if (selectedStarting.value == "" || selectedDate == "" || selectedDestination.value == "") {
      warningToaster("Lütfen Gerekli Alanları Doldurun")
    }else{
      const assembled = {
        starting: selectedStarting.value,
        destination: selectedDestination.value,
        date: date
      }
      setResult(assembled)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      < Header />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">En Uygun Seferi Bul</h2>
      <div>
        <form  className=' flex flex-col items-center justify-between lg:flex-row'>
        <Select 
              className='w-64 mt-3 ml-3 decoration-green-400'
              options={options}
              value={selectedStarting}
              onChange={handleChangeStarting}      
              required  
            />
            <Select 
              className='w-64 ml-3 mt-3'
              options={options}
              value={selectedDestination}
              onChange={handleChangeDestination}  
              required      
            />
          <DatePicker
           className=" text-black className='w-64 mt-3 ml-3 p-3 "
           selected={selectedDate}
           dateFormat="dd/MM/yyyy"
           minDate={Date.now()}
           isClearable
           placeholderText="Tarih Seçin"
           onChange={handleChangeDate}
            />
            {loggedIn === false ? (
            < button type="submit"  onClick={handleNotLoggedInSearchButton} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2 mb-2 mt-3">Sefer Bul </button>
            ) : (
           < button type="submit" onClick={ handleSearchButton} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2 mb-2 mt-3">Sefer Bul </button>
             )}
        </form>
      </div>
      <Image alt='figma' width={300} height={150} src={"/travel.png"} className=' absolute top-1/2 left-4 -z-10' />
      
      <div className=' mt-10 rounded-md h-96 w-full'>
        <SearchResult key={Math.random()} result={result} />
      </div>
      <ToastContainer />
    </main>
  )
}
