import { stat } from 'fs';

const authSwagger = {
    tags: [
        {
            name: 'Auth',
            description: 'Endpoints for user authentication',
        },
    ],
    paths: {
        '/auth/login': {
            post: {
                tags: ['Auth'],
                summary: 'User login',
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    email: {
                                        type: 'string',
                                        example: 'user@example.com',
                                    },
                                    password: {
                                        type: 'string',
                                        example: 'password123',
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'Login success',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        status: {
                                            type: 'number',
                                            example: 200,
                                        },
                                        message: {
                                            type: 'string',
                                            example: 'Login successful',
                                        },
                                        data: {
                                            type: 'object',
                                            properties: {
                                                accessToken: {
                                                    type: 'string',
                                                    example:
                                                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNT',
                                                },
                                                refreshToken: {
                                                    type: 'string',
                                                    example:
                                                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNT',
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
        },
        '/auth/login/verify-2fa': {
            post: {
                tags: ['Auth'],
                summary: 'User login with 2fa',
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    otp: {
                                        type: 'string',
                                        example: '123456',
                                    },
                                    twoFaToken: {
                                        type: 'string',
                                        example:
                                            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNT',
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'Login success',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        status: {
                                            type: 'number',
                                            example: 200,
                                        },
                                        message: {
                                            type: 'string',
                                            example: 'Login successful',
                                        },
                                        data: {
                                            type: 'object',
                                            properties: {
                                                accessToken: {
                                                    type: 'string',
                                                    example:
                                                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNT',
                                                },
                                                refreshToken: {
                                                    type: 'string',
                                                    example:
                                                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNT',
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
        },

        '/auth/register': {
            post: {
                tags: ['Auth'],
                summary: 'User registration',
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    email: {
                                        type: 'string',
                                        example: 'user@example.com',
                                    },
                                    username: {
                                        type: 'string',
                                        example: 'johndoe',
                                    },
                                    password: {
                                        type: 'string',
                                        example: 'password123',
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'Registration success',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        status: {
                                            type: 'number',
                                            example: 200,
                                        },
                                        message: {
                                            type: 'string',
                                            example: 'Registration successful',
                                        },
                                        data: {
                                            type: 'object',
                                            properties: {
                                                activeToken: {
                                                    type: 'string',
                                                    example: 'eyJhbGciOi...',
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
        },
        '/auth/register/verify-otp': {
            post: {
                tags: ['Auth'],
                summary: 'Verify OTP',
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    otp: {
                                        type: 'string',
                                        example: '123456',
                                    },
                                    activeToken: {
                                        type: 'string',
                                        example: 'eyJhbGciOi...',
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'OTP verification success',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        status: {
                                            type: 'number',
                                            example: 200,
                                        },
                                        message: {
                                            type: 'string',
                                            example:
                                                'OTP verified successfully',
                                        },
                                        data: {
                                            type: 'object',
                                            properties: {
                                                accessToken: {
                                                    type: 'string',
                                                    example:
                                                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNT',
                                                },
                                                refreshToken: {
                                                    type: 'string',
                                                    example:
                                                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNT',
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
        },
    },
};

export default authSwagger;
