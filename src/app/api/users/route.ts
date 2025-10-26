import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { userCreateSchema } from "@/lib/validation";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = (searchParams.get("q") || "").trim();
    const roleParam = (searchParams.get("role") || "").trim().toUpperCase();
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const AND: any[] = [];
    if (q) AND.push({ name: { contains: q, mode: "insensitive" as any } });
    if (roleParam && ["ADMIN", "EDITOR", "VIEWER"].includes(roleParam))
      AND.push({ role: roleParam });

    const where = AND.length ? { AND } : {};

    const total = await prisma.user.count({ where });
    const users = await prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    });

    return NextResponse.json({ data: users, total, page, limit }, { status: 200 });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = userCreateSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const user = await prisma.user.create({
      data: parsed.data,
    });

    return NextResponse.json({ data: user }, { status: 201 });
  } catch (e: any) {
    if (e?.code === "P2002") {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }
    console.error(e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
