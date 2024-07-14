import { formatDate } from '@angular/common';
export class AmdDomesticBuxaite {
  id: number;
  SampleId: string;
  AnalyzedBy: string;
  Tha: string;
  Mha: string;
  Rs: string;
  Moisture: string;
  GhRatio:string;
  SizeLess150: string;
  Size125: string;
  Size100 : string;
  Action: string
  constructor(amddomesticbuxaite: AmdDomesticBuxaite) {
    {
     this.id = amddomesticbuxaite.id || this.getRandomID();
      this.SampleId = amddomesticbuxaite.SampleId || '';
      this.AnalyzedBy = amddomesticbuxaite.AnalyzedBy || '';
      this.Tha = amddomesticbuxaite.Tha || '';
      this.Mha = amddomesticbuxaite.Mha || '';
      this.Rs = amddomesticbuxaite.Rs || '';
      this.Moisture = amddomesticbuxaite.Moisture || '';
      this.GhRatio = amddomesticbuxaite.GhRatio|| '';
      this.SizeLess150 = amddomesticbuxaite.SizeLess150 || '';
      this.Size125 = amddomesticbuxaite.Size125 || '';
      this.Size100 = amddomesticbuxaite.Size100 || '';
      this.Action = amddomesticbuxaite.Action || '';

    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
