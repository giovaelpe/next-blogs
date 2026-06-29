import { db } from "@/db"
import { users } from "@/db/schema"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export const POST = async (req: NextRequest) => {
    if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
            { error: "This endpoint is not available in production" },
            { status: 403 },
        )
    }
    const body = await req.json();
    if (!body.name || !body.username || !body.password) {
        return NextResponse.json({ error: "body not complete" }, { status: 400 });
    }
    const passwordHash = await bcrypt.hash(body.password, 10);
    await db.insert(users).values({ username: body.username, name: body.name, passwordHash });
    return NextResponse.json({ message: "User created" }, { status: 201 });

}