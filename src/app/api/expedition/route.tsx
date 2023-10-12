import { Expedition } from "../../../../classes/Expedition";

const expeditionInfo : Expedition[] = [
    {
    id: 1,
    baslangic: "İstanbul",
    varis: "Ankara",
    tarih: "13/10/2023",
    saat: "09:00",
    fiyat: 40,
    boskoltuksayisi:5,
    boskoltuknumaralari:["03","07","12","15","17"]
},
    {
        id: 2,
        baslangic: "İstanbul",
        varis: "İzmir",
        tarih: "14/10/2023",
        saat: "10:00",
        fiyat: 50,
        boskoltuksayisi:8,
        boskoltuknumaralari:["03","04","12","11","22","25","26","29"]
    },
    {
        id: 6,
        baslangic: "İstanbul",
        varis: "İzmir",
        tarih: "14/10/2023",
        saat: "11:00",
        fiyat: 55,
        boskoltuksayisi:3,
        boskoltuknumaralari:["04","22","29"]
    },
    {
        id: 7,
        baslangic: "İstanbul",
        varis: "İzmir",
        tarih: "13/10/2023",
        saat: "13:00",
        fiyat: 45,
        boskoltuksayisi:12,
        boskoltuknumaralari:["03","04","07","12","11","15","22","25","26","29","30","31"]
    },
        {
            id: 3,
            baslangic: "Ankara",
            varis: "İstanbul",
            tarih: "13/10/2023",
            saat: "13:00",
            fiyat: 60,
            boskoltuksayisi:2,
            boskoltuknumaralari:["14","21"]
        },
        {
            id: 8,
            baslangic: "Ankara",
            varis: "İstanbul",
            tarih: "13/10/2023",
            saat: "15:00",
            fiyat: 60,
            boskoltuksayisi:5,
            boskoltuknumaralari:["14","21","11","6","19"]
        },
            {
                id: 4,
                baslangic: "Ankara",
                varis: "İzmir",
                tarih: "13/10/2023",
                saat: "09:00",
                 fiyat: 70,
                 boskoltuksayisi:1,
                 boskoltuknumaralari:["17"]
            },
            {
                id: 9,
                baslangic: "Ankara",
                varis: "İzmir",
                tarih: "13/10/2023",
                saat: "09:00",
                 fiyat: 70,
                 boskoltuksayisi:1,
                 boskoltuknumaralari:["17"]
            },
            {
                id: 10,
                baslangic: "Ankara",
                varis: "İzmir",
                tarih: "14/10/2023",
                saat: "19:00",
                 fiyat: 70,
                 boskoltuksayisi:2,
                 boskoltuknumaralari:["17","1"]
            }

]

export async function GET() {
    return new Response(JSON.stringify(expeditionInfo));
}