<<<<<<< HEAD


## Getting Started

1-İlk olarak,dosyayı .rar dan çıkartalım ve çıkarılan dosyayı Vs Code aracılığıyla açalım ve bir terminal açıp "cd find-ticket" komutunu girelim ardından development server'ı aşağıdaki kodlardan biri ile (tercihen npm run dev) çalıştıralım:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Bu proje: 
   "@headlessui/react": "^1.7.17",
    "@heroicons/react": "^2.0.18",
    "@types/node": "20.8.3",
    "@types/react": "18.2.25",
    "@types/react-dom": "18.2.11",
    "autoprefixer": "10.4.16",
    "eslint": "8.51.0",
    "eslint-config-next": "13.5.4",
    "formik": "^2.4.5",
    "next": "13.5.4",
    "postcss": "8.4.31",
    "react": "18.2.0",
    "react-datepicker": "^4.19.0",
    "react-dom": "18.2.0",
    "react-select": "^5.7.7",
    "react-toastify": "^9.1.3",
    "tailwindcss": "3.3.3",
    "typescript": "5.2.2"

    Kütüphanelerini kullanmaktadır. Ayrıca Custom Hook lar aracılığı ile kod tekrarından, Context API ile sürekli API isteği yapmaktan ve Prop bu bilgilerin aktarılmasından kaçınmaya çalıştım. Typescript ile dataların güvenli kullanılmasına çaba gösterdim. useToaster ile uyarı mesajlarını tek bir yerden yönetmeye çalıştım.



2-Ardından,[http://localhost:3000](http://localhost:3000) bir browser aracılığıyla bu url'i açalım.


Ana Sayfada Seçimlerimizi yapıp Sefer Bul butonuna tıkladıktan sonra sayfanın alt kısmında eğer sefer varsa sonuçlar listelenecektir eğer sefer yoksa animasyon devam edecektir. Arama yapılabilmesi için sisteme giriş yapılması gerekmektedir.

*Bir veritabanı kullanmamam sebeiyle kayıt olma esnasında post işlemi başarı ile tamamlansa dahi bu yeni kullanıcının bilgisini saklamıyorum, bu sebeple statik olarak var olan kullanıcı bilgilerini aşağıda belirtiyorum.

Giriş Bilgileri:
    id: "1",
    username: "lojiper",
    password: "123",
    email:"",
    age: "",
    gender: "Erkek",
    birthday: ""

Giriş yaptıktan sonra, localstorage da userToken isimli bir değer oluşturuyorum ve çıkış yapılmadıkça veya yanlış kullanıcı adı ve şifre ile giriş tekrar denenmedikçe bu veri sayesinde kullanıcının tekrar giriş yapmasına gerek kalmayacaktır.Sefer bul butonu giriş yapıldıktan sonra çalışır duruma gelecektir. Burada günümüzden daha eski bir tarih seçilmesi engellenmiştir bilginize. Uygun bir seçim yapılmasının ardından listelenen seferlerden birindeki "incele" butonuna tıklanarak, koltuk seçimi yapılacak ekrana yönlendirileceksiniz. Bu ekranda koltuk renklerinin ne anlama geldiği sayfa üzerinde belirtilmiştir. Uygun koltuklar seçilerek devam butonuna tıklanır ve ödeme yapma penceresi açılır. Ödeme yapma penceresindeki form doğru bir şekilde doldurulduktan sonra öde butonuna tıklanır ve işlemin bitmesi beklenir. 



*Formları doldururken gerekli kuralların yerine getirilmesi gerekmektedir, eğer doğru şekilde doldurulmazsa uyarı mesajları yönlendirecektir.

*Sefer ve kullanıcı bilgileri src/app/api yolunun altındaki klasörlerde tutulmaktadır.

*Sefer Bilgileri:
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

3-Tasarım, Uygulamada genel itibariyle Tailwind CSS kullanmayı tercih ettim, elimden geldikçe responsive bir tasarım elde etmeye çalıştım. Uygulamada kullandığım tek image'ı figma üzerinden aldım.

            İyi çalışmalar dilerim.

            Umut AKKIRAN
            https://github.com/umutakkiran
            https://www.linkedin.com/in/umut-akk%C4%B1ran-2164b6287/
=======
# Bus-Ticket-Booking-Web-App
>>>>>>> 528f8ef8104712e0c63a6f528582290dc76bcaa6
