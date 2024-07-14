import { formatDate } from '@angular/common';
export class DomesticBuxaite {
  id: number;
  type : string;
  bagId : string;
  sampleId: string;
  analysisDT: string;
  analyzedBy: string;
  isEditing?: boolean;
  
  constructor(domesticBuxaite: DomesticBuxaite) {
    {
      this.id = domesticBuxaite.id || this.getRandomID();
      this.type = domesticBuxaite.type || '';
      this.bagId = domesticBuxaite.bagId || '';
      this.sampleId = domesticBuxaite.sampleId || '';
      this.analysisDT = domesticBuxaite.analysisDT || '';
      this.analyzedBy = domesticBuxaite.analyzedBy || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
