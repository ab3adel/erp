interface Lot {
  id: string;
  attributes: {
    lastUpdate: string;
    state: string;
    name: string;
    weight: number;
    uom: string;
    grade: string;
    location: string;
    subLocation: string;
    processType: string;
  };
}

interface LotData {
  data: Lot[];
}

interface LotsResponse {
  lots: LotData;
}
