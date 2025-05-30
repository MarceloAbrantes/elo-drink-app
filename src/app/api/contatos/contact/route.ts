// app/api/contatos/contact/route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import fs from 'fs/promises';


const prisma = new PrismaClient();

export async function POST(req: Request) {
  const formData = await req.formData();

  const name = formData.get('name')?.toString() || '';
  const phone = formData.get('phone')?.toString() || '';
  const email = formData.get('email')?.toString() || '';
  const message = formData.get('message')?.toString() || '';
  const file = formData.get('file') as File | null;

  if (!name || !phone || !email || !message) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  let fileUrl: string | null = null;

  if (file) {
    // Optional: Save file to disk, cloud, or store as base64 (not recommended for large files)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadPath = `./public/uploads/${Date.now()}-${file.name}`;
    await fs.writeFile(uploadPath, buffer);

    fileUrl = `/uploads/${Date.now()}-${file.name}`;
  }

  const saved = await prisma.contact.create({
    data: {
      name,
      phone,
      email,
      message,
      fileUrl,
    },
  });

  return NextResponse.json({ success: true, saved });
}