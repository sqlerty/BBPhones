import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({ message: 'Вышли из системы' });
    response.cookies.set('auth_token', '', { expires: new Date(0) });
    return response;
}