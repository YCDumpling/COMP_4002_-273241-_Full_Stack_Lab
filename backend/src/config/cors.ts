import { CorsOptions } from "cors";

// configure the type of requests that CORS will allow to be made to the backend
const corsOptions: CorsOptions = {
    // throw an error if the request does not come from the list of allowed origins
    origin: function(origin, callback) {
        console.log('CORS origin check:', origin);
        console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
        
        // Allow requests with no origin (like mobile apps, curl, Postman, or same-origin)
        if (!origin) {
            callback(null, true);
            return;
        }
        
        // allow any localhost port in development - such as from Vite dev server
        if (origin.match(/^http:\/\/localhost:\d+$/)) {
            callback(null, true);
            return;
        }
        
        // allow the configured frontend URL
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true);
            return;
        }
        
        // allow any Vercel deployment URL (both frontend and backend)
        if (origin.includes('.vercel.app')) {
            callback(null, true);
            return;
        }
        
        console.error('CORS rejected origin:', origin);
        callback(new Error("Not allowed by CORS restriction"), false);
    },
    // allow specific headers, methods, and inclusion of credentials
    allowedHeaders:['Content-Type', 'Authorization'],
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    credentials: true
}

export default corsOptions;