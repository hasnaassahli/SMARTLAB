// import express from 'express';
// import User from '../models/User.js'; // Your User model
// import bcrypt from 'bcrypt';

// const router = express.Router();

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
//     }

//     // Compare passwords
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
//     }

//     // Successful login
//     res.status(200).json({ message: 'Connexion réussie', userId: user._id });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Erreur serveur' });
//   }
// });

// export default router;