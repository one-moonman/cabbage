import Redis from "ioredis";
import { Session, SessionData } from "express-session";
import FieldError from "./field-error.type";

export type SessionType = Session & Partial<SessionData>;

export type Context = {
    session: SessionType
    redis: Redis
}

export type Response = {
    data?: any
    error?: FieldError
}
