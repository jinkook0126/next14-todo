import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const session = await auth();

  const data = await prisma.todos.findMany({
    where: {
      email: session?.user?.email,
    },
  });
  return NextResponse.json({
    success: true,
    list: data.map((x) => ({ ...x, id: Number(x.id) })),
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { contents } = body;
  const session = await auth();
  const res = await prisma.todos.create({
    data: { contents, email: session?.user?.email },
  });
  return NextResponse.json({
    success: true,
    row: { id: Number(res.id), contents: res.contents, done: res.done },
  });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const session = await auth();
  const { done, id } = body;
  await prisma.todos.update({
    where: {
      email: session?.user?.email,
      id,
    },
    data: {
      done,
    },
  });
  return NextResponse.json({ success: true });
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const url = new URL(request.url);
  const queryParams = new URLSearchParams(url.searchParams);
  const id = queryParams.get("id");
  const session = await auth();
  if (id) {
    const numericValue = Number(id);
    await prisma.todos.delete({
      where: {
        id: numericValue,
        email: session?.user?.email,
      },
    });
  }
  return NextResponse.json({ success: true });
}
