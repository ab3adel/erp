interface Avatar {
  src: string;
  file_type: string;
  model_type: string;
  zone: string;
}

interface Profile {
  language: string;
  date_format: string;
  email_notifications: boolean;
  password_updates: boolean;
  security_updates: boolean;
  communications: boolean;
  Mcultivo_App_updates: boolean;
  avatar: Avatar[];
}

interface Me {
  id: string;
  name: string;
  email: string;
  profile?: Profile;
  role: string;
}

export interface Data {
  me?: Me;
}
