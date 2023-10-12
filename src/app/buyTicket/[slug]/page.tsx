"use client";
import React, { useState, useContext, useEffect } from 'react';
import Image from 'next/image'
import { GenericContext } from '@/app/components/myContext';
import { useRouter } from 'next/navigation'
import { Expedition } from '../../../../classes/Expedition';
import Header from '@/app/components/header';
import { useUser } from '../../../../services/useUsers';
import { warningToaster } from '../../../../services/useToaster';
import { ToastContainer } from 'react-toastify';
import Payment from '@/app/components/payment';



export default function buyTicket({ params }: { params: { slug: string } }) {

    const { userInfo, isLoading, error } = useUser();


    const [result, setResult] = useState<Expedition[]>([])
    const [selectedTicketCount, setSelectedTicketCount] = useState(0)

    const [isModalOpen, setModalOpen] = useState(true);
    const [price, setPrice] = useState(0);

    //Ödeme penceresini açıp kapatıyorum
    const openModal = () => {

        const loggedIn = localStorage.getItem("userToken");

        loggedIn == "" ? warningToaster("Devam Edebilmek için Giriş Yapmalısınız") :
        selectedTicketCount == 0 ? warningToaster("Önce Koltuk Seçimi Yapın...") :
        setModalOpen(false);
        let elPrice = document.getElementById("priceText") as HTMLParagraphElement;
        setPrice(parseInt(elPrice.innerText))
      };
    

    //Koltuk renkleri için değişkenlerim
    const emptySeat = "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-xs lg:text-sm px-5 py-2.5 text-center mr-2 mb-2 w-2 h-6 md:w-2 md:h-6 lg:w-5 lg:h-8 xl:w-12 xl:h-10 justify-center items-start transition-all duration-500 ease-in-out"
    const fullSeatWomen = " text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-green-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-xs lg:text-sm px-5 py-2.5 text-center mr-2 mb-2 w-2 h-6 md:w-2 md:h-6 lg:w-5 lg:h-8 xl:w-12 xl:h-10 justify-center items-start transition-all duration-500 ease-in-out"
    const fullSeatMen = " text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-green-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-xs lg:text-sm px-5 py-2.5 text-center mr-2 mb-2 w-2 h-6 md:w-2 md:h-6 lg:w-5 lg:h-8 xl:w-12 xl:h-10 justify-center items-start transition-all duration-500 ease-in-out"
    
    const selectedSeat = " text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-green-800 shadow-lg shadow-yellow-500/50 dark:shadow-lg dark:shadow-yellow-800/80 font-medium rounded-lg text-xs lg:text-sm px-5 py-2.5 text-center mr-2 mb-2 w-2 h-6 md:w-2 md:h-6 lg:w-5 lg:h-8 xl:w-12 xl:h-10 justify-center items-start transition-all duration-500 ease-in-out"

    //API den gelen data yı karşılıyorum
    let expeditionInfo : Expedition[] = [];
    expeditionInfo = useContext(GenericContext)

    //Sayfa ilk açıldığında boş koltukları belirlediğim fonksiyon
    const handleSeatingArrangement = async (data: Expedition[]) => {

        data.forEach(element => {
            for (let index = 0; index < element.boskoltuknumaralari.length; index++) {
                const koltukId = element.boskoltuknumaralari[index];
                console.log(koltukId)
                const elSeat = document.getElementById(koltukId) as HTMLButtonElement;
                console.log(koltukId)
                 elSeat.className = emptySeat;
                 elSeat.disabled = false;
            }
        });
    }

    //Seçilen boş koltukların renklerini sarı yapıyorum ve seçilikoltuk sayısını artırıyorum.
    const selectTicket = async (id: string) => {
        const elSeat = document.getElementById(id) as HTMLButtonElement;

       

        if (elSeat.className == fullSeatMen || elSeat.className == fullSeatWomen ) {
            warningToaster("Bu koltuk dolu!")
        }else{
            if (elSeat.className == emptySeat) {
                if(selectedTicketCount == 5){
                    warningToaster("Maksimum 5 koltuk alınabilir.")
                }else{
                    if ( parseInt(id) % 2 == 0) {
                        const elNextSeat = document.getElementById( (parseInt(id, 10) - 1).toString().padStart(2, '0') ) as HTMLButtonElement;
                        if (elNextSeat.className == fullSeatMen && userInfo?.gender == "Erkek") {
                                 elSeat.className = selectedSeat;
                                setSelectedTicketCount(selectedTicketCount + 1);
                        }
                        if (elNextSeat.className == fullSeatWomen && userInfo?.gender == "Kadın") {
                            elSeat.className = selectedSeat;
                           setSelectedTicketCount(selectedTicketCount + 1);
                        }
                        if (elNextSeat.className == emptySeat) {
                            elSeat.className = selectedSeat;
                           setSelectedTicketCount(selectedTicketCount + 1);
                        }
                        if (elNextSeat.className == selectedSeat) {
                            elSeat.className = selectedSeat;
                           setSelectedTicketCount(selectedTicketCount + 1);
                        }
                        if (elNextSeat.className == fullSeatWomen && userInfo?.gender == "Erkek") {
                            warningToaster("Bu koltuk cinsiyetiniz sebebiyle alınamaz.")
                        }
                        if (elNextSeat.className == fullSeatMen && userInfo?.gender == "Kadın") {
                            warningToaster("Bu koltuk cinsiyetiniz sebebiyle alınamaz.")
                        }
            
                    }else{
                        const elNextSeat = document.getElementById( (parseInt(id, 10) + 1).toString().padStart(2, '0') ) as HTMLButtonElement;
                        if (elNextSeat.className == fullSeatMen && userInfo?.gender == "Erkek") {
                                 elSeat.className = selectedSeat;
                                setSelectedTicketCount(selectedTicketCount + 1);
                        }
                        if (elNextSeat.className == fullSeatWomen && userInfo?.gender == "Kadın") {
                            elSeat.className = selectedSeat;
                           setSelectedTicketCount(selectedTicketCount + 1);
                        }
                        if (elNextSeat.className == emptySeat) {
                            elSeat.className = selectedSeat;
                           setSelectedTicketCount(selectedTicketCount + 1);
                        }
                        if (elNextSeat.className == selectedSeat) {
                            elSeat.className = selectedSeat;
                           setSelectedTicketCount(selectedTicketCount + 1);
                        }
                        if (elNextSeat.className == fullSeatWomen && userInfo?.gender == "Erkek") {
                            warningToaster("Bu koltuk cinsiyetiniz sebebiyle alınamaz.")
                        }
                        if (elNextSeat.className == fullSeatMen && userInfo?.gender == "Kadın") {
                            warningToaster("Bu koltuk cinsiyetiniz sebebiyle alınamaz.")
                        }
                    }
                }
            }else{
                if ( parseInt(id) % 2 == 0) {
                    const elNextSeat = document.getElementById( (parseInt(id, 10) - 1).toString().padStart(2, '0') ) as HTMLButtonElement;
                    if (elNextSeat.className == fullSeatMen && userInfo?.gender == "Erkek") {
                        elSeat.className = emptySeat;
                        setSelectedTicketCount(selectedTicketCount - 1);
                    }
                    if (elNextSeat.className == fullSeatWomen && userInfo?.gender == "Kadın") {
                        elSeat.className = emptySeat;
                        setSelectedTicketCount(selectedTicketCount - 1);
                    }
                    if (elNextSeat.className == emptySeat) {
                        elSeat.className = emptySeat;
                       setSelectedTicketCount(selectedTicketCount - 1);
                    }
                    if (elNextSeat.className == selectedSeat) {
                        elSeat.className = emptySeat;
                       setSelectedTicketCount(selectedTicketCount - 1);
                    }
                    if (elNextSeat.className == fullSeatWomen && userInfo?.gender == "Erkek") {
                        warningToaster("Bu koltuk cinsiyetiniz sebebiyle alınamaz.")
                    }
                    if (elNextSeat.className == fullSeatMen && userInfo?.gender == "Kadın") {
                        warningToaster("Bu koltuk cinsiyetiniz sebebiyle alınamaz.")
                    }
        
                }else{
                    const elNextSeat = document.getElementById( (parseInt(id, 10) + 1).toString().padStart(2, '0') ) as HTMLButtonElement;
                    if (elNextSeat.className == fullSeatMen && userInfo?.gender == "Erkek") {
                        elSeat.className = emptySeat;
                        setSelectedTicketCount(selectedTicketCount - 1);
                    }
                    if (elNextSeat.className == fullSeatWomen && userInfo?.gender == "Kadın") {
                        elSeat.className = emptySeat;
                        setSelectedTicketCount(selectedTicketCount - 1);
                    }
                    if (elNextSeat.className == emptySeat) {
                        elSeat.className = emptySeat;
                       setSelectedTicketCount(selectedTicketCount - 1);
                    }
                    if (elNextSeat.className == selectedSeat) {
                        elSeat.className = emptySeat;
                       setSelectedTicketCount(selectedTicketCount - 1);
                    }
                    if (elNextSeat.className == fullSeatWomen && userInfo?.gender == "Erkek") {
                        warningToaster("Bu koltuk cinsiyetiniz sebebiyle alınamaz.")
                    }
                    if (elNextSeat.className == fullSeatMen && userInfo?.gender == "Kadın") {
                        warningToaster("Bu koltuk cinsiyetiniz sebebiyle alınamaz.")
                    }
                }
               
            }
        }
       
    }

    useEffect(() => {
        let unsubscribed = false;
    
        const filteredExpeditions = expeditionInfo.filter((expedition) => {
          return expedition.id == parseInt(params.slug);
        });
    
      if (!unsubscribed) {
        setResult(filteredExpeditions)
        handleSeatingArrangement(filteredExpeditions);
        console.log(filteredExpeditions)
      }
    
      return () => {
        unsubscribed = true;
      };
      }, [params,expeditionInfo]);

  return (
    <main className=" w-screen h-screen flex flex-col p-5">
        <Header />
        <div className=' relative p-12 mb-5'>
       
             <div className='flex flex-row items-center justify-center'>
             
                <div className=' border border-spacing-1 border-black w-fit h-64 lg:h-80 p-6 rounded-md mt-24 flex items-end justify-end ml-60 lg:ml-10 transition-all duration-500 ease-in-out'>
                     <div>
                          <button className={fullSeatMen}>
                          <svg className=' w-4 h-4' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><style></style><path d="M337.8 205.7l48.6-42.5c13.8 19.3 23.4 41.9 27.4 66.2l-64.4 4.3c-2.4-10.1-6.4-19.5-11.6-28zm140.1 19.5c-5.3-38.8-20.6-74.5-43.2-104.3l.8-.7C449 108.4 449.7 87.6 437 75s-33.4-12-45.2 1.5l-.7 .8c-29.8-22.6-65.5-37.9-104.3-43.2l.1-1.1c1.2-17.9-13-33-30.9-33s-32.1 15.2-30.9 33l.1 1.1c-38.8 5.3-74.5 20.6-104.3 43.2l-.7-.8C108.4 63 87.6 62.3 75 75s-12 33.4 1.5 45.2l.8 .7c-22.6 29.8-37.9 65.5-43.2 104.3l-1.1-.1c-17.9-1.2-33 13-33 30.9s15.2 32.1 33 30.9l1.1-.1c5.3 38.8 20.6 74.5 43.2 104.3l-.8 .7C63 403.6 62.3 424.4 75 437s33.4 12 45.2-1.5l.7-.8c29.8 22.6 65.5 37.9 104.3 43.2l-.1 1.1c-1.2 17.9 13 33 30.9 33s32.1-15.2 30.9-33l-.1-1.1c38.8-5.3 74.5-20.6 104.3-43.2l.7 .8c11.8 13.5 32.5 14.2 45.2 1.5s12-33.4-1.5-45.2l-.8-.7c22.6-29.8 37.9-65.5 43.2-104.3l1.1 .1c17.9 1.2 33-13 33-30.9s-15.2-32.1-33-30.9l-1.1 .1zM163.2 125.6c19.3-13.8 41.9-23.4 66.2-27.5l4.3 64.4c-10 2.4-19.5 6.4-28 11.6l-42.5-48.6zm-65 103.8c4.1-24.4 13.7-46.9 27.5-66.2l48.6 42.5c-5.3 8.5-9.2 18-11.6 28l-64.4-4.3zm27.5 119.4c-13.8-19.3-23.4-41.9-27.5-66.2l64.4-4.3c2.4 10 6.4 19.5 11.6 28l-48.6 42.5zm103.8 65c-24.4-4.1-46.9-13.7-66.2-27.4l42.5-48.6c8.5 5.3 18 9.2 28 11.6l-4.3 64.4zm119.4-27.4c-19.3 13.8-41.9 23.4-66.2 27.4l-4.3-64.4c10-2.4 19.5-6.4 28-11.6l42.5 48.6zm65-103.8c-4.1 24.4-13.7 46.9-27.4 66.2l-48.6-42.5c5.3-8.5 9.2-18 11.6-28l64.4 4.3zm-65-156.9l-42.5 48.6c-8.5-5.3-18-9.2-28-11.6l4.3-64.4c24.4 4.1 46.9 13.7 66.2 27.5zM256 224a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
                          </button>
                     </div>
                </div>
                <div className=' border border-spacing-1 border-black w-fit p-6 rounded-md mt-24 ml-10'>

                <div className=' flex flex-row'>
                    <button id='01' onClick={() => selectTicket("01")} className={fullSeatWomen}>01</button>
                    <button id='05' onClick={() => selectTicket("05")} className={fullSeatWomen}>05</button>
                    <button id='09' onClick={() => selectTicket("09")} className={fullSeatMen}>09</button>
                    <button id='13' onClick={() => selectTicket("13")} className={fullSeatMen}>13</button>
                    <button id='17' onClick={() => selectTicket("17")} className={fullSeatWomen}>17</button>
                    <button id='21' onClick={() => selectTicket("21")} className={fullSeatMen}>21</button>
                    <button id='25' onClick={() => selectTicket("25")} className={fullSeatMen}>25</button>
                    <button id='29' onClick={() => selectTicket("29")} className={fullSeatWomen}>29</button>
                </div>
                <div className=' flex flex-row'>
                    <button id='02' onClick={() => selectTicket("02")} className={fullSeatWomen}>02</button>
                    <button id='06' onClick={() => selectTicket("06")} className={fullSeatMen}>06</button>
                    <button id='10' onClick={() => selectTicket("10")} className={fullSeatMen}>10</button>
                    <button id='14' onClick={() => selectTicket("14")} className={fullSeatMen}>14</button>
                    <button id='18' onClick={() => selectTicket("18")} className={fullSeatMen}>18</button>
                    <button id='22' onClick={() => selectTicket("22")} className={fullSeatMen}>22</button>
                    <button id='26' onClick={() => selectTicket("26")} className={fullSeatWomen}>26</button>
                    <button id='30' onClick={() => selectTicket("30")} className={fullSeatWomen}>30</button>
                </div>
                <div className=' justify-center items-center flex'>
                    <p className=' mt-5'>Koridor</p>
                </div>
                <div className=' flex flex-row mt-10'>
                    <button id='03' onClick={() => selectTicket("03")} className={fullSeatMen}>03</button>
                    <button id='07' onClick={() => selectTicket("07")} className={fullSeatMen}>07</button>
                    <button id='11' onClick={() => selectTicket("11")} className={fullSeatMen}>11</button>
                    <button id='15' onClick={() => selectTicket("15")} className={fullSeatMen}>15</button>
                    <button id='19' onClick={() => selectTicket("19")} className={fullSeatMen}>19</button>
                    <button id='23' onClick={() => selectTicket("23")} className={fullSeatWomen}>23</button>
                    <button id='27' onClick={() => selectTicket("27")} className={fullSeatMen}>27</button>
                    <button id='31' onClick={() => selectTicket("31")} className={fullSeatWomen}>31</button>
                </div>
                <div className=' flex flex-row'>
                    <button id='04' onClick={() => selectTicket("04")} className={fullSeatMen}>04</button>
                    <button id='08' onClick={() => selectTicket("08")} className={fullSeatWomen}>08</button>
                    <button id='12' onClick={() => selectTicket("12")} className={fullSeatMen}>12</button>
                    <button id='16' onClick={() => selectTicket("16")} className={fullSeatWomen}>16</button>
                    <button id='20' onClick={() => selectTicket("20")} className={fullSeatMen}>20</button>
                    <button id='24' onClick={() => selectTicket("24")} className={fullSeatMen}>24</button>
                    <button id='28' onClick={() => selectTicket("28")} className={fullSeatMen}>28</button>
                    <button id='32' onClick={() => selectTicket("32")} className={fullSeatMen}>32</button>
                </div>
                </div>
                <div className=' flex-col ml-5 mt-20'>
                <div>
                 <button className={fullSeatMen}></button>
                 <p className=' text-xs'>*Erkek Dolu</p>
                </div>
                <div>
                <button className={fullSeatWomen}></button>
                 <p className=' text-xs'>*Kadın Dolu</p>
                </div>
                <div>
                <button className={emptySeat}></button>
                 <p className=' text-xs'>*Boş Koltuk</p>
                </div>
                <div>
                <button className={selectedSeat}></button>
                 <p className=' text-xs'>*Seçilen Koltuk</p>
                </div>
             </div>
             </div>
             
        </div>
        {result.map((item, index) => (
            <div key={index} className=' h-full bg-slate-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100 shadow-lg flex flex-col items-center justify-center p-10'>
                <div  className='flex flex-col lg:flex-row' >
                    <div className='flex flex-row ml-3'>
                         <p className=' font-semibold'>Başlangıç Yeri:</p>
                         <p>{item.baslangic}</p>
                    </div>
             
                     <div className='flex flex-row ml-3'>
                     <p className=' font-semibold'>Varış Yeri:</p>
                     <p>{item.varis}</p>
                     </div>

                     <div className='flex flex-row ml-3'>
                     <p className=' font-semibold'>Tarih:</p>
                     <p>{item.tarih}</p>
                     </div>

                     <div className='flex flex-row ml-3'>
                     <p className=' font-semibold'>Seçilen Bilet Sayısı:</p>
                     <p>{selectedTicketCount}</p>
                     </div>

                     <div className='flex flex-row ml-3'>
                     <p className=' font-semibold'>Toplam Tutar:</p>
                     <p id='priceText' >{selectedTicketCount * item.fiyat} ₺</p>
                     </div>
                 </div>
                 <button  onClick={openModal} className='text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-2' >Devam Et</button>
            </div>
           
             ))}
             <Payment isOpen={isModalOpen} price={price} />
        <ToastContainer />
    </main>
  )
}
