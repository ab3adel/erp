export interface Params {
  name?: string;
  language?: string;
  date_format?: string;
  email_notifications?: boolean;
  password_updates?: boolean;
  security_updates?: boolean;
  communications?: boolean;
  Mcultivo_App_updates?: boolean;
}

interface Avatar {
  id: string;
  src: string;
  file_type: string;
  model_type: string;
  zone: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface Profile {
  id: string;
  avatar: Avatar[];
  user: User;
  language: string;
  date_format: string;
  password_updates: boolean;
  security_updates: boolean;
  communications: boolean;
  Mcultivo_App_updates: boolean;
}

export interface Data {
  EditUserProfileMutation: { profile: Profile };
}
