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
exports.actividadesController = void 0;
const database_1 = __importDefault(require("../database"));
class ActividadesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [actividades] = yield database_1.default.query('SELECT * FROM Actividad');
                res.json(actividades);
            }
            catch (error) {
                res.status(500).json({ error: 'Error al obtener actividades' });
            }
        });
    }
    create(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO Actividad set ?', [req.body]);
            resp.json({ message: 'Actividad  guardada' });
        });
    }
    delete(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM Actividad WHERE id = ?', [id]);
            resp.json({ text: 'The activiti was deleted' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE Actividad SET ? WHERE id = ?', [req.body, id]);
            res.json({ text: 'The activity was updated' });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const [actividades] = yield database_1.default.query('SELECT * FROM Actividad WHERE id = ?', [id]);
                if (actividades.length > 0) {
                    return res.json(actividades[0]);
                }
                res.status(404).json({ text: 'The activity does not exist' });
            }
            catch (error) {
                res.status(500).json({ error: 'Error al obtener la actividad' });
            }
        });
    }
}
exports.actividadesController = new ActividadesController();
