const {
    User,
    Token
} = require('../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const {
    jwt_secret,
    API_URL
} = require('../config/config.json')[env];
const transporter = require('../config/nodemailer')
const UserController = {
    async register(req, res) {
        try {
            const password = await bcrypt.hash(req.body.password, 9);
            const email = req.body.email
            
            const emailToken = jwt.sign({ email }, jwt_secret, { expiresIn: '48h' });
            const url = API_URL + '/users/confirm/' + emailToken;
            await transporter.sendMail({
                to: email,
                subject: 'Confirme su registro en Armería Funko',
                html: `
                <h3>Bienvenido ${req.body.username} a nuestra Armería de Funkos, estás a un paso de registrarte</h3>
                <a href="${url}">Click aquí para confirmar tu registro</a>
                Este enlace caduca en 48 horas.
                `
            });
            const user = await User.create({
                username: req.body.username,
                email,
                password,
                confirmed: false,
                role: 'customer'
            });
            res.status(201).send({
                user,
                message: 'Te hemos enviado un email para confirmar el registro'
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: 'Hubo un problema al tratar de crear el usuario'
            });
        }
    },
    async confirm(req, res) {
        try {
            const emailToken = req.params.emailToken;
            const payload = jwt.verify(emailToken, jwt_secret);
            const email = payload.email;
             await User.update({ 
                confirmed: true
            }, { where: { email } });
           const user= await User.findOne({where:{email}});
            // Mongoose findOneAndUpdate
            // const user = await User.findOneAndUpdate({email},{confirmed:true})
            const authToken = jwt.sign({
                id: user.id
            }, jwt_secret);
            await Token.create({
                token:authToken,
                UserId: user.id
            });
            /* MongoDB
            user.tokens.push(authToken);
            await user.save();
            */
            res.redirect('http://localhost:4200/user/confirmado/'+authToken);

        } catch (error) {
            console.error(error)
            res.status(500).send({message:'Ha habido un problema al confirmar el usuario',error})
        }
    },
    async login(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    username: req.body.username
                }
            })
            if (!user) {
                return res.status(400).send({
                    message: 'Usuario o contraseña incorrectas'
                })
            }
            if (!user.confirmed) {
                return res.status(400).send({
                    message: 'Debes confirmar tu email'
                })
            }
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).send({
                    message: 'Usuario o contraseña incorrectas'
                })
            }
            const token = jwt.sign({
                id: user.id
            }, jwt_secret);
            Token.create({
                token,
                UserId: user.id
            });
            //status es 200 by default
            res.send({
                message: 'Bienvenid@ ' + user.username,
                user,
                token
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: 'Hubo un problema al tratar de logearnos'
            });
        }
    },
    getInfo(req, res) {
        res.send(req.user);
    }
}
module.exports = UserController;