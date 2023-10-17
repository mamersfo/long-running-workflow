import { NextRequest, NextResponse } from 'next/server'
import { createActor, createMachine } from 'xstate'

let globalState: any

export const toggleMachine = createMachine({
    id: 'toggle',
    initial: 'inactive',
    states: {
        inactive: {
            on: {
                toggle: 'active',
            },
        },
        active: {
            on: {
                toggle: 'inactive',
            },
        },
    },
})

export async function POST(req: NextRequest) {
    let actor = createActor(toggleMachine, {
        state: globalState,
    })

    actor.subscribe({
        next(snapshot) {
            console.log('next - state:', snapshot.value)
            console.log('next - context:', snapshot.context)
        },
        complete() {
            console.log('complete')
        },
    })

    actor.start()

    actor.send({ type: 'toggle' })

    globalState = actor.getPersistedState()

    return NextResponse.json({ state: globalState.value })
}