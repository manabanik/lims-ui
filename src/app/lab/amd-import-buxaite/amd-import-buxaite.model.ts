import { formatDate } from '@angular/common';
export class AmdImportBuxaite {
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
  constructor(amdimportbuxaite: AmdImportBuxaite) {
    {
     this.id = amdimportbuxaite.id || this.getRandomID();
      this.SampleId = amdimportbuxaite.SampleId || '';
      this.AnalyzedBy = amdimportbuxaite.AnalyzedBy || '';
      this.Tha = amdimportbuxaite.Tha || '';
      this.Mha = amdimportbuxaite.Mha || '';
      this.Rs = amdimportbuxaite.Rs || '';
      this.Moisture = amdimportbuxaite.Moisture || '';
      this.GhRatio = amdimportbuxaite.GhRatio|| '';
      this.SizeLess150 = amdimportbuxaite.SizeLess150 || '';
      this.Size125 = amdimportbuxaite.Size125 || '';
      this.Size100 = amdimportbuxaite.Size100 || '';
      this.Action = amdimportbuxaite.Action || '';

    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
