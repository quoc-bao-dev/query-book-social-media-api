import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import config from './config';

// Định nghĩa cấu hình Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Query Book Social Media API',
            version: '1.0.0',
            description: `
                Query Book là một nền tảng mạng xã hội hiện đại được thiết kế để kết nối cộng đồng, hỗ trợ học tập và xây dựng sự nghiệp.

                **Các tính năng chính:**
                - **New Feed**: Chia sẻ trạng thái, hình ảnh và theo dõi hoạt động của bạn bè.
                - **Profile**: Tạo và quản lý hồ sơ cá nhân và nghề nghiệp.
                - **QnA**: Đặt câu hỏi và trả lời, tương tự như Stack Overflow.
                - **Tìm kiếm việc làm**: Kết nối người dùng với các cơ hội việc làm.
                - **Chat**: Nhắn tin và giao tiếp thời gian thực với bạn bè và đồng nghiệp.

                API hỗ trợ phát triển dựa trên mô hình Scrum, đảm bảo khả năng mở rộng, hiệu quả và dễ sử dụng cho các nhà phát triển.
            `,
        },
        servers: [
            {
                url: `http://localhost:${config.PORT}`, // URL server của bạn
            },
        ],
    },
    apis: ['./src/router/*.routes.ts'], // Đường dẫn tới file chứa route
};

// Tạo Swagger specs
const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Hàm khởi tạo Swagger
export const setupSwagger = (app: Express): void => {
    app.use(
        '/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocs, {
            customCss: `
            .swagger-ui .markdown {
                color: #333 !important;
            }
        `,
        })
    );
    console.log(
        `Swagger Docs available at http://localhost:${config.PORT}/api-docs`
    );
};
