import topicSchema from '../models/topic.schema';

const topics = [
    {
        name: 'react',
        description:
            'React.js là một thư viện JavaScript phổ biến để xây dựng giao diện người dùng dựa trên component, hỗ trợ virtual DOM giúp tối ưu hóa hiệu suất.',
    },
    {
        name: 'nextjs',
        description:
            'Next.js là một framework dựa trên React, cung cấp hỗ trợ cho server-side rendering (SSR), static site generation (SSG), và nhiều tính năng tối ưu hóa SEO.',
    },
    {
        name: 'vue',
        description:
            'Vue.js là một framework JavaScript linh hoạt, dễ học, tập trung vào việc xây dựng giao diện người dùng với hệ thống reactivity mạnh mẽ.',
    },
    {
        name: 'nuxtjs',
        description:
            'Nuxt.js là một framework mạnh mẽ dựa trên Vue.js, hỗ trợ server-side rendering (SSR) và tối ưu hóa SEO cho các ứng dụng web.',
    },
    {
        name: 'angular',
        description:
            'Angular là một framework TypeScript toàn diện để phát triển ứng dụng web, cung cấp kiến trúc MVC, dependency injection, và hỗ trợ phát triển SPA.',
    },
    {
        name: 'svelte',
        description:
            'Svelte là một framework JavaScript không cần Virtual DOM, giúp tối ưu hiệu suất và tạo ra mã nguồn nhỏ gọn hơn so với các framework khác.',
    },
    {
        name: 'nodejs',
        description:
            'Node.js là một môi trường runtime JavaScript giúp chạy JavaScript trên server, sử dụng kiến trúc non-blocking và event-driven giúp tối ưu hiệu suất.',
    },
    {
        name: 'express',
        description:
            'Express.js là một framework web tối giản cho Node.js, giúp xây dựng API nhanh chóng với hệ thống middleware linh hoạt.',
    },
    {
        name: 'nestjs',
        description:
            'NestJS là một framework dựa trên Node.js sử dụng TypeScript, giúp xây dựng ứng dụng back-end mạnh mẽ theo kiến trúc module và decorator.',
    },
    {
        name: 'fastify',
        description:
            'Fastify là một framework Node.js nhẹ, hiệu suất cao, được thiết kế để xử lý hàng ngàn request trên giây với tốc độ vượt trội.',
    },
    {
        name: 'typescript',
        description:
            'TypeScript là một superset của JavaScript, cung cấp tính năng static typing, giúp giảm lỗi và cải thiện khả năng bảo trì code.',
    },
    {
        name: 'javascript',
        description:
            'JavaScript là ngôn ngữ lập trình phổ biến, được sử dụng rộng rãi để phát triển web front-end và back-end với nhiều framework hỗ trợ.',
    },
    {
        name: 'mongodb',
        description:
            'MongoDB là một hệ quản trị cơ sở dữ liệu NoSQL phổ biến, sử dụng mô hình document-based giúp lưu trữ dữ liệu linh hoạt và dễ mở rộng.',
    },
    {
        name: 'mysql',
        description:
            'MySQL là một hệ quản trị cơ sở dữ liệu quan hệ (RDBMS) phổ biến, hỗ trợ truy vấn SQL mạnh mẽ và hiệu suất cao.',
    },
    {
        name: 'postgresql',
        description:
            'PostgreSQL là một hệ quản trị cơ sở dữ liệu quan hệ mã nguồn mở, hỗ trợ nhiều tính năng nâng cao như JSON, indexing mạnh mẽ và ACID compliance.',
    },
    {
        name: 'graphql',
        description:
            'GraphQL là một ngôn ngữ truy vấn API được Facebook phát triển, cho phép client lấy chính xác dữ liệu họ cần thay vì nhận toàn bộ dữ liệu không cần thiết.',
    },
    {
        name: 'restapi',
        description:
            'REST API là một phương pháp xây dựng API sử dụng kiến trúc REST, cho phép giao tiếp giữa client và server thông qua HTTP.',
    },
    {
        name: 'docker',
        description:
            'Docker là một nền tảng containerization giúp đóng gói ứng dụng và các dependencies vào container, dễ triển khai và mở rộng.',
    },
    {
        name: 'kubernetes',
        description:
            'Kubernetes là một hệ thống điều phối container mã nguồn mở, giúp quản lý, mở rộng và triển khai container một cách tự động.',
    },
    {
        name: 'ci/cd',
        description:
            'CI/CD là quy trình tích hợp liên tục và triển khai liên tục, giúp tự động hóa quá trình build, test và deploy phần mềm.',
    },
    {
        name: 'devops',
        description:
            'DevOps là phương pháp phát triển phần mềm kết hợp giữa phát triển (Dev) và vận hành (Ops), giúp tối ưu hóa quy trình phát triển phần mềm.',
    },
    {
        name: 'aws',
        description:
            'AWS (Amazon Web Services) là nền tảng điện toán đám mây của Amazon, cung cấp nhiều dịch vụ như EC2, S3, Lambda, RDS để xây dựng ứng dụng.',
    },
    {
        name: 'firebase',
        description:
            'Firebase là nền tảng phát triển ứng dụng của Google, cung cấp nhiều dịch vụ như authentication, real-time database, cloud functions.',
    },
    {
        name: 'tailwindcss',
        description:
            'Tailwind CSS là một framework CSS utility-first, giúp tạo giao diện nhanh chóng mà không cần viết nhiều CSS tùy chỉnh.',
    },
    {
        name: 'bootstrap',
        description:
            'Bootstrap là một framework CSS phổ biến, cung cấp các component UI sẵn có để phát triển giao diện web nhanh chóng.',
    },
    {
        name: 'sass',
        description:
            'SASS (Syntactically Awesome Stylesheets) là một tiền xử lý CSS, giúp viết CSS có cấu trúc hơn với biến, mixins, nesting.',
    },
    {
        name: 'redis',
        description:
            'Redis là một hệ quản trị cơ sở dữ liệu NoSQL dạng key-value, hỗ trợ caching, message broker và real-time analytics.',
    },
    {
        name: 'rabbitmq',
        description:
            'RabbitMQ là một message broker phổ biến, giúp giao tiếp giữa các service bằng cách gửi và nhận message trong hệ thống.',
    },
    {
        name: 'kafka',
        description:
            'Kafka là một nền tảng message streaming phân tán, giúp xử lý dữ liệu real-time với khả năng mở rộng cao.',
    },
    {
        name: 'websockets',
        description:
            'WebSockets là giao thức full-duplex giúp client và server giao tiếp theo thời gian thực mà không cần gửi request liên tục.',
    },
    {
        name: 'pwa',
        description:
            'Progressive Web Apps (PWA) là kỹ thuật giúp biến các trang web thành ứng dụng có thể chạy offline, cài đặt trên thiết bị giống như app native.',
    },
    {
        name: 'webassembly',
        description:
            'WebAssembly (WASM) là định dạng nhị phân cho phép chạy code gần với hiệu suất native trên trình duyệt web.',
    },
    {
        name: 'microservices',
        description:
            'Microservices là kiến trúc phần mềm chia nhỏ hệ thống thành nhiều service nhỏ, giúp dễ mở rộng và bảo trì.',
    },
    {
        name: 'monorepo',
        description:
            'Monorepo là cách tổ chức mã nguồn trong một repository duy nhất, giúp dễ dàng quản lý nhiều dự án liên quan.',
    },
    {
        name: 'turborepo',
        description:
            'Turborepo là công cụ giúp tối ưu hóa Monorepo bằng cách cải thiện hiệu suất build và caching thông minh.',
    },
    {
        name: 'redux',
        description:
            'Redux là một thư viện quản lý trạng thái trong ứng dụng JavaScript, giúp duy trì state nhất quán trong React, Angular, và Vue.',
    },
    {
        name: 'zustand',
        description:
            'Zustand là một thư viện quản lý state nhẹ và đơn giản hơn Redux, sử dụng hooks trong React.',
    },
    {
        name: 'react-query',
        description:
            'React Query là thư viện giúp quản lý dữ liệu bất đồng bộ trong React, tối ưu caching và server state management.',
    },
    {
        name: 'threejs',
        description:
            'Three.js là một thư viện JavaScript giúp hiển thị đồ họa 3D trên web bằng WebGL, tạo ra các hiệu ứng thị giác mạnh mẽ.',
    },
    {
        name: 'socketio',
        description:
            'Socket.IO là một thư viện giúp triển khai WebSockets dễ dàng trong Node.js, hỗ trợ giao tiếp real-time giữa client và server.',
    },
    {
        name: 'electron',
        description:
            'Electron.js là framework giúp xây dựng ứng dụng desktop bằng JavaScript, HTML, và CSS, dựa trên Chromium và Node.js.',
    },
    {
        name: 'tiptap',
        description:
            'Tiptap là một editor mạnh mẽ dựa trên ProseMirror, giúp tạo trình soạn thảo văn bản tùy chỉnh trong web app.',
    },
    {
        name: 'tRPC',
        description:
            'tRPC là một framework giúp tạo API type-safe giữa client và server mà không cần định nghĩa schema REST hoặc GraphQL.',
    },
    {
        name: 'authjs',
        description:
            'Auth.js là thư viện giúp xác thực người dùng trong Next.js, hỗ trợ OAuth, JWT, và nhiều phương thức đăng nhập khác.',
    },
    {
        name: 'nestjs',
        description:
            'NestJS là một framework backend dựa trên TypeScript giúp xây dựng API mạnh mẽ với kiến trúc module và dependency injection.',
    },
    {
        name: 'prisma',
        description:
            'Prisma là ORM hiện đại dành cho Node.js và TypeScript, giúp quản lý cơ sở dữ liệu dễ dàng với cú pháp type-safe.',
    },
    {
        name: 'sequelize',
        description:
            'Sequelize là một ORM dành cho Node.js, giúp làm việc với cơ sở dữ liệu SQL như MySQL, PostgreSQL, SQLite.',
    },
    {
        name: 'moleculer',
        description:
            'Moleculer là một framework microservices mạnh mẽ cho Node.js, hỗ trợ message broker và event-driven architecture.',
    },
    {
        name: 'jest',
        description:
            'Jest là một framework testing cho JavaScript, hỗ trợ kiểm thử đơn vị, tích hợp với React và Node.js.',
    },
    {
        name: 'vitest',
        description:
            'Vitest là một framework testing hiệu suất cao, tối ưu cho các dự án sử dụng Vite.',
    },
    {
        name: 'playwright',
        description:
            'Playwright là công cụ test tự động hóa giao diện web, hỗ trợ đa trình duyệt như Chromium, Firefox, WebKit.',
    },
    {
        name: 'cypress',
        description:
            'Cypress là công cụ test end-to-end cho ứng dụng web, giúp tự động hóa kiểm thử giao diện với tốc độ cao.',
    },
    {
        name: 'bun',
        description:
            'Bun là một runtime JavaScript mới, thay thế Node.js với tốc độ nhanh hơn và tích hợp sẵn nhiều công cụ như bundler, test runner.',
    },
    {
        name: 'deno',
        description:
            'Deno là runtime JavaScript và TypeScript hiện đại, bảo mật cao hơn Node.js, do tác giả Node.js phát triển.',
    },
    {
        name: 'solidjs',
        description:
            'SolidJS là một framework UI tương tự React nhưng nhanh hơn, sử dụng fine-grained reactivity thay vì Virtual DOM.',
    },
    {
        name: 'remix',
        description:
            'Remix là một framework hiện đại cho React, giúp tối ưu hóa performance bằng cách xử lý dữ liệu trên server.',
    },
    {
        name: 'flutter',
        description:
            'Flutter là framework do Google phát triển giúp xây dựng ứng dụng mobile đa nền tảng từ một codebase duy nhất.',
    },
    {
        name: 'react-native',
        description:
            'React Native là framework giúp phát triển ứng dụng mobile bằng React, sử dụng JavaScript hoặc TypeScript.',
    },
    {
        name: 'expo',
        description:
            'Expo là bộ công cụ giúp phát triển React Native dễ dàng hơn, cung cấp các API sẵn có mà không cần native code.',
    },
    {
        name: 'solidity',
        description:
            'Solidity là ngôn ngữ lập trình để viết smart contract trên blockchain Ethereum.',
    },
    {
        name: 'web3js',
        description:
            'Web3.js là thư viện JavaScript giúp tương tác với blockchain Ethereum và smart contract.',
    },
    {
        name: 'ethersjs',
        description:
            'Ethers.js là một thư viện nhẹ giúp làm việc với Ethereum blockchain, thay thế Web3.js với hiệu suất tốt hơn.',
    },
    {
        name: 'tailwindcss',
        description:
            'Tailwind CSS là một framework CSS utility-first, giúp phát triển giao diện nhanh chóng và linh hoạt.',
    },
    {
        name: 'graphql',
        description:
            'GraphQL là một ngôn ngữ truy vấn API do Facebook phát triển, giúp lấy dữ liệu chính xác theo yêu cầu của client.',
    },
    {
        name: 'elastic-search',
        description:
            'Elasticsearch là một công cụ tìm kiếm mạnh mẽ, giúp lưu trữ và truy vấn dữ liệu dạng JSON với hiệu suất cao.',
    },
    {
        name: 'supabase',
        description:
            'Supabase là một nền tảng backend mã nguồn mở thay thế Firebase, cung cấp cơ sở dữ liệu PostgreSQL và authentication.',
    },
    {
        name: 'strapi',
        description:
            'Strapi là một headless CMS mã nguồn mở giúp xây dựng API REST hoặc GraphQL nhanh chóng.',
    },
];
export const fakeTopic = async () => {
    for (let i = 0; i < topics.length; i++) {
        try {
            const topic = await topicSchema.create(topics[i]);
            console.log('Created topic: ', topic.name);
        } catch (error) {
            console.log(error);
        }
    }
};
