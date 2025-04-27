"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const actividadesRoutes_1 = __importDefault(require("./routes/actividadesRoutes"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
dotenv_1.default.config();
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/actividades', actividadesRoutes_1.default);
        this.app.use('/api/auth', loginRoutes_1.default);
    }
    errorHandling() {
        this.app.use((err, req, res, next) => {
            console.error(err);
            res.status(500).json({ msg: 'Error interno del servidor', error: err.message });
        });
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server listening on port', this.app.get('port'));
        })
            .on('error', (err) => {
            console.error('Server error:', err);
        });
    }
}
const server = new Server();
server.start();
