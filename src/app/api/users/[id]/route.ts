import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { userUpdateSchema } from "@/lib/validation";

type Params = { params: { id: string } };

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const user = await prisma.user.findUnique({ where: { id: params.id } });
    if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ data: user }, { status: 200 });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const json = await req.json();
    const parsed = userUpdateSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const updated = await prisma.user.update({
      where: { id: params.id },
      data: parsed.data,
    });

    return NextResponse.json({ data: updated }, { status: 200 });
  } catch (e: any) {
    if (e?.code === "P2025") {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    if (e?.code === "P2002") {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }
    console.error(e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.delete({
      where: { id: params.id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

 
    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("DELETE error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to delete user" },
      { status: 500 }
    );
  }
}
