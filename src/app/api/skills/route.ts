import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
    try {
        const { id } = await request.json()

        if (!id) {
            return NextResponse.json({ error: 'Skill ID required' }, { status: 400 })
        }

        const updatedSkill = await prisma.skill.update({
            where: { id },
            data: {
                count: {
                    increment: 1
                }
            }
        })

        return NextResponse.json(updatedSkill)
    } catch (error) {
        console.error("Endorse error:", error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
