import { authServices } from "../services/authService.js";
import { generateToken } from "../utils/auth.js";

export const authControllers = {
    //Registro
    async register(req, res){
        try{
            const { email, name, password } = req.body;
            const result = await authServices.register({email, name, password});

            res.status(201).json({
                succes: true,
                message: "Usuario registrado exitosamente",
                data: result
            });
        }catch(error){
            res.status(500).json({
                succes: false,
                message: error.message
            });
        }
    },
    //google callback
    async googleCallback(){
        try{
            const user = req.user;
            const token = generateToken(user.id, user.email);

            res.redirect(`http://localhost:5173/login-sucess?token=${token}`); //vista url frontend
        }catch(error){
            res.redirect(`http://localhost:5173/login-error?message=?${error.message}`); //vista de frontend
        }
        
    }
};