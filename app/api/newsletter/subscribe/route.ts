import { NextResponse } from 'next/server';
import { z } from 'zod';

const newsletterSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi girin'),
  name: z.string().optional(),
});

// Simple in-memory store (replace with database in production)
const subscribers = new Map<string, { email: string; name?: string; subscribedAt: Date }>();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const validation = newsletterSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Geçersiz giriş', details: validation.error.errors },
        { status: 400 }
      );
    }

    const { email, name } = validation.data;

    // Check if already subscribed
    if (subscribers.has(email)) {
      return NextResponse.json(
        { error: 'Bu e-posta adresi zaten kayıtlı' },
        { status: 409 }
      );
    }

    // Add subscriber
    subscribers.set(email, {
      email,
      name,
      subscribedAt: new Date(),
    });

    // TODO: Send confirmation email
    // TODO: Integrate with email service (Resend, Mailchimp, etc.)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Bültene başarıyla abone oldunuz!' 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Abonelik sırasında bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return subscriber count (admin only in production)
  return NextResponse.json({
    count: subscribers.size,
  });
}
