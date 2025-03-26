import { Schema, model, Document } from 'mongoose';

interface AdminAction extends Document {
    reportId: string; // Báo cáo liên quan
    adminId: string; // Người xử lý
    action:
        | 'deleted_post'
        | 'hidden_post'
        | 'warned_user'
        | 'banned_user'
        | 'resolved_report'
        | 'rejected_report'; // Hành động của admin
    note?: string; // Ghi chú của admin (VD: Lý do khóa tài khoản)
    createdAt: Date;
}

const AdminActionSchema = new Schema<AdminAction>({
    reportId: { type: String, ref: 'Post' },
    adminId: { type: String, required: true, ref: 'Admin' },
    action: {
        type: String,
        required: true,
        enum: [
            'deleted_post',
            'hidden_post',
            'warned_user',
            'banned_user',
            'resolved_report',
            'rejected_report',
        ],
    },
    note: { type: String },
    createdAt: { type: Date, required: true, default: Date.now },
});

const AdminActionModel = model<AdminAction>('AdminAction', AdminActionSchema);

export { AdminAction, AdminActionModel };
