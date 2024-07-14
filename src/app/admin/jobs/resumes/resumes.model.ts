import { formatDate } from '@angular/common';
export class Resumes {
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
  constructor(resumes: Resumes) {
    {
     this.id = resumes.id || this.getRandomID();
      this.POnumber = resumes.POnumber || '';
      this.rawMaterialType = resumes.rawMaterialType || '';
      this.SampleCollentionDT = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.SourceOfOrigin = resumes.SourceOfOrigin || '';
      this.Quantity = resumes.Quantity || '';
      this.RakeVechile = resumes.RakeVechile || '';
      this.ReceivedTD = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.RakeID = resumes.RakeID || '';
      this.SampleCollectorName = resumes.SampleCollectorName || '';
      this.bagId = resumes.bagId || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
