import React from 'react'
import Heading from '../UI/Heading'
import { v4 } from 'uuid'

import { TbCalendarTime } from 'react-icons/tb'

const Box = ({ children }) => (
    <div className="p-6 border-2 border-white/20 rounded-lg flex flex-col gap-6 break-before-page print:gap-4 print:p-0">
        {children}
    </div>
)

const Dates = ({ children }) => (
    <div className="btn-gap text-designlyRight ml-auto">
        <TbCalendarTime />
        <div>{children}</div>
    </div>
)

const BoxHeading = ({ children }) => (
    <Heading type='h4' appendClass="border-b-2 border-white/20 pb-1 px-1">{children}</Heading>
)

const Job = ({
    company,
    location,
    title,
    dates,
    desc,
    skills
}) => (
    <Box>
        <div className="grid grid-cols-3 [&>*]:mb-auto">
            <div className="flex flex-col gap-1">
                <Heading type='h3' appendClass="text-designlyLeft">{company}</Heading>
                <div>{location}</div>
            </div>
            <h4 className="text-xl text-designlyMiddle print:text-md text-center">{title}</h4>
            <Dates>{dates}</Dates>
        </div>
        <BoxHeading>Job Description</BoxHeading>
        <ul className="flex flex-col gap-2 px-2">
            {desc.map(d => <li key={v4()}>• {d}</li>)}
        </ul>
        <BoxHeading>Skills</BoxHeading>
        <ul className="grid grid-cols-3 [&>*]:mb-4">
            {
                skills.map(s => <li key={v4()}>• {s}</li>)
            }
        </ul>
    </Box>
)

export default function Resume() {
    return (
            <div className="min-h-screen bg-bg2 flex flex-col gap-10 px-4 md:px-10 lg:px-[20%] py-20 print:py-6 print:gap-2">
                <div className="flex flex-col gap-2">
                    <Heading type='h1' appendClass="text-center">Jay Simons</Heading>
                    <h2 className="text-center text-xl">Software Engineer</h2>
                </div>
                <h2 className="font-bold text-3xl">I. Work History</h2>
                <Job
                    company="Designly"
                    location="Madison, WI"
                    title="Web Developer"
                    dates="2008-Present"
                    desc={[
                        "Designed and built company websites and e-commerce stores for various clients using WordPress, Shopify, and custom CMS platforms.",
                        "Front-end development using React/Next.js frameworks",
                        "Back-end development using Node.js/Express, PHP/Laravel and serverless solutions such as CloudFlare & AWS.",
                        "Database design using MySQL, MS SQL, Postgre and MongoDB",
                        "Stayed current with the latest web development technologies and trends to ensure the company's solutions were cutting-edge and innovative."
                    ]}
                    skills={[
                        "HTML, CSS, JavaScript",
                        "React/Next.js",
                        "PHP/Laravel",
                        "NGINX/PHP-FPM/MySQL",
                        "Photoshop/Illustrator",
                        "Figma/XD",
                        "API Development",
                        "CloudFlare/AWS/Google Cloud",
                        "Serverless Architecture"
                    ]}
                />
                <Job
                    company="Vortex Optics"
                    location="Middleton, WI"
                    title="Director of IT"
                    dates="2005-2008"
                    desc={[
                        "Re-designed an obsolete in-house IT infrastructure",
                        "Managed complete custom re-design of e-commerce platform",
                        "Identified and outsourced certain mission-critical services",
                        "Identified and mitigated bottlenecks in information and workflows",
                        "Integrated several departments, such as online orders -> shipping/receiving -> accounting"
                    ]}
                    skills={[
                        "HTML, CSS, JavaScript",
                        "Linux/Apache/PHP/MySQL",
                        "Windows Server 2003",
                        "Windows Terminal Services",
                        "Central Backup & Deployment",
                        "Active Directory / SSO",
                        "DNS Management",
                        "Datacenter Management",
                        "Database Design & Management"
                    ]}
                />
                <Job
                    company="Terracom"
                    location="Madison, WI"
                    title="Systems Administrator"
                    dates="2003-2005"
                    desc={[
                        "Managed several OpenBSD servers",
                        "Managed several Portmaster dialup networking modem banks",
                        "Managed QoS & contention ratio for 20k dialup subscribers",
                        "Engineered wireless 802.11A point-to-point & point-to-multipoint networks",
                        "Conducted wireless site surveys for potential clients"
                    ]}
                    skills={[
                        "OpenBSD systems administration",
                        "Management dialup networking equipment",
                        "802.11A/B wireless networking",
                        "Network engineering",
                        "Outside sales & site surveys",
                        "Top-tier technical support"
                    ]}
                />
                <Job
                    company="JVLNET Internet Services"
                    location="Janesville, WI"
                    title="Technical Support Supervisor"
                    dates="2001-2003"
                    desc={[
                        "Managed Internet provider support call center with 8-10 staff",
                        "Managed in-house ERP/Radius accounting server",
                        "Sudo access to several Redhat Linux servers",
                        "Managed several Portmaster dialup networking modem banks",
                        "Top-tier technical support",
                        "Inside/outside sales",
                        "Provided onsite services to business clients",
                        "Managed telecommunications systems"
                    ]}
                    skills={[
                        "RedHat Linux",
                        "Windows NT4 / Windows 2000",
                        "MS SQL Server",
                        "Radius/ERP software",
                        "Livingston Portmaster management",
                        "Perl scripting",
                        "Direct-customer support",
                        "Employee training & management",
                        "Call monitoring",
                        "Troubleshooting DUN connections",
                        "Installed / managed ISDN/DS-1/DS-3 & frame-relay connections"
                    ]}
                />
            </div>
    )
}
