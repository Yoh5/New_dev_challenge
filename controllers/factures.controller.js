const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
// const app = express();

// app.use(express.json());

// Create a new facture
exports.createFacture('/factures', async (req, res) => {
  try {
    const { patientId, facture } = req.body;
    const createdFacture = await prisma.facture.create({
      data: {
        patient: { connect: { id: patientId } },
        facture,
      },
    });
    res.json(createdFacture);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Retrieve all factures
exports.getFacture('/factures', async (req, res) => {
  try {
    const factures = await prisma.facture.findMany();
    res.json(factures);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Update a facture
exports.updateFacture('/factures/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { patientId, facture } = req.body;
    const updatedFacture = await prisma.facture.update({
      where: { id },
      data: {
        patient: { connect: { id: patientId } },
        facture,
      },
    });
    res.json(updatedFacture);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Delete a facture
app.deleteFacture('/factures/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.facture.delete({ where: { id } });
    res.json({ message: 'Facture deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});