export interface UserDT {
    _id: string;
    firstName?: string;
    lastName?: string;
    password: string;
    login: string;
    email?: string;
    refreshToken?: string;
    activities: Array<any>;
    registrationDate: Date;
  }