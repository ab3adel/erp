export interface Params {
  date_format: string;
  name: string;
  language: string;
}

interface Profile {
  id: string;
  name: string;
  email: string;
  profile: {
    id: string;
    user: string;
    language: string;
    date_format: string;
    email_notifications: boolean;
    communications: boolean;
    Mcultivo_App_updates: boolean;
  };
}

export interface Data extends Profile {}
