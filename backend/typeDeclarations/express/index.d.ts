import { IUser } from '../../config/models/User';

declare module 'express-serve-static-core' {
    interface Request {
        user?: IUser;
    }
}
