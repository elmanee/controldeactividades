import {Request, Response } from 'express';

class IndexController{
  index (req:Request , resp:Response){
    resp.json({text: 'API is en tal'})
  }
}

export const indexController = new IndexController();