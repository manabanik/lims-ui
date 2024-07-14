import { formatDate } from '@angular/common';
export class OrderList {
  id: number;
  POnumber: string;
  rawMaterialType: string;
  SourceOfOrigin: string;
  Quantity: string;
  RakeVechile: string;
  ReceivedTD: string;
  RakeID:string;
  SampleCollectorName: string;
  SampleCollentionDT: string;
  bagId : string
  constructor(orderList: OrderList) {
    {
      this.id = orderList.id || this.getRandomID();
      this.POnumber = orderList.POnumber || '';
      this.rawMaterialType = orderList.rawMaterialType || '';
      this.SampleCollentionDT = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.SourceOfOrigin = orderList.SourceOfOrigin || '';
      this.Quantity = orderList.Quantity || '';
      this.RakeVechile = orderList.RakeVechile || '';
      this.ReceivedTD = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.RakeID = orderList.RakeID || '';
      this.SampleCollectorName = orderList.SampleCollectorName || '';
      this.bagId = orderList.bagId || '';
      
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
