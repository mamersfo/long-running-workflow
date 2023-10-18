import { ClerkProvider } from '@clerk/nextjs'
import Navbar from './navbar'

export default function ShopLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider>
            <div className='flex flex-col gap-2 w-full'>
                <Navbar />
                {children}
            </div>
        </ClerkProvider>
    )
}
