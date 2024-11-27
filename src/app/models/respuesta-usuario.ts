import { User } from './user'; 

export class RespuestaUsuario {
  constructor(
    public error: boolean, 
    public codigo: number,
    public mensaje: string,
    public data: User 
  ) {}
}
