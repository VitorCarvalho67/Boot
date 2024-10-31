import "express-async-errors";
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { routes } from "./router";
import { AppError } from './errors/error';
import { Server } from 'socket.io';
import http from 'http';
import appSocket from "./connection/socket";

const app = express();
const port = 3333;

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        response.status(err.statusCode).json({
            status: "error",
            message: err.message
        });
    } else {
        response.status(500).json({
            status: "error",
            message: `Internal server error - ${err.message}`
        });
    }
});

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
    origin: ["http://localhost:5173", "https://boot.portfolioeducacionalrgs.com", "https://bootminio.portfolioeducacionalrgs.com", "https://bootserver.portfolioeducacionalrgs.com", "http://192.168.100.10:5173", "http://192.168.56.1:5173/"],
        methods: ["GET", "POST"]
    }
});

appSocket(io);

httpServer.listen(port, () => {
    console.log(`Server is running on port ${port} 🚀\nDatabase URL: ${process.env.DATABASE_URL}`);
});
