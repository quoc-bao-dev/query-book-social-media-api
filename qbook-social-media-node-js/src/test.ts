import mongoose from 'mongoose';
import jobTitleService from './services/jobTitle.service';
import { hashPassword } from './utils/bcrypt.utils';
import config from './config/config';
import fakeUser from './factory/fakeUser';
import notificationService from './services/notification.service';
import { generateHashtags } from './factory/fakePost';

mongoose.connect(config.MONGO_URL).then(() => {
    console.log('Connected to MongoDB');
});
const createJobTitle = async () => {
    const arr = [
        {
            title: 'Backend Engineer',
            description:
                'Develops and maintains server-side applications, ensuring optimal performance, scalability, and security for web and mobile platforms.',
        },
        {
            title: 'Data Analyst',
            description:
                'Collects, processes, and analyzes data to provide actionable insights, supporting informed business decisions and process improvements.',
        },
        {
            title: 'DevOps Engineer',
            description:
                'Manages and automates software deployment processes, ensuring continuous integration and delivery for efficient system operations.',
        },
        {
            title: 'Cybersecurity Specialist',
            description:
                'Monitors and protects information systems from threats, ensuring data safety and compliance with security standards.',
        },
        {
            title: 'Mobile App Developer',
            description:
                'Designs and develops applications for mobile platforms like iOS and Android, ensuring smooth user experiences and high performance.',
        },
        {
            title: 'Machine Learning Engineer',
            description:
                'Builds and deploys machine learning models to solve complex problems and enhance system capabilities.',
        },
        {
            title: 'UX Designer',
            description:
                'Researches and designs user interfaces, ensuring intuitive and effective user interactions.',
        },
        {
            title: 'IT Project Manager',
            description:
                'Plans, coordinates, and oversees IT projects, ensuring timely completion within budget constraints.',
        },
        {
            title: 'Technical Support Specialist',
            description:
                'Provides technical assistance to users, effectively resolving hardware and software issues.',
        },
        {
            title: 'System Engineer',
            description:
                'Designs, implements, and maintains system infrastructure, ensuring high availability and performance.',
        },
        {
            title: 'Business Analyst',
            description:
                'Analyzes business requirements and translates them into appropriate technological solutions, supporting process improvements and operational efficiency.',
        },
        {
            title: 'Game Developer',
            description:
                'Designs and programs video games across multiple platforms, creating engaging entertainment experiences for users.',
        },
        {
            title: 'Database Administrator',
            description:
                'Manages and maintains database systems, ensuring data integrity, security, and efficient access.',
        },
        {
            title: 'Network Engineer',
            description:
                'Designs, implements, and manages network systems, ensuring stable and secure connectivity for organizations.',
        },
        {
            title: 'Embedded Software Developer',
            description:
                'Develops and optimizes software for embedded systems, ensuring efficient operation on specific hardware devices.',
        },
        {
            title: 'Blockchain Developer',
            description:
                'Designs and implements applications based on blockchain technology, ensuring secure and transparent transactions.',
        },
        {
            title: 'Cloud Computing Specialist',
            description:
                'Manages and optimizes cloud services, ensuring scalability and performance of online applications and services.',
        },
        {
            title: 'AI Engineer',
            description:
                'Develops and deploys artificial intelligence solutions, from natural language processing to computer vision, to address practical problems.',
        },
        {
            title: 'VR/AR Specialist',
            description:
                'Designs and develops virtual and augmented reality applications, creating unique interactive experiences for users.',
        },
        {
            title: 'UI Developer',
            description:
                'Builds user interface components, ensuring aesthetics and functionality, while optimizing user experiences across various devices.',
        },
        {
            title: 'Full-Stack Developer',
            description:
                'Develops both client and server software, handling front-end interfaces and back-end server logic to ensure seamless application functionality.',
        },
        {
            title: 'Quality Assurance (QA) Engineer',
            description:
                'Designs and executes testing procedures to identify software defects, ensuring products meet quality standards before release.',
        },
        {
            title: 'Technical Writer',
            description:
                'Creates and maintains technical documentation, user guides, and manuals to assist users and developers in understanding software and systems.',
        },
        {
            title: 'IT Support Specialist',
            description:
                'Provides technical assistance to users, troubleshooting hardware and software issues to maintain smooth IT operations.',
        },
        {
            title: 'Cloud Architect',
            description:
                'Designs and manages cloud computing strategies, ensuring scalable, secure, and efficient cloud infrastructure deployment.',
        },
        {
            title: 'IT Consultant',
            description:
                'Offers expert advice to organizations on IT strategies and solutions to enhance business performance and efficiency.',
        },
        {
            title: 'ERP Consultant',
            description:
                'Implements and customizes Enterprise Resource Planning systems to optimize business processes and integrate various functions.',
        },
        {
            title: 'IT Auditor',
            description:
                'Evaluates and assesses an organization’s IT systems, ensuring compliance with regulations and identifying potential risks.',
        },
        {
            title: 'IT Trainer',
            description:
                'Educates employees or clients on IT systems and software, enhancing their technical skills and system understanding.',
        },
        {
            title: 'Robotics Engineer',
            description:
                'Designs, builds, and programs robotic systems for applications in industries such as manufacturing, healthcare, and consumer products.',
        },
        {
            title: 'IoT Developer',
            description:
                'Develops Internet of Things solutions, connecting devices and systems to collect and analyze data for improved operations.',
        },
        {
            title: 'IT Operations Manager',
            description:
                'Oversees daily IT department operations, ensuring systems and services function efficiently and align with organizational goals.',
        },
        {
            title: 'Information Systems Manager',
            description:
                'Manages an organization’s information systems, ensuring they support business operations effectively and securely.',
        },
        {
            title: 'IT Procurement Specialist',
            description:
                'Manages the acquisition of IT equipment and services, ensuring organizational needs are met cost-effectively.',
        },
        {
            title: 'Telecommunications Specialist',
            description:
                'Manages and maintains communication systems, including telephony, video conferencing, and data transmission networks.',
        },
        {
            title: 'IT Asset Manager',
            description:
                'Tracks and manages an organization’s IT assets, ensuring efficient utilization and compliance with regulations.',
        },
        {
            title: 'IT Risk Manager',
            description:
                'Identifies, assesses, and manages IT-related risks, ensuring the organization’s data and systems are secure.',
        },
        {
            title: 'IT Compliance Officer',
            description:
                'Ensures the organization adheres to IT-related regulations and standards, including data security and privacy laws.',
        },
        {
            title: 'IT Vendor Manager',
            description:
                'Manages relationships with IT service and product vendors, ensuring contract terms are met and services are delivered effectively.',
        },
        {
            title: 'IT Change Manager',
            description:
                'Oversees the process of implementing IT system changes, ensuring minimal disruption and effective transition.',
        },
        {
            title: 'Tester (Quality Assurance Tester)',
            description:
                'Performs software testing to identify and report bugs, ensuring the product meets quality standards before release.',
        },
        {
            title: 'Frontend Developer',
            description:
                'Develops the user interface of web applications, focusing on user experience and aesthetics, utilizing technologies such as HTML, CSS, and JavaScript.',
        },
        {
            title: 'Backend Developer',
            description:
                'Builds and maintains the server-side logic of applications, manages databases, and integrates APIs to support frontend functionality.',
        },
        {
            title: 'Business Analyst (BA)',
            description:
                'Analyzes business needs and translates them into technical requirements, acting as a bridge between stakeholders and the development team.',
        },
        {
            title: 'Project Manager (PM)',
            description:
                'Plans, executes, and oversees IT projects, ensuring they are completed on time, within budget, and meet the defined objectives.',
        },
        {
            title: 'Security Analyst',
            description:
                'Monitors systems to detect security threats, implements preventive measures, and responds to security incidents.',
        },
        {
            title: 'Network Administrator',
            description:
                'Manages and maintains an organization’s computer networks, ensuring stable connectivity and resolving network-related issues.',
        },
        {
            title: 'Systems Analyst',
            description:
                'Evaluates and improves existing IT systems, proposing solutions to enhance efficiency and productivity.',
        },
        {
            title: 'Technical Support Engineer',
            description:
                'Provides technical assistance to customers or staff, resolving hardware and software issues.',
        },
        {
            title: 'IT Coordinator',
            description:
                'Coordinates IT activities within an organization, ensuring systems and networks operate efficiently.',
        },
        {
            title: 'Software Architect',
            description:
                'Designs the overall structure of software applications, making key technical decisions regarding design and platform.',
        },
        {
            title: 'Data Engineer',
            description:
                'Builds and manages data infrastructure, ensuring efficient collection, storage, and processing of data for analysis.',
        },
        {
            title: 'Scrum Master',
            description:
                'Leads development teams following Agile methodologies, ensuring Scrum processes are adhered to and removing obstacles during development.',
        },
        {
            title: 'Product Manager',
            description:
                'Manages the product lifecycle from conception to release, working with cross-functional teams to ensure the product meets market needs.',
        },
        {
            title: 'Release Manager',
            description:
                'Oversees the software release process, coordinating between teams to ensure versions are deployed smoothly.',
        },
        {
            title: 'IT Support Technician',
            description:
                'Provides first-level technical support to end-users, resolving basic hardware and software issues.',
        },
        {
            title: 'Application Support Analyst',
            description:
                'Supports and maintains software applications, troubleshooting issues and providing updates as necessary.',
        },
        {
            title: 'IT Director',
            description:
                'Oversees the strategy and operations of the IT department, ensuring systems support the organization’s business goals.',
        },
        {
            title: 'Chief Information Officer (CIO)',
            description:
                'Leads the organization’s IT strategy, ensuring technology initiatives align with overall business objectives.',
        },
        {
            title: 'Chief Technology Officer (CTO)',
            description:
                'Oversees the development and implementation of new technologies, guiding technical strategy and ensuring competitive advantage through innovation.',
        },
    ];
    arr.map(async (item) => {
        const jobTitle = await jobTitleService.create(item);
    });
};
const createUser = async () => {
    for (let i = 0; i < 20; i++) {
        await fakeUser();
        console.log('done ' + i);
    }
};
const main = async () => {
    try {
        await createJobTitle();
    } catch (error) {
        console.log('job title error');
    }
    createUser();
};

main();
