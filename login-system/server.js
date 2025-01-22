// server.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb+srv://FRANCISCO:12345@cluster0.4m7qa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

app.use(express.json());

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send('Usuario no registrado');
  }
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user._id, name: user.name }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(400).send('Credenciales inválidas');
  }
});

app.get('/protected', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send('No token provided');
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json({ name: user.name });
  } catch (err) {
    res.status(401).send('Invalid token');
  }
});

// Cambia el puerto a 5000
app.listen(5000, () => console.log('Server running on port 5000'));
