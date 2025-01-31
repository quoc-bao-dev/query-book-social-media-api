import deploymentsSchema from '../schema/deployments.schema';

class DeployService {
    async getDeployByUserId(userId: string) {
        const deploys = await deploymentsSchema.find({
            userId,
        });

        return deploys;
    }

    async getDeployBySubDomain(subDomain: string) {
        const deploys = await deploymentsSchema.findOne({
            subdomain: subDomain,
        });

        return deploys;
    }

    async createDeploy(payload: any) {
        const deploy = new deploymentsSchema(payload);
        const result = await deploy.save();
        return result;
    }
}

export default new DeployService();
