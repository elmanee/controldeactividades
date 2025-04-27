import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecreto";

class LoginMiddleware {
  verifyToken = (req: Request, res: Response, next: NextFunction) => {
    // Obtener el token del encabezado "Authorization"
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "Acceso denegado. No hay token." });
    }

    try {
      // Verificar el token
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string }; 
      (req as any).user = decoded; 
      next();
    } catch (error) {
      res.status(403).json({ msg: "Token inválido o expirado." });
    }
  };
}

export default new LoginMiddleware();