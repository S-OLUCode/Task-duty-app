import { rateLimit, ipKeyGenerator } from "express-rate-limit";

export const rateLimiter = (num) => rateLimit({
    windowMs: 20 * 60 * 1000, //15 minutes window
    max: num, //limit each IP to num requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes",
    standardHeaders: true, //return rate limit info in the `RateLimit-*` headers
    keyGenerator: (req) => {
        //use ip address + user agent to identify clients
        return `${ipKeyGenerator(req.ip)}-${req.headers["user-agent"] || "unkown-user-agent"}`;
    }, 
    legacyHeaders: false, //disable the `X-RateLimit-*` headers
});