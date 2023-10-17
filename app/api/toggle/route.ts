import { NextRequest, NextResponse } from 'next/server'
import { createActor } from 'xstate'
import { kv } from '@vercel/kv'
import { toggleMachine } from '@/lib/machines/toggle'

export async function POST(req: NextRequest) {
    try {
        let state: any = await kv.get('toggle')

        let actor = createActor(toggleMachine, {
            state: state,
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

        state = actor.getPersistedState()
        kv.set('toggle', state)

        return NextResponse.json({ state: state.value })
    } catch (err) {
        console.error('error:', (err as Error).message)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    }
}
