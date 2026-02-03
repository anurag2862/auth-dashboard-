import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { generateToken } from '@/lib/auth';

export async function POST(request) {
    try {
        await connectDB();

        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: 'Provide email and password' },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'Invalid credentials' },
                { status: 401 }
            );
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return NextResponse.json(
                { success: false, message: 'Invalid credentials' },
                { status: 401 }
            );
        }

        const token = generateToken(user._id);

        return NextResponse.json(
            {
                success: true,
                message: 'Login successful',
                data: {
                    token,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                    },
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { success: false, message: 'Something went wrong' },
            { status: 500 }
        );
    }
}
