import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv';


import indexRoutes from './routes/indexRoutes'
import actividadesRoutes from './routes/actividadesRoutes'
import loginRoutes from './routes/loginRoutes';

dotenv.config();


class Server {

  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config(): void {
    this.app.set('port', process.env.PORT || 3000);
    this.app.use(morgan('dev'))
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.urlencoded({extended: false}))
  }

  routes(): void {
    this.app.use('/', indexRoutes);
    this.app.use('/api/actividades',actividadesRoutes)
    this.app.use('/api/auth',loginRoutes)
  }
  
  errorHandling(): void {
    this.app.use((err: any, req: any, res: any, next: any) => {
      console.error(err);
      res.status(500).json({ msg: 'Error interno del servidor', error: err.message });
    });
  }

  start(): void {
    this.app.listen(this.app.get('port'), () => {
      console.log('Server listening on port', this.app.get('port'))
    })
    .on('error', (err) => {
      console.error('Server error:', err);
    });
  }

  
}

const server = new Server();
server.start();