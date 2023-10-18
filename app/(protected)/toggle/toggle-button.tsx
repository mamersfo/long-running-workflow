'use client'

import { useState } from 'react'

export default function ToggleButton() {
    const [state, setState] = useState('inactive')

    const handleToggle = async () => {
        console.log('toggle')

        const response = await fetch('/api/toggle', {
            method: 'POST',
            body: JSON.stringify({}),
        })

        if (response.ok) {
            let json = await response.json()
            setState(json.state)
        } else {
            setState('error')
        }
    }

    return (
        <div className='p-4'>
            <input
                className='btn'
                type='button'
                value={state}
                onClick={handleToggle}
            />
        </div>
    )
}
