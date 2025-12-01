import { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";
import prisma from "../../prisma/client";

export async function findOrCreateUser(req: Request, _res: Response, next: NextFunction) {
    try {
        const auth = getAuth(req);
        const userId = auth.userId;
        
        if (userId) {
            let user = await prisma.user.findUnique({
                where: { id: userId }
            });

            if (!user) {
                user = await prisma.user.create({
                    data: { id: userId }
                });
            }
        }

        (req as any).userId = userId;
        next();
    } catch (error) {
        console.error("Error in findOrCreateUser middleware:", error);
        next(error);
    }
}
