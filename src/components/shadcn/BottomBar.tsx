'use client'
import { MdOutlineDoneOutline } from 'react-icons/md'
import { FaHome } from 'react-icons/fa'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { FaRegBookmark } from 'react-icons/fa'
import { usePathname } from 'next/navigation';
import Link from 'next/link'



export default function BottomBar() {
    const pathname = usePathname();
    const navBarLinks =[
        {
            id: 1,
            icon: <FaHome size={35} />,
            link: '/',
            active: pathname === '/' ?<FaHome size={35} />:null
        },
        {
            id: 2,
            icon: <IoMdAddCircleOutline size={35} />,
            link: '/Add',
            active: pathname === '/Add'
        },
        {
            id: 3,
            icon: <MdOutlineDoneOutline size={32} />,
            link: '/Completed',
            active: pathname === '/Completed'
        },
        {
            id: 4,
            icon: <FaRegBookmark size={32} />,
            link: '/Important',
            active: pathname === '/Important'
        }
    ]
    return(
        <div className="fixed bottom-0 h-20 w-screen bg-transparent z-50">
        <div className="w-full h-full bg-transparent rounded-lg flex justify-center items-center px-3 backdrop-blur-sm border shadow-[-10px_-20px_30px_4px_rgba(0,0,0,0.20),_10px_10px_30px_4px_rgba(45,78,255,0.15)] z-40">
            <div className="w-full flex justify-between items-center px-5">
                {navBarLinks.map((item) => (
                    <Link key={item.id} href={item.link} className={`w-12 h-12 flex flex-col items-center justify-center ${item.active?"shadow-xl shadow-black scale-105 rounded-full -translate-y-3 bg-white z-50 transition-all":"shadow"}`}>
                        {item.icon}
                    </Link>
                ))}
            </div>
        </div>
    </div>
    )
}