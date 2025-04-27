import { Request, Response } from 'express';
import  pool  from '../database';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecreto";

class LoginController {
  // Registrar Usuario
  public async register(req: Request, res: Response) {
    const { name, email, password } = req.body;
    try {
      //Verificar si el usuario ya existe
      const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
      if ((rows as any[]).length > 0) {
        return res.status(400).json({ msg: "El usuario ya existe" });
      }
      // Encriptar contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
      // Insertar en la base de datos
      await pool.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);
      res.status(201).json({ msg: "Usuario registrado correctamente" });

    } catch (error) {
      res.status(500).json({ msg: "Error en el servidor", error });
    }
  }

  
  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
      const users = rows as any[];
      if (users.length === 0) {
        return res.status(400).json({ msg: "Credenciales inválidas" });
      }
      const user = users[0];
      // comparar la contraseña ingresada con la encriptada en la base de datos
      const esIgual = await bcrypt.compare(password, user.password);
      if (!esIgual) {
        return res.status(400).json({ msg: "Credenciales inválidas" });
      }
      
      //aqui se genera el JWT
      const token = jwt.sign({ id: user.id, name: user.name }, JWT_SECRET, { expiresIn: "1h" });
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
    } catch (error) {
      res.status(500).json({ msg: "Error en el servidor", error });
    }
  }
}
export const loginController = new LoginController();