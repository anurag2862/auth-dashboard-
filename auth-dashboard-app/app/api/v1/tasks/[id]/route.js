import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Task from '@/models/Task';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request, { params }) {
    try {
        await connectDB();

        const userId = getUserFromRequest(request);

        if (!userId) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const task = await Task.findOne({ _id: params.id, userId });

        if (!task) {
            return NextResponse.json(
                { success: false, message: 'Not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                data: task,
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

export async function PUT(request, { params }) {
    try {
        await connectDB();

        const userId = getUserFromRequest(request);

        if (!userId) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const task = await Task.findOneAndUpdate(
            { _id: params.id, userId },
            body,
            { new: true, runValidators: true }
        );

        if (!task) {
            return NextResponse.json(
                { success: false, message: 'Not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Task updated',
                data: task,
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

export async function DELETE(request, { params }) {
    try {
        await connectDB();

        const userId = getUserFromRequest(request);

        if (!userId) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const task = await Task.findOneAndDelete({ _id: params.id, userId });

        if (!task) {
            return NextResponse.json(
                { success: false, message: 'Not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Task deleted',
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
