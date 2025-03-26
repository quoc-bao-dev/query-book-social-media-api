import mongoose, { Document, Schema } from 'mongoose';

export interface IPostHidden extends Document {
    userId: string; // Người báo cáo
    postId: string; // Bài viết bị ẩn khỏi New Feed
}

const PostHiddenSchema: Schema = new Schema(
    {
        userId: { type: String, ref: 'User', required: true },
        postId: { type: String, ref: 'Post', required: true },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IPostHidden>('PostHidden', PostHiddenSchema);
