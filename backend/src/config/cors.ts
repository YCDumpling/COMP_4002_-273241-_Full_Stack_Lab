import { CorsOptions } from "cors";

// configure the type of requests that CORS will allow to be made to the backend
const corsOptions: CorsOptions = {
    // throw an error if the request does not come from the list of allowed origins
    origin: function(origin, callback) {
        // Allow any localhost port in development
        if (!origin || origin.match(/^http:\/\/localhost:\d+$/)) {
            callback(null, true);
        } else if (origin === process.env.FRONTEND_URL) {
            callback(null, true);
        } else if (origin && origin.includes('.vercel.app')) {
            // Allow any Vercel deployment URL
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS restriction"), false);
        }
    },
    // allow specific headers, methods, and inclusion of credentials
    allowedHeaders:['Content-Type', 'Authorization'],
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    credentials: true
}

export default corsOptions;