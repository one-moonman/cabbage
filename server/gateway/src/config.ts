// redis database
import Redis from 'ioredis';
export const redis = new Redis("redis://redis:6379");

// express-session 
import expressSession from 'express-session';
import connectRedis from 'connect-redis';
import { secret, __prod__ } from './common/constants';

declare module 'express-session' {
    interface SessionData {
        total: number,
        authenticated: boolean,     // for future implementation
    }
}

const RedisStore = connectRedis(expressSession);
export const session = expressSession({
    name: "sessiika",
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({ client: redis }),
    secret,
    cookie: {
        httpOnly: false,
        sameSite: 'none',
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
})

// cors
export const cors = {
    origin: ['https://studio.apollographql.com'],
    credentials: true
}