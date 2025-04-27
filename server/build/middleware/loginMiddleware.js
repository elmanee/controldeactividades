"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "supersecreto";
class LoginMiddleware {
    constructor() {
        this.verifyToken = (req, res, next) => {
            // Obtener el token del encabezado "Authorization"
            const authHeader = req.header("Authorization");
            const token = authHeader && authHeader.split(" ")[1];
            if (!token) {
                return res.status(401).json({ msg: "Acceso denegado. No hay token." });
            }
            try {
                // Verificar el token
                const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
                req.user = decoded;
                next();
            }
            catch (error) {
                res.status(403).json({ msg: "Token inválido o expirado." });
            }
        };
    }
}
exports.default = new LoginMiddleware();
