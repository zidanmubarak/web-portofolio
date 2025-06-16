import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Buat transporter Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Kirim email
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Alamat pengirim (biasanya email Anda sendiri)
      to: process.env.EMAIL_RECEIVER, // Alamat email penerima (email Anda yang akan menerima pesan)
      subject: `Pesan Baru dari Formulir Kontak: ${subject}`,
      html: `
        <p>Anda menerima pesan baru dari formulir kontak website Anda.</p>
        <p><strong>Nama:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subjek:</strong> ${subject}</p>
        <p><strong>Pesan:</strong><br>${message}</p>
      `,
    });

    return NextResponse.json(
      { message: "Pesan berhasil dikirim!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Gagal mengirim pesan:", error);
    return NextResponse.json(
      { message: "Gagal mengirim pesan." },
      { status: 500 }
    );
  }
}
