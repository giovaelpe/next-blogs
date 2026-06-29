import { like } from "drizzle-orm";
import { db } from "../../db/index";
import { users } from "../../db/schema"

export const getAllUsers = async () => {
    return db.query.users.findMany({});
}

export const getOneUser = async (username: string) => {
    return db.query.users.findFirst({
        where: like(users.username, `%${username}%`),
        with: { blogs: true }
    })
}

export const getUserWithToken = async (token: string) => {
    return db.query.users.findFirst({
        where: like(users.token, `%${token}%`),
        with: { blogs: true },
        columns: {
            id: true,
            name: true,
            username: true,
        }
    })
}