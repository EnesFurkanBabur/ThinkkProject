import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import authRoutes from './routes/authRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import topicRoutes from './routes/topicRoutes.js';

const app = express();

// MongoDB bağlantısı
mongoose.connect('mongodb://localhost/forum', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB bağlantısı başarılı'))
    .catch(err => console.error('MongoDB bağlantı hatası:', err));

// Express Middleware
app.use(express.json());

// Session Middleware
app.use(session({
    secret: 'cokgizli',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/forum' }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 gün
}));

// Routes Middleware
app.use('/routes', authRoutes);
app.use('/routes', commentRoutes);
app.use('/routes', messageRoutes);
app.use('/routes', topicRoutes);

// Server Başlatma
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
