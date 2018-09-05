
import {
    State,
} from './index'

declare module 'express' {
    interface Request {
        state?: State;
    }

    interface Response {
        out?: any;
    }
}