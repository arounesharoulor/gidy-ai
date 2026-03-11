import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
    try {
        const profile = await prisma.profile.findFirst({
            include: {
                skills: {
                    orderBy: { count: 'desc' }
                },
                socialLinks: true,
                experiences: {
                    orderBy: { startDate: 'desc' }
                },
                educations: {
                    orderBy: { duration: 'desc' }
                },
                projects: true
            }
        })

        // We expect there's only one profile since it's a profile app replica.
        if (!profile) {
            return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
        }

        return NextResponse.json(profile)
    } catch (error) {
        console.error("GET error:", error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json()
        const { id, name, bio, location, email, phone, profilePicture } = body

        if (!id) {
            return NextResponse.json({ error: 'Profile ID required' }, { status: 400 })
        }

        const updatedProfile = await prisma.profile.update({
            where: { id },
            data: {
                name,
                bio,
                location,
                email,
                phone,
                profilePicture
            },
            include: {
                skills: true,
                socialLinks: true,
                experiences: true,
                educations: true,
                projects: true
            }
        })

        return NextResponse.json(updatedProfile)
    } catch (error) {
        console.error("PUT error:", error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
