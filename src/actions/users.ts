"use server";

import { eq } from "drizzle-orm";
import { db } from "~/db/drizzle";
import { User, users } from "~/db/schema";

export async function getUsers() {
  try {
    const allUsers = await db.select().from(users);
    return allUsers;
  } catch (error) {
    throw error;
  }
}

export async function createUser(
  user: Omit<User, "id" | "createdAt" | "updatedAt">
) {
  try {
    await db.insert(users).values({
      email: user.email,
      username: user.username,
      password: user.password,
    });
  } catch (error) {
    throw error;
  }
}

export async function updateUser(user: Omit<User, "createdAt" | "updatedAt">) {
  try {
    await db
      .update(users)
      .set({
        email: user.email,
        username: user.username,
        password: user.password,
      })
      .where(eq(users.id, user.id));
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(id: number) {
  try {
    await db.delete(users).where(eq(users.id, id));
  } catch (error) {
    throw error;
  }
}
