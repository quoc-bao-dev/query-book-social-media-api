import { createLogger, format, transports } from 'winston';
import fs from 'fs';
import path from 'path';

// Đảm bảo thư mục logs tồn tại
const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        // Ghi log lỗi vào file error.log
        new transports.File({
            filename: path.join(logDir, 'error.log'),
            level: 'error',
        }),
        // Ghi tất cả log vào file combined.log
        new transports.File({ filename: path.join(logDir, 'combined.log') }),
    ],
});

// Nếu đang phát triển, ghi log vào console
if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new transports.Console({
            format: format.combine(format.colorize(), format.simple()),
        })
    );
}

export default logger;
