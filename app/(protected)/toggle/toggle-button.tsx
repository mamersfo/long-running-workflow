'use client'

import { useState } from 'react'

export default function ToggleButton() {
    const [state, setState] = useState('inactive')

    const handleToggle = async () => {
        const response = await fetch('/api/toggle', {
            method: 'POST',
            body: JSON.stringify({}),
        })

        let json = await response.json()
        console.log('toggle', json)

        if (response.ok) {
            setState(json.state)
        } else {
            console.log('error:', json)
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
