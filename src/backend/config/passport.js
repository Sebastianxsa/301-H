import passport from "passport";
import { PrismaClient } from "@prisma/client";
import { Strategy as GoogleStrategy } from "passport-google-oauth20"

const prisma = new PrismaClient();

passport.use(
    new GoogleStrategy({
        clientID: process.CLIENT_ID,
        clientSecret: process.CLIENT_SECRET,
        callbackURL: "api/auth/google/callback",
        },
        async(Profiler, done) =>{
            try{
                const email = Profiler.emails[0].value;
                const googleId = Profiler.id;

                let user = await prisma.user.findUnique({
                    where: { googleId},
                });
                if(!user){
                    user= await prisma.user.findUnique ({
                            where :{email}
                        });
                    if(user){ 
                    user = await prisma.user.update({
                        where:{email},
                        data: {googleId: googleId, 
                            avatar: Profiler.photo[0].value,
                        }
                    });
                }} else{
                    user = await prisma.user.create({
                        data:{
                            email: email,
                            name: Profiler.displayName,
                            googleId:googleId,
                            avatar: Profiler.photo[0].value
                        }
                    })
                }
                return done(null,user);
            }catch(error){
                return done(error, null);
            }
        }
    )
);
passport.serializeUser((user, done) =>{
    done(null, user.id);
});

passport.deserializeUser(async(id,done) =>{
    try{
        const user  = await prisma.user.findUnique({where: id});
        done(null, user);
    }catch(error){
        done(error, null)
    }
});