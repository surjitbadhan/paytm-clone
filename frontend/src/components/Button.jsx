import {motion} from 'motion/react'
export function Button({label, onClick}) {
    return <motion.button   
    onClick={onClick} type="button" className="mt-4 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-gradient-to-r from-[#00d4ff] to-[#1b0979]">{label}</motion.button>
}