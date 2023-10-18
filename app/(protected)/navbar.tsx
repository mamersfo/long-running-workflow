import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'

export default function Navbar() {
    return (
        <div className='navbar bg-base-100'>
            <div className='flex-1'>
                <Link className='btn btn-ghost normal-case text-xl' href='/'>
                    protected
                </Link>
            </div>
            <div className='flex flex-row gap-4'>
                <div className='dropdown dropdown-end'>
                    <UserButton afterSignOutUrl='/' showName={false} />
                </div>
            </div>
        </div>
    )
}
