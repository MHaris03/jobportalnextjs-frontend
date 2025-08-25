'use-client';

import React from 'react';
import { RiFacebookCircleLine, RiInstagramLine, RiLinkedinLine } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { ImHome } from "react-icons/im";
import Link from 'next/link';



export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 lg:text-left ">
            <div className="mx-6 py-8 text-center md:text-left">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand Section */}
                    <div className="text-white space-y-4">
                        <h6 className="flex items-center justify-center font-bold uppercase text-xl mb-4 md:justify-start">
                            <Link href='/' className="hover:text-sky-500">Aidifys.com</Link>
                        </h6>
                        <p className="text-sm">
                            Discover top UK jobs across IT, healthcare, finance, engineering & more at
                            Aidifys.com. Browse full-time, part-time, remote & freelance job opportunities in major cities like London,
                            Manchester & Birmingham. Start your job search today!
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="text-white space-y-4">
                        <h6 className="mb-4 font-bold uppercase text-lg">Quick Links</h6>
                        <ul className="space-y-2">
                            <li><Link href='/browsejobs' className="hover:text-sky-500">Browse Jobs</Link></li>
                            <li><Link href='/my-job' className="hover:text-sky-500">My Jobs</Link></li>
                            <li><Link href='/post-job' className="hover:text-sky-500">Post Job</Link></li>
                        </ul>
                    </div>

                    {/* Company Section */}
                    <div className="text-white space-y-4">
                        <h6 className="mb-4 font-bold uppercase text-lg">Company</h6>
                        <ul className="space-y-2">
                            <li><Link href='/faq' className="hover:text-sky-500">FAQ's</Link></li>
                            <li><Link href='/contact-us' className="hover:text-sky-500">Contact Us</Link></li>
                            <li><Link href='/about-us' className="hover:text-sky-500">About Us</Link></li>
                            <li><Link href='/terms-conditions' className="hover:text-sky-500">Terms & Conditions</Link></li>
                            <li><Link href='/privacy' className="hover:text-sky-500">Privacy</Link></li>
                            <li><Link href='/sitemap' className="hover:text-sky-500">Sitemap</Link></li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="text-white space-y-4">
                        <h6 className="mb-4 font-bold uppercase text-lg">Contact</h6>
                        <p className="flex items-center justify-center md:justify-start">
                            <ImHome size={20} className='mr-1' />
                            London, N, United Kingdom
                        </p>
                        <p className="flex items-center justify-center md:justify-start cursor-pointer">
                            <MdEmail size={20} className="mr-1" />
                            <Link href="mailto:jobs@aidifys.com">
                                jobs@aidifys.com
                            </Link>
                        </p>
                        {/* <p className="flex items-center justify-center md:justify-start">
              <FaPhone size={20} className='mr-1' />
              +44 6487 415 50
            </p> */}
                    </div>
                </div>
            </div>

            {/* Social Icons */}
            <div className="py-4 flex justify-center">
                <Link href="https://facebook.com" className="mx-2 text-white hover:text-sky-500 transition-transform duration-300">
                    <RiFacebookCircleLine size={30} />
                </Link>
                <Link href="https://www.instagram.com/aidifys.hiring?igsh=MTM3ZjNmbmVtNmR0Yg=="
                    className="mx-2 text-white hover:text-sky-500 transition-transform duration-300"
                    target='blank'
                >
                    <RiInstagramLine size={30} />
                </Link>
                <Link
                    href="https://www.linkedin.com/company/aidifys/"
                    className="mx-2 text-white hover:text-sky-500 transition-transform duration-300"
                    target='blank'
                >
                    <RiLinkedinLine size={30} />
                </Link>
            </div>

            {/* Footer Bottom */}
            <div className="py-4 text-center bg-gray-800">
                <p className="text-white">&copy; {new Date().getFullYear()} Aidifys.com All Rights Reserved.</p>
            </div>
        </footer>
    );
}
