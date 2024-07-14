import { formatDate } from '@angular/common';
export class BagCreationList {
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
  constructor(jobsList: BagCreationList) {
    {
      this.id = jobsList.id || this.getRandomID();
      this.POnumber = jobsList.POnumber || '';
      this.rawMaterialType = jobsList.rawMaterialType || '';
      this.SampleCollentionDT = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.SourceOfOrigin = jobsList.SourceOfOrigin || '';
      this.Quantity = jobsList.Quantity || '';
      this.RakeVechile = jobsList.RakeVechile || '';
      this.ReceivedTD = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.RakeID = jobsList.RakeID || '';
      this.SampleCollectorName = jobsList.SampleCollectorName || '';
      this.bagId = jobsList.bagId || '';
      
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
