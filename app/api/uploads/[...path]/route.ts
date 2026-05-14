import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

type RouteParams = {
    params: Promise<{ path: string[] }>;
};

export async function GET(req: NextRequest, { params }: RouteParams) {
    try {
        const { path: pathParts } = await params;
        const filePath = path.join(process.cwd(), 'uploads', ...pathParts);

        const fileBuffer = await readFile(filePath);
        const ext = path.extname(filePath).toLowerCase();
        const mimeTypes: Record<string, string> = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.webp': 'image/webp',
        };

        return new NextResponse(fileBuffer, {
            headers: {
                'Content-Type': mimeTypes[ext] || 'application/octet-stream',
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch (e: unknown) {
        console.error('Ошибка при чтении файла:', e);
        return NextResponse.json({ error: 'Файл не найден' }, { status: 404 });
    }
}
