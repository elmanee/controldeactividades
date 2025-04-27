import { Router } from "express"
import { loginController } from '../controllers/loginController'

class LoginRoutes{
  public router:Router = Router();

  constructor(){
    this.config();
  }

  config():void{
    this.router.post('/login', loginController.login)
    this.router.post('/register', loginController.register)
  }

}

const loginRoutes = new LoginRoutes();
export default loginRoutes.router;


