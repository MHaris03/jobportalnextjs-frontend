"use client";

import Head from "next/head";
import { motion } from "framer-motion";


export default function AboutPage() {
    const cardVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: (i = 1) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i * 0.2,
                duration: 0.6,
                ease: "easeOut",
            },
        }),
    };

    const cards = [
        {
            title: "Effortless Job Applications",
            desc: "Find roles tailored to your skills and preferences in minutes.",
        },
        {
            title: "Company Insights",
            desc: "Understand company culture and values before you apply.",
        },
        {
            title: "Advanced Filters",
            desc: "Search smarter with location, type, salary, and skill filters.",
        },
        {
            title: "Empowering Job Seekers",
            desc: "Our platform isn’t just about finding jobs — it’s about building futures.",
        },
    ];
    return (
        <>
            <Head>
                <title>About Us - Aidifys</title>
                <meta
                    name="description"
                    content="Learn more about Aidifys, our mission, values, and commitment to connecting job seekers with top opportunities across industries."
                />
                <meta property="og:title" content="About Us - Aidifys" />
                <meta
                    property="og:description"
                    content="Discover the story behind Aidifys. Our platform is dedicated to empowering job seekers and businesses with innovative hiring solutions."
                />
                <meta
                    property="og:image"
                    content="https://www.aidifys.com/Aidifys-hiring.jpg"
                />
                <meta property="og:url" content="https://www.aidifys.com/about-us" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:image"
                    content="https://www.aidifys.com/Aidifys-hiring.jpg"
                />
            </Head>

            <section className="bg-gradient-to-br from-white via-blue-50 to-white py-16">
                <div className="container mx-auto px-6 md:px-12 lg:px-24">
                    {/* Hero Section */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-sky-600 mb-3">
                            About Aidifys
                        </h1>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            Empowering careers, simplifying hiring — discover our mission and
                            how we connect job seekers with life-changing opportunities.
                        </p>
                    </div>

                    {/* Section Content */}
                    <div className="space-y-10 text-gray-700 leading-relaxed text-[17px]">
                        <p>
                            At <span className="font-semibold text-sky-600">Aidifys Hiring</span>, we believe in turning
                            career dreams into reality. Whether you're an aspiring
                            professional or a seasoned expert, our platform is designed to
                            simplify your job search and connect you with meaningful
                            opportunities.
                        </p>

                        <p>
                            Think of the job market as Wonderland—confusing, fast-paced, and
                            full of surprises. We’re here to guide you through it. From
                            helping you discover the right path to showcasing your potential
                            to employers, we transform job-hunting into a seamless experience.
                        </p>

                        <p>
                            Our mission is to bridge the gap between talent and opportunity by
                            offering an intuitive, transparent, and empowering job portal.
                            Whether you're hiring or getting hired, Aidifys makes the process
                            smooth, accessible, and human-centered.
                        </p>
                    </div>

                    {/* Feature Highlights */}
                    <div className="mt-14">
                        <h2 className="text-2xl font-semibold text-sky-500 mb-4">
                            What Makes Aidifys Unique?
                        </h2>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800"
                        >
                            {cards.map((card, index) => (
                                <motion.div
                                    key={index}
                                    custom={index}
                                    variants={cardVariants}
                                    className="p-4 bg-white border rounded-lg shadow hover:shadow-md transition cursor-default"
                                >
                                    <h4 className="font-bold mb-2 text-sky-600">{card.title}</h4>
                                    <p>{card.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                </div>
            </section>
        </>
    );
}
