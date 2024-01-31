import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { issueSchema } from '../../validationSchemas';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = issueSchema.safeParse(body);

  // send errors if the request is not valid
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
      status: body.status
    }
  });
  return NextResponse.json(newIssue, { status: 201 });
}
