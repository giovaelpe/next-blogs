import { readingList, } from "@/db/schema";
import { db } from "../../db/index";
import { and, eq, like, sql } from "drizzle-orm";
import { getCurrentUser } from "./session";

export const getReadlingList = async (id: number, read:boolean = false) => {
    return await db.query.readingList.findMany({
        where: and(
            eq(readingList.userId, id),
            eq(readingList.read, read)
        ),
        with: {
            blog: true
        }
    })
}



export const checkReadingList = async (id: number): Promise<boolean> => {
    const user = await getCurrentUser();
    if (!user) {
        return false;
    }
    const check = await db.query.readingList.findFirst({
        where: and(
            eq(readingList.userId, user.id),
            eq(readingList.blogId, id)
        )
    });
    if (check) {
        return true
    }
    return false;
}