import { model, Schema } from 'mongoose';

export interface SystemLog extends Document {
    accountType: 'user' | 'admin';
    message: string;
    action: string;
    account: string;
    ipAddress: string;
    status: string;
    metadata: any;
    createdDate: Date;
}

const SystemLogSchema = new Schema<SystemLog>({
    accountType: { type: String, required: true },
    message: { type: String, required: true },
    action: { type: String, required: true },
    account: { type: String, required: true },
    ipAddress: { type: String, required: true },
    status: { type: String, required: true },
    metadata: { type: Object },
    createdDate: { type: Date, default: Date.now },
});

export default model<SystemLog>('SystemLog', SystemLogSchema);
