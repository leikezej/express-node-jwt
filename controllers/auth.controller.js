const User = require('../models/user.model');
const cache = require('../utils/cache');
const jwtConfig = require('../config/jwt');
const jwt = require('../utils/jwt');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
   const hashedPassword = await bcrypt.hash(req.body.password, 10);
      
      const ifExist = await User.findOne({ email });
         if (ifExist) {
         return res.status(409).send("Email Already Used!");
         }
      const user = await User.create({
         name: req.body.name,
         email: req.body.email,
         // password: hashedPassword,
         password: bcrypt.hashSync(req.body.password, 8),
         permissionLevel: req.body.permissionLevel,
         image: req.body.image,
         token: req.body.token
      });
      
      const token = jwt.sign(
         { user_id: user._id, email },
         process.env.JWT_SECRET,
         {
           expiresIn: "2h",
         }
         );
         user.token = token;
         // res.status(201).json(user);
         res.status(201)       
         .send({
            message: "User Registered successfully"
          })
};

exports.login = async (req, res) => {
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if (user) {
        const isMatched = await bcrypt.bcrypt.compareSync(
            req.body.password, 
            user.password
         );
         if (!passwordIsValid) {
            return res.status(401)
              .send({
                accessToken: null,
                message: "Invalid Password!"
              });
          }
          
        if (isMatched) {
            const token = await jwt.createToken({ id: user.id, email });
            {
               process.env.JWT_SECRET
            }
            return res.json({
                     token: jwt.sign,
                  token: token,
                   jwt_secret: token,
                token_type: 'Bearer',
                expires_in: jwtConfig.ttl
            });
            user.token = token;
        }
      //   res.status(200).json(user);
        res.status(200)
        .send({
         user: {
           id: user._id,
           name: user.name,
           email: user.email,
           role_employees:{
            data:[{
                  id_role: 1
            },{
                  id_role: 2
            }]
           }
         },
         message: "Login successfull",
         accessToken: token,
       });
    }
    return res.status(401).json({ error: 'Unauthorized' });
}

exports.users = async (req, res) => {
   //  const user = await User.findByPk(req.user.id);
   const user = await User.findById(req.params.userId).then((result) => {
      res.status(200).send(result);
   });
}

exports.logout = async (req, res) => { 
    const token = req.token;
    const now = new Date();
    const expire = new Date(req.user.exp);
    const milliseconds = now.getTime() - expire.getTime();
    /* ----------------------------- BlackList Token ---------------------------- */
    await cache.set(token, token, milliseconds);

    return res.json({ message: 'Logged out successfully' });
}