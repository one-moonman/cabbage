import { Request } from "express";
import Redis from "ioredis";

export type Args = Record<string, any>;

export type MyContext = {
    req: Request
    res: Response
    redis: Redis
}