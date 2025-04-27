"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const actividadesController_1 = require("../controllers/actividadesController");
class ActiviadesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', actividadesController_1.actividadesController.list);
        this.router.get('/:id', actividadesController_1.actividadesController.getOne);
        this.router.post('/', actividadesController_1.actividadesController.create);
        this.router.delete('/:id', actividadesController_1.actividadesController.delete);
        this.router.put('/:id', actividadesController_1.actividadesController.update);
    }
}
const actividadesRoutes = new ActiviadesRoutes();
exports.default = actividadesRoutes.router;
