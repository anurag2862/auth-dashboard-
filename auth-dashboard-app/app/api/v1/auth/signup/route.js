import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { generateToken } from '@/lib/auth';

export async function POST(request) {
    try {
        await connectDB();

        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json(
                { success: false, message: 'Please provide all fields' },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { success: false, message: 'Password too short' },
                { status: 400 }
            );
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { success: false, message: 'Email already exists' },
                { status: 400 }
            );
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        const token = generateToken(user._id);

        return NextResponse.json(
            {
                success: true,
                message: 'Account created',
                data: {
                    token,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                    },
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { success: false, message: 'Something went wrong' },
            { status: 500 }
        );
    }
}
