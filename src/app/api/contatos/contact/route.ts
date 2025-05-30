import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import nodemailer from 'nodemailer';

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
  let attachments = [];

  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uniqueFilename = `${Date.now()}-${file.name}`;
    const uploadPath = path.join(process.cwd(), 'public', 'uploads', uniqueFilename);

    await fs.writeFile(uploadPath, buffer);
    fileUrl = `/uploads/${uniqueFilename}`;

    attachments.push({
      filename: file.name,
      path: uploadPath,
    });
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

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false,
    },
  });

  await transporter.sendMail({
    from: `"Nova Mensagem" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: 'Novo Contato em Elo Drinks',
    html: `
      <h2>Nova Mensagem:</h2>
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Telefone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mensagem:</strong><br/>${message}</p>
    `,
    attachments,
  });

  return NextResponse.json({ success: true, saved });
}