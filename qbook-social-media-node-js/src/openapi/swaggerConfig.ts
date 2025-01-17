import { Express } from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import config from '../config/config';

const swaggerDocument = YAML.load(path.join(__dirname, './openapi.yaml'));

export const setupSwagger = (app: Express): void => {
    app.use(
        '/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocument, {
            explorer: true,
            isExplorer: true,
        })
    );
    console.log(
        `Swagger Docs available at http://localhost:${config.PORT}/api-docs`
    );
};
