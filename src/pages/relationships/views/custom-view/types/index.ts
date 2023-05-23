export interface Account {
  id: string;
  attributes: {
    name: string;
    type: string;
    firstName: string;
    lastName: string;
    govId: number;
    mobileNumber: number;
    district: string;
    status: string;
    completeness: number;
  };
}

export interface AccountsResponse {
  accounts: {
    data: Account[];
  };
}
