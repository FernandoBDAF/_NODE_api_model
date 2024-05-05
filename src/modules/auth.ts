import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const comparePassword = async (password, hash) => {
    return bcrypt.compare(password, hash);
}

export const hashPassword = async (password) => {
    return bcrypt.hash(password, 10);
}

export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.name },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return token;
};

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization;

    if (!bearer) {
        res.status(401);
        res.json({message: "You are not authorized"})
        return;
    }

    const [_, token] = bearer.split(" ");

    if (!token) {
        res.status(401);
        res.json({message: "You do not have a token"})
        return;
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next()
    } catch (error) {
        res.status(401);
        res.json({message: "Not a valid token"})
    }
}