export default function Home() {
    return (
        <>
            <div className='capitalize text-2xl font-semibold mb-8'>
                long running workflow demo
            </div>
            <div className='mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left'>
                <a
                    href='/toggle'
                    className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
                >
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        Toggle{' '}
                        <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
                            -&gt;
                        </span>
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        Push button to invoke toggle API with auth
                    </p>
                </a>
            </div>
        </>
    )
}
