import express, { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import multer from 'multer';
import cron from 'node-cron';
import path from 'path';
import { deleteUnusedFiles } from './cron';
import authMiddleware from './middleware';
import cors from 'cors';

const port = process.env.PORT || 3008;
const app = express();

// Đường dẫn thư mục uploads
const uploadsDir = path.join(__dirname, '../public/uploads');

// Kiểm tra và tạo thư mục uploads nếu chưa tồn tại
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(
    cors({
        origin: ['*', 'http://localhost:3000'],
        credentials: true,
    })
);
app.use(express.static('public/uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../public/uploads')); // Directory for uploaded files
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = `${Date.now()}-${Math.round(
                Math.random() * 1e9
            )}`;
            cb(null, `${uniqueSuffix}-${file.originalname}`);
        },
    }),
    fileFilter: (req, file, cb) => {
        // Accept only specific file types (e.g., images)
        if (
            file.mimetype.startsWith('image/') ||
            file.mimetype.startsWith('video/')
        ) {
            cb(null, true);
        } else {
            cb(new Error('Only image and video files are allowed!'));
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

// Endpoint to upload a file
app.post(
    '/upload',
    authMiddleware,
    upload.single('file'),
    (req: Request, res: Response) => {
        if (!req.file) {
            res.status(400).json({ message: 'No file uploaded' });
            return;
        }

        res.status(200).json({
            message: 'File uploaded successfully',
            fileName: req.file.filename,
            filePath: `/public/uploads/${req.file.filename}`,
        });
    }
);
app.post(
    '/uploads',
    authMiddleware,
    upload.array('files', 10),
    (req: Request, res: Response) => {
        // Kiểm tra nếu không có file nào được tải lên
        if (!req.files || !(req.files as Express.Multer.File[]).length) {
            res.status(400).json({ message: 'No files uploaded' });
            return;
        }

        // Lấy thông tin các file đã upload
        const uploadedFiles = (req.files as Express.Multer.File[]).map(
            (file) => ({
                filename: file.filename,
                path: `/public/uploads/${file.filename}`,
            })
        );

        res.status(200).json({
            message: 'Files uploaded successfully',
            files: uploadedFiles,
        });
    }
);

app.post('/delete/:file', authMiddleware, (req: Request, res: Response) => {
    const { file } = req.params;

    fs.unlink(path.join('public', file), (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Failed to delete image' });
            return;
        }
    });

    res.status(200).json({ message: 'Delete image successful' });
});

app.use((err: any, req: Request, res: Response, next: NextFunction): void => {
    if (err instanceof multer.MulterError) {
        res.status(400).json({ message: err.message });
    }

    if (err) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: err.message,
        });
    }

    next();
});

// Lịch chạy cron job: Xóa hình ảnh cũ lúc 2 giờ sáng mỗi ngày
cron.schedule('0 2 * * *', () => {
    console.log('Running cron job to delete unused files...');

    //TODO: call api to get file in use
    const fileInUse: string[] = [];
    deleteUnusedFiles(uploadsDir, fileInUse);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
