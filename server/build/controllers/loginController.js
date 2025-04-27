"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const database_1 = __importDefault(require("../database"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "supersecreto";
class LoginController {
    // Registrar Usuario
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            try {
                //Verificar si el usuario ya existe
                const [rows] = yield database_1.default.query("SELECT * FROM users WHERE email = ?", [email]);
                if (rows.length > 0) {
                    return res.status(400).json({ msg: "El usuario ya existe" });
                }
                // Encriptar contraseña
                const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
                // Insertar en la base de datos
                yield database_1.default.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);
                res.status(201).json({ msg: "Usuario registrado correctamente" });
            }
            catch (error) {
                res.status(500).json({ msg: "Error en el servidor", error });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const [rows] = yield database_1.default.query("SELECT * FROM users WHERE email = ?", [email]);
                const users = rows;
                if (users.length === 0) {
                    return res.status(400).json({ msg: "Credenciales inválidas" });
                }
                const user = users[0];
                // comparar la contraseña ingresada con la encriptada en la base de datos
                const esIgual = yield bcryptjs_1.default.compare(password, user.password);
                if (!esIgual) {
                    return res.status(400).json({ msg: "Credenciales inválidas" });
                }
                //aqui se genera el JWT
                const token = jsonwebtoken_1.default.sign({ id: user.id, name: user.name }, JWT_SECRET, { expiresIn: "1h" });
                console.log("Token generado:", token);
                console.log("Usuario:", user.name);
                console.log("Email:", user.email);
                res.json({
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
                });
            }
            catch (error) {
                res.status(500).json({ msg: "Error en el servidor", error });
            }
        });
    }
}
exports.loginController = new LoginController();
