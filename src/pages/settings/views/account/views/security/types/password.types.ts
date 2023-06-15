export interface Params {
  password_confirmation: string;
  password: string;
  current_password: string;
}

interface Password {
  status?: boolean;
}

export interface Data extends Password {}
