const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Kullanıcı var mı kontrol et
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Bu e-posta adresi zaten kullanımda.' });
        }
        // Yeni kullanıcı oluştur
        const newUser = new User({ username, email, password });
        await newUser.save();
        req.session.user = newUser; // Oturum oluştur
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Kullanıcı kaydı hatası:', error);
        res.status(500).json({ error: 'Sunucu hatası, kullanıcı kaydedilemedi.' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Kullanıcı var mı kontrol et
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'E-posta veya şifre hatalı.' });
        }
        req.session.user = user; // Oturum başlat
        res.json(user);
    } catch (error) {
        console.error('Kullanıcı girişi hatası:', error);
        res.status(500).json({ error: 'Sunucu hatası, kullanıcı girişi yapılamadı.' });
    }
};

const logout = (req, res) => {
    try {
        req.session.destroy(); // Oturumu sonlandır
        res.clearCookie('connect.sid'); // Oturum çerezini temizle
        res.status(200).json({ message: 'Çıkış yapıldı.' });
    } catch (error) {
        console.error('Çıkış hatası:', error);
        res.status(500).json({ error: 'Sunucu hatası, çıkış yapılamadı.' });
    }
};

export { register, login, logout };
