import { Document } from 'mongoose';
import { Schema, model } from 'mongoose';

export interface ReportDocument extends Document {
    reportType: 'post' | 'account' | 'question';
    handledByAdminId: string;
    accountId: string;
    postId: string;
    questionId: string;
    reportedBy: string;
    reason: string;
    content: string;
    status: 'pending' | 'resolved' | 'rejected';
    createdAt: Date;
}

const ReportSchema = new Schema<ReportDocument>(
    {
        reportType: {
            type: String,
            enum: ['post', 'account', 'question'],
            required: true,
        },
        handledByAdminId: {
            type: String,
            ref: 'Admin',
        },
        accountId: {
            type: String,
            ref: 'User',
        },
        postId: {
            type: String,
            ref: 'Post',
        },
        questionId: {
            type: String,
            ref: 'Question',
        },
        reportedBy: {
            type: String,
            required: true,
            ref: 'User',
        },
        reason: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'resolved', 'rejected'],
            default: 'pending',
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

export default model<ReportDocument>('Report', ReportSchema);
