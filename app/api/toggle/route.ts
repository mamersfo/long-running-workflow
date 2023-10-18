import { NextRequest, NextResponse } from 'next/server'
import { createActor } from 'xstate'
import { kv } from '@vercel/kv'
import { auth } from '@clerk/nextjs'
import { toggleMachine } from '@/lib/machines/toggle'

export async function POST(req: NextRequest) {
    try {
        const { userId } = auth()

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        console.log('userId:', userId)

        let state: any = await kv.hget(userId, 'toggle')

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
        kv.hset(userId, { toggle: state })

        return NextResponse.json({ state: state.value })
    } catch (err) {
        return NextResponse.json(
            { error: (err as Error).message },
            { status: 500 }
        )
    }
}
