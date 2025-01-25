import mongoose from 'mongoose';
import { fakeToken } from './factory/fakeToken';
import jobTitleService from './services/jobTitle.service';
import { hashPassword } from './utils/bcrypt.utils';

const user1 = '676e17a7befb1214cb0c6bf1';
const user2 = '676e7a3017c3b35dcced3084';
const user3 = '676e7a29916c5a44cfaefac2';

mongoose.connect('mongodb://localhost:27017/express-typescript').then(() => {
    console.log('Connected to MongoDB');
});
const createJobTitle = async () => {
    const arr = [
        {
            title: 'frontend engineer',
            description:
                'Responsible for designing and developing user-facing applications, ensuring seamless user experiences with responsive and interactive designs.',
        },
        {
            title: 'react developer',
            description:
                'Specialized in building dynamic web applications using React.js, including state management and integration with RESTful APIs.',
        },
        {
            title: 'javascript developer',
            description:
                'Focuses on creating interactive and dynamic web applications using JavaScript, enhancing functionality and user interaction.',
        },
        {
            title: 'UI/UX developer',
            description:
                'Combines technical development skills with a focus on user interface and user experience design to create intuitive and visually appealing web solutions.',
        },
        {
            title: 'web interface developer',
            description:
                'Expert in developing and optimizing web interfaces to ensure they are user-friendly, accessible, and visually engaging.',
        },
        {
            title: 'vue.js developer',
            description:
                'Specializes in developing front-end applications using Vue.js framework, focusing on modular and scalable architecture.',
        },
        {
            title: 'angular developer',
            description:
                'Skilled in building robust and scalable front-end applications using Angular, with expertise in TypeScript and reactive programming.',
        },
        {
            title: 'frontend architect',
            description:
                'Leads the design and development of front-end architecture, ensuring scalability, performance, and adherence to best practices.',
        },
        {
            title: 'frontend web developer',
            description:
                'Develops responsive and interactive websites, ensuring compatibility across devices and adherence to web standards.',
        },
        {
            title: 'frontend software engineer',
            description:
                'Designs and implements front-end features for web applications, focusing on performance optimization and cross-browser compatibility.',
        },
    ];
    arr.map(async (item) => {
        const jobTitle = await jobTitleService.create(item);
    });
};
const main = async () => {
    // fakeToken(user1);
    // createJobTitle();
    console.log(await hashPassword('Pass1234@@'));
};

main();
