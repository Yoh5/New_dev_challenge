const { PrismaClient } = require('@prisma/client');
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

exports.getPatientsWithFactures = async (req, res) => {
  try {
    const patients = await prisma.patient.findMany({
      include: {
        facture: true,
      },
      select: {
        name: true,
        facture: true,
      },
    });

    res.json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching patients and their factures.' });
  }
};

exports.signup = async (req, res) => {
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
  
    try {
      const checking = await prisma.Patient.findUnique({
        where: { email: req.body.email },
      });
  
      if (checking) {
        return res.send('User details already exist');
      } else {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        data.password = hashedPassword;
        const newdata = await prisma.Patient.create({ data });
        res.status(201).json(newdata);
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'An error occurred during signup.' });
    }
};

exports.login = async (req, res) => {
    try {
      const check = await prisma.Patient.findUnique({
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

  exports.deletePatient = async (req, res) => {
    const { patientId } = req.params;
  
    try {
      const deletedPatient = await prisma.patient.delete({
        where: {
          id: patientId,
        },
      });
  
      res.json(deletedPatient);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while deleting the patient.' });
    }
  };

  exports.updatePatient = async (req, res) => {
    const { patientId } = req.params;
    const { name, email, password } = req.body;
  
    try {
      const updatedPatient = await prisma.patient.update({
        where: {
          id: patientId,
        },
        data: {
          name,
          email,
          password,
        },
      });
  
      res.json(updatedPatient);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating the patient.' });
    }
  };