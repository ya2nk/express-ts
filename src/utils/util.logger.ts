import *  as  winston from 'winston';
import 'winston-daily-rotate-file';


const transport = new winston.transports.DailyRotateFile({
    filename: './src/logs/log-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '7d',
});

transport.on('rotate', function (oldFilename, newFilename) {
    // do something fun
});

const logger = winston.createLogger({
    level: "warn",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        transport,
        new winston.transports.Console()
    ]
});

export default logger
