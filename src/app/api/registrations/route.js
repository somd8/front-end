import { NextResponse } from 'next/server';
//import prisma from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function POST(req) {
  try {
    // Verify authentication
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const {
      registrationType,
      studentName,
      studentId,
      cid,
      program,
      year,
      semester,
      studentEmail,
      phoneNumber,
      parentName,
      parentPhone,
      hasBackModules,
      backModules,
      paymentMethod,
      paymentProof,
      residenceType,
      totalFee
    } = await req.json();

    // Create registration
    const registration = await prisma.registration.create({
      data: {
        userId: decoded.userId,
        registrationType,
        studentName,
        studentId,
        cid,
        program,
        year,
        semester,
        studentEmail,
        phoneNumber,
        parentName,
        parentPhone,
        hasBackModules,
        paymentMethod,
        paymentProof,
        residenceType,
        totalFee,
        backModules: hasBackModules ? {
          create: backModules.map(module => ({
            moduleName: module.moduleName,
            moduleCode: module.moduleCode
          }))
        } : undefined
      },
      include: {
        backModules: true
      }
    });

    return NextResponse.json(registration);
  } catch (error) {
    console.error('Registration submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit registration' },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    // Verify authentication
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Get user's registrations
    const registrations = await prisma.registration.findMany({
      where: {
        userId: decoded.userId
      },
      include: {
        backModules: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(registrations);
  } catch (error) {
    console.error('Get registrations error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch registrations' },
      { status: 500 }
    );
  }
} 