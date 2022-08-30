import { config } from "dotenv";

config();

export default {        
        host: process.env.HOST || '147.182.199.194:1539/XEPDB1',
        database: process.env.database || '1112345',
        user: process.env.USER || 'LTOLEDO',
        password: process.env.PASSWORD || '1112345',
        port: process.env.port || '3000'        
};
