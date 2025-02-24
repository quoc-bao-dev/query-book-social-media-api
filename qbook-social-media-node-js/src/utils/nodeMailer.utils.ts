import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import config from '../config/config';

export const getEmailTemplate = (): string => {
    const templatePath = path.join(
        __dirname,
        '../templates/template-email-otp.html'
    );
    return fs.readFileSync(templatePath, 'utf-8'); // Đọc nội dung file
};
// Cấu hình Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // SMTP server (VD: Gmail, Outlook, ...)
    port: 587, // Port thường dùng cho TLS
    secure: false, // true nếu sử dụng SSL, false nếu TLS
    auth: {
        user: config.EMAIL_USER, // Email của bạn (cài trong .env)
        pass: config.EMAIL_PASS, // Mật khẩu ứng dụng email
    },
});

// Kiểm tra kết nối email
transporter.verify((error, success) => {
    if (error) {
        console.error('Error connecting to email server:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});

export const templateSendOTP = (name: string, otp: string) =>
    getEmailTemplate()
        .replace('{{name}}', name)
        .replace('{{otp1}}', otp[0])
        .replace('{{otp2}}', otp[1])
        .replace('{{otp3}}', otp[2])
        .replace('{{otp4}}', otp[3])
        .replace('{{otp5}}', otp[4])
        .replace('{{otp6}}', otp[5]);

// Hàm gửi email
export const sendEmailOtp = async ({
    to,
    subject,
    text,
    userName,
    otp,
}: {
    to: string;
    subject: string;
    text: string;
    userName: string;
    otp: string;
}) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER, // Email gửi
            to, // Email nhận
            subject, // Tiêu đề email
            text, // Nội dung dạng text
            html: templateSendOTP(userName, otp),
        });

        console.log('Email sent:', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

// send mail reset passsword

const templateResetPassword = (name: string, reset_link: string) => {
    const templatePath = path.join(
        __dirname,
        '../templates/template-email-reset-password.html'
    );
    const templateContent = fs.readFileSync(templatePath, 'utf-8');
    return templateContent
        .replace('{{name}}', name)
        .replace('{{reset_link}}', reset_link);
};

export const sendEmailResetPassword = async ({
    to,
    subject,
    text,
    userName,
    reset_link,
}: {
    to: string;
    subject: string;
    text: string;
    userName: string;
    reset_link: string;
}) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER, // Email gửi
            to, // Email nhận
            subject, // Tiêu đề email
            text, // Nội dung dạng text
            html: templateResetPassword(userName, reset_link),
        });

        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};
