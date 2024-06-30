import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const data = await prisma.todos.findMany();
  return NextResponse.json({
    success: true,
    list: data.map((x) => ({ ...x, id: Number(x.id) })),
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { contents } = body;
  await prisma.todos.create({
    data: { contents },
  });

  return NextResponse.json({ success: true });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { done, id } = body;
  await prisma.todos.update({
    where: {
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
  if (id) {
    const numericValue = Number(id);
    await prisma.todos.delete({
      where: {
        id: numericValue,
      },
    });
  }
  return NextResponse.json({ success: true });
}
