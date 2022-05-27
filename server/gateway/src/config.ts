import Redis from 'ioredis';

export const redis = new Redis("redis://redis:6379");
