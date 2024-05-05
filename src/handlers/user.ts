import {prisma} from "../db";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";

export const createUser = async (req, res, next) => {
    try {
        const {username, password} = req.body;

        const user = await prisma.user.create({
            data: {
                username: username,
                password: await hashPassword(password),
            }
        });

        const token = createJWT(user);
        res.json({token});
    } catch (e) {
        e.type = "input";
        next(e);
    }
}

export const signin = async (req, res) => {
    const {username, password} = req.body;
    console.log(username, password);
    const user = await prisma.user.findUnique({
        where: {
            username: username,
        }
    });

    if (!user) {
        res.status(401);
        res.json({message: "User not found"});
        return;
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
        res.status(401);
        res.json({message: "Invalid password"});
        return;
    }

    const token = createJWT(user);
    res.json({token});
}