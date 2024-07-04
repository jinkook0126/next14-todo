import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await auth();
  console.log(session);
  return NextResponse.json({
    success: true,
    foo: "bar",
  });
}
