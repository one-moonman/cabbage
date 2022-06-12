import Redis from "ioredis";
import { Session, SessionData } from "express-session";

export type SessionType = Session & Partial<SessionData>;

export type Context = {
    session: SessionType
    redis: Redis
}