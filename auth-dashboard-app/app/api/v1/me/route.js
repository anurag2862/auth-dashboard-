import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request) {
    try {
        await connectDB();

        const userId = getUserFromRequest(request);

        if (!userId) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                data: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    bio: user.bio,
                    avatar: user.avatar,
                    createdAt: user.createdAt,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Server error' },
            { status: 500 }
        );
    }
}

export async function PUT(request) {
    try {
        await connectDB();

        const userId = getUserFromRequest(request);

        if (!userId) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { name, bio, avatar } = await request.json();

        const updateData = {};
        if (name) updateData.name = name;
        if (bio) updateData.bio = bio;
        if (avatar) updateData.avatar = avatar;

        const user = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Profile updated',
                data: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    bio: user.bio,
                    avatar: user.avatar,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Server error' },
            { status: 500 }
        );
    }
}
