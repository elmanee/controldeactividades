import { Router } from "express";
import { actividadesController } from '../controllers/actividadesController';

class ActiviadesRoutes{
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config():void{
      this.router.get('/', actividadesController.list); 
      this.router.get('/:id', actividadesController.getOne);
      this.router.post('/', actividadesController.create);
      this.router.delete('/:id', actividadesController.delete);
      this.router.put('/:id', actividadesController.update);
    }
    
}

const actividadesRoutes = new ActiviadesRoutes();
export default actividadesRoutes.router;