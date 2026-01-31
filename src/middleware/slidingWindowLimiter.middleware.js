class slidingWindow {
    constructor(client, windowSizeMs, maxRequests) {
        this.client = client;
        this.windowSize = windowSizeMs;
        this.maxRequests = maxRequests;
    }

    async allowRequests(ip) {
        const key = `rate_limit:${ip}`;
        const now = Date.now();
        const windowStart = now - this.windowSize;

        const multi = this.client.multi();

        multi.zremrangebyscore(key, 0, windowStart);
        multi.zcard(key);
        const uniqueId = now.toString() + '-' + Math.random().toString();
        multi.zadd(key, now, uniqueId);
        multi.expire(key, Math.ceil(this.windowSize / 1000));

        const result = await multi.exec();

        if (!result) return false;

        const requestCount = result[1][1];

        if (requestCount < this.maxRequests) {
            return true;
        }
        return false;
    }
}

export { slidingWindow };