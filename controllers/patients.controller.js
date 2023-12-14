const { PrismaClient } = require('@prisma/client');
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

exports.getPatients = async (req, res) => {
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
  
    try {
      const checking = await prisma.logInData.findUnique({
        where: { email: req.body.email },
      });
  
      if (checking) {
        return res.send('User details already exist');
      } else {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        data.password = hashedPassword;
        const newdata = await prisma.logInData.create({ data });
        res.status(201).json({ message: 'Utilisateur créé !', newdata });
      }
    } catch (e) {
      console.error(e);
      res.send('wrong inputs');
    }
};

exports.login = async (req, res) => {
    try {
      const check = await prisma.logInData.findUnique({
        where: { email: req.body.email },
      });
  
      if (!check) {
        return res.send('Utilisateur non trouvé !');
      }
  
      const passwordMatch = await bcrypt.compare(
        req.body.password,
        check.password
      );
  
      if (passwordMatch) {
        const token = jwt.sign({ userId: check.id, name: check.name }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' });
        res.status(201).json({
          message: 'Connection réussie !',
          data: {
            userId: check.id,
            name: check.name,
            email: check.email,
            token: token,
          },
        });
      } else {
        res.send('Mot de passe incorrect !');
      }
    } catch (e) {
      console.error(e);
      res.send('Something went wrong');
    }
  };