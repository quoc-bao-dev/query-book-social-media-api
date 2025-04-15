import ApiError from '../core/ApiError';
import MediaDTO from '../DTO/media.dto';
import reportSchema from '../models/report.schema';
import postHiddenService from './postHidden.service';

class ReportService {
    private postReportOption = [
        {
            path: 'postId',
            select: ['content', 'media', 'createdAt', 'updatedAt', 'status'],
            populate: {
                path: 'media',
                select: ['url', 'type', 'file', 'sourceType'],
            },
        },
        {
            path: 'reportedBy',
            select: [
                'username',
                'email',
                'firstName',
                'lastName',
                'handle',
                'avatar',
            ],
            populate: {
                path: 'avatar',
                select: ['url', 'type', 'file', 'sourceType'],
            },
        },
    ];

    private accountReportOption = [
        {
            path: 'accountId',
            select: [
                'username',
                'email',
                'firstName',
                'lastName',
                'handle',
                'avatar',
            ],
            populate: {
                path: 'avatar',
                select: ['url', 'type', 'file', 'sourceType'],
            },
        },
        {
            path: 'reportedBy',
            select: [
                'username',
                'email',
                'firstName',
                'lastName',
                'handle',
                'avatar',
            ],
            populate: {
                path: 'avatar',
                select: ['url', 'type', 'file', 'sourceType'],
            },
        },
    ];

    private questionReportOption = [
        {
            path: 'questionId',
            select: ['userId', 'title', 'question', 'images', 'code'],
            populate: {
                path: 'userId',
                select: [
                    'username',
                    'email',
                    'firstName',
                    'lastName',
                    'handle',
                    'avatar',
                ],
                populate: {
                    path: 'avatar',
                    select: ['url', 'type', 'file', 'sourceType'],
                },
            },
        },
        {
            path: 'reportedBy',
            select: [
                'username',
                'email',
                'firstName',
                'lastName',
                'handle',
                'avatar',
            ],
            populate: {
                path: 'avatar',
                select: ['url', 'type', 'file', 'sourceType'],
            },
        },
    ];
    async getPostReports() {
        const reports = await reportSchema
            .find({ reportType: 'post' })
            .populate(this.postReportOption);

        return reports.map((report) => this.toPostReport(report));
    }

    async getAccountReports() {
        const reports = await reportSchema
            .find({ reportType: 'account' })
            .populate(this.accountReportOption);

        return reports.map((report) => this.toAccountReport(report));
    }

    async getQuestionReports() {
        const reports = await reportSchema
            .find({ reportType: 'question' })
            .populate(this.questionReportOption);

        return reports.map((report) => this.toQuestionReport(report));
    }

    async getReportByPostId(postId: string) {
        const reports = await reportSchema
            .find({ postId: postId })
            .populate(this.postReportOption);

        return reports.map((report) => this.toPostReport(report));
    }

    async getReportByUserId(userId: string) {
        const reports = await reportSchema
            .find({ accountId: userId })
            .populate(this.accountReportOption);
        return reports.map((report) => this.toAccountReport(report));
    }

    async getReportByQuestionId(questionId: string) {
        const reports = await reportSchema
            .find({ questionId: questionId })
            .populate(this.questionReportOption);
        return reports.map((report) => this.toQuestionReport(report));
    }

    async cretePostReport({
        content,
        postId,
        reason,
        userReport,
    }: {
        userReport: string;
        postId: string;
        reason: string;
        content: string;
    }) {
        if (!userReport) {
            throw ApiError.notFound('User not found');
        }

        if (!postId) {
            throw ApiError.notFound('Post not found');
        }

        const payload = {
            reportType: 'post',
            postId: postId,
            reason: reason,
            content: content,
            reportedBy: userReport,
        };

        const report = await reportSchema.create(payload);

        await postHiddenService.hiddenPost(userReport, postId);

        return report;
    }

    async createAccountReport({
        accountId,
        content,
        reason,
        userReport,
    }: {
        userReport: string;
        accountId: string;
        reason: string;
        content: string;
    }) {
        if (!userReport) {
            throw ApiError.notFound('User not found');
        }

        if (!accountId) {
            throw ApiError.notFound('Account not found');
        }

        const payload = {
            reportType: 'account',
            accountId: accountId,
            reason: reason,
            content: content,
            reportedBy: userReport,
        };

        const report = await reportSchema.create(payload);

        return report;
    }

    async createQuestionReport({
        content,
        questionId,
        reason,
        userReport,
    }: {
        userReport: string;
        questionId: string;
        reason: string;
        content: string;
    }) {
        if (!userReport) {
            throw ApiError.notFound('User not found');
        }

        if (!questionId) {
            throw ApiError.notFound('Question not found');
        }

        const payload = {
            reportType: 'question',
            questionId: questionId,
            reason: reason,
            content: content,
            reportedBy: userReport,
        };

        const report = await reportSchema.create(payload);

        return report;
    }

    async resolveReport({
        reportId,
        adminId,
    }: {
        reportId: string;
        adminId: string;
    }) {
        return await reportSchema.findByIdAndUpdate(reportId, {
            status: 'resolved',
            handledByAdminId: adminId,
        });
    }

    async rejectReport({
        reportId,
        adminId,
    }: {
        reportId: string;
        adminId: string;
    }) {
        return await reportSchema.findByIdAndUpdate(reportId, {
            status: 'rejected',
            handledByAdminId: adminId,
        });
    }

    private toPostReport(report: any) {
        return {
            id: report._id,
            postId: {
                ...report.postId.toObject(),
                media:
                    report.postId?.media &&
                    report.postId.media.length > 0 &&
                    report.postId.media.map((media: any) =>
                        new MediaDTO(media).toUrl()
                    ),
            },
            reason: report.reason,
            content: report.content,
            reportedBy: {
                ...report.reportedBy.toObject(),
                avatar:
                    report.reportedBy.avatar &&
                    new MediaDTO(report.reportedBy.avatar).toUrl(),
            },
            status: report.status,
            handledByAdminId: report.handledByAdminId,
        };
    }

    private toAccountReport(report: any) {
        return {
            id: report._id,
            account: {
                ...report.accountId.toObject(),
                avatar:
                    report.accountId.avatar &&
                    new MediaDTO(report.accountId.avatar).toUrl(),
            },
            reason: report.reason,
            content: report.content,
            reportedBy: {
                ...report.reportedBy.toObject(),
                avatar:
                    report.reportedBy.avatar &&
                    new MediaDTO(report.reportedBy.avatar).toUrl(),
            },
            status: report.status,
            handledByAdminId: report.handledByAdminId,
        };
    }

    private toQuestionReport(report: any) {
        return {
            id: report._id,
            question: {
                ...report.questionId.toObject(),
                images:
                    report.questionId?.images &&
                    report.questionId.images.length > 0 &&
                    report.questionId.images.map((media: any) =>
                        new MediaDTO(media).toUrl()
                    ),
                author: {
                    ...report.questionId.userId.toObject(),
                    avatar:
                        report.questionId.userId.avatar &&
                        new MediaDTO(report.questionId.userId.avatar).toUrl(),
                },
                userId: undefined,
            },
            reason: report.reason,
            content: report.content,
            reportedBy: {
                ...report.reportedBy.toObject(),
                avatar:
                    report.reportedBy.avatar &&
                    new MediaDTO(report.reportedBy.avatar).toUrl(),
            },
            status: report.status,
            handledByAdminId: report.handledByAdminId,
        };
    }

    private async checkExistReport(
        reportBy: string,
        reportId: string,
        type: 'post' | 'account' | 'question'
    ) {
        if (type === 'post') {
            return await reportSchema.findOne({
                reportType: type,
                postId: reportId,
                reportedBy: reportBy,
            });
        }

        if (type === 'account') {
            return await reportSchema.findOne({
                reportType: type,
                accountId: reportId,
                reportedBy: reportBy,
            });
        }

        if (type === 'question') {
            return await reportSchema.findOne({
                reportType: type,
                questionId: reportId,
                reportedBy: reportBy,
            });
        }
    }
}

export default new ReportService();
