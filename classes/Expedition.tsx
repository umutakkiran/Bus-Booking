export class Expedition  {
  constructor(
   public id: number,
   public  baslangic: string,
   public  varis: string,
   public  tarih: string,
   public  saat: string,
   public  fiyat: number,
   public  boskoltuksayisi: number,
   public  boskoltuknumaralari: string[]
  ){}
   
  };