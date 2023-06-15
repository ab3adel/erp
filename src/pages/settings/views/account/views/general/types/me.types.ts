interface Me {
  id: string;
  name: string;
  email: string;
  profile: {
    language: string;
    date_format: string;
    avatar: {
      src: string;
      file_type: string;
      model_type: string;
      zone: string;
    }[];
  };
}

export interface Data {
  me?: Me;
}
