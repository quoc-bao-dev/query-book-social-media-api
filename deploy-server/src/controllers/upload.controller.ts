import decompress from 'decompress';
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { config } from '../config';
import accountService from '../services/account.service';
import deployService from '../services/deploy.service';

const uploadController = {
    upload: async (req: Request, res: Response) => {
        const subDomain = req.body?.subDomain;
        const userId = req.body?.userId;

        if (!userId) {
            res.status(400).json({ message: 'User ID is required' });
            return;
        }

        if (!subDomain) {
            res.status(400).json({ message: 'Subdomain is required' });
            return;
        }

        if (!req.file) {
            res.status(400).json({ message: 'No file uploaded' });
            return;
        }

        // Validate account
        const account = await accountService.getByUserId(userId);

        if (!account) {
            res.status(400).json({ message: 'Account not found' });
            return;
        }

        // Validate subdomain
        const subdomain = await deployService.getDeployBySubDomain(subDomain);
        if (subdomain) {
            res.status(400).json({ message: 'Subdomain already exists' });
            return;
        }

        // Check limit deploy
        const deploys = await deployService.getDeployByUserId(userId);
        if (deploys.length >= account.limitDeploy) {
            res.status(400).json({
                message: 'You have reached the maximum number of deploys',
            });
            return;
        }

        const uploadedFilePath = req.file.path;
        const appDeployPath = path.join(config.DEPLOY_FOLDER, subDomain);

        try {
            if (path.extname(req.file.originalname) === '.zip') {
                await decompress(uploadedFilePath, appDeployPath);
            } else {
                fs.mkdirSync(appDeployPath, { recursive: true });
                fs.copyFileSync(
                    uploadedFilePath,
                    path.join(appDeployPath, req.file.originalname)
                );
            }

            const appUrl = `http://${subDomain}.localhost:${config.PORT}`;

            // Xóa file upload
            fs.unlinkSync(uploadedFilePath);

            // Create deploy
            await deployService.createDeploy({
                userId,
                subdomain: subDomain,
            });

            res.status(200).json({
                message: 'Static files deployed successfully',
                url: appUrl,
                subDomain,
            });
        } catch (error) {
            console.error('Error during deployment:', error);
            res.status(500).json({
                message: 'Error during deployment',
                error: (error as Error).message,
            });
        }
    },
};

export default uploadController;
