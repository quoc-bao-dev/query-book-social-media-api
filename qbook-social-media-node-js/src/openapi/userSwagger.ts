const userSwagger = {
    tags: [
        {
            name: 'User',
            description: 'Endpoints for managing users',
        },
    ],
    paths: {
        '/user/profile': {
            get: {
                tags: ['User'],
                summary: 'Get user profile',
                responses: {
                    200: {
                        description: 'Profile data',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        id: {
                                            type: 'string',
                                            example: '12345',
                                        },
                                        name: {
                                            type: 'string',
                                            example: 'John Doe',
                                        },
                                        email: {
                                            type: 'string',
                                            example: 'user@example.com',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};

export default userSwagger;
