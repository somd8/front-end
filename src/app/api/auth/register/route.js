import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { studentId, password, email, fullName } = await req.json();

    // Validate input
    if (!studentId || !password || !email || !fullName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // In a real application, you would save to a database
    // For now, we'll use localStorage (handled on the client side)
    // This API endpoint will just return a success response
    
    return NextResponse.json({
      success: true,
      message: 'Registration successful'
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to register' },
      { status: 500 }
    );
  }
} 