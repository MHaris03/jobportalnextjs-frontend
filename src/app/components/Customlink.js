'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const CustomLink = ({ path, title }) => {
    const pathname = usePathname();
    const isActive = pathname === path;

    return (
        <Link href={path}>
            <span
                className={`relative group p-1 ${isActive ? 'border-b-2 border-blue text-primary' : ''}`}
            >
                {title}
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </span>
        </Link>
    );
};

export default CustomLink;
