import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Task from '@/models/Task';
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

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const priority = searchParams.get('priority');
        const search = searchParams.get('search');

        const query = { userId };

        if (status) query.status = status;
        if (priority) query.priority = priority;

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        const tasks = await Task.find(query).sort({ createdAt: -1 });

        return NextResponse.json(
            {
                success: true,
                data: tasks,
                count: tasks.length,
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

export async function POST(request) {
    try {
        await connectDB();

        const userId = getUserFromRequest(request);

        if (!userId) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { title, description, status, priority, dueDate } = await request.json();

        if (!title) {
            return NextResponse.json(
                { success: false, message: 'Title is required' },
                { status: 400 }
            );
        }

        const task = await Task.create({
            title,
            description,
            status,
            priority,
            dueDate,
            userId,
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Task created',
                data: task,
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Server error' },
            { status: 500 }
        );
    }
}
