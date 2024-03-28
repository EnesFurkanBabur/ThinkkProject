// controllers/topicController.js
import Topic from '../models/Topic.js';

export const createTopic = async (req, res) => {
    try {
        const { title, content, userId } = req.body;
        const newTopic = new Topic({ title, content, user: userId });
        await newTopic.save();
        res.status(201).json(newTopic);
    } catch (error) {
        console.error('Konu oluşturma hatası:', error);
        res.status(500).json({ error: 'Sunucu hatası, konu oluşturulamadı.' });
    }
};

export const getTopic = async (req, res) => {
    try {
        const { id } = req.params;
        const topic = await Topic.findById(id).populate('user', 'username'); // Konunun kullanıcısını getir
        if (!topic) {
            return res.status(404).json({ error: 'Belirtilen ID ile konu bulunamadı.' });
        }
        res.json(topic);
    } catch (error) {
        console.error('Konu getirme hatası:', error);
        res.status(500).json({ error: 'Sunucu hatası, konu getirilemedi.' });
    }
};

export const updateTopic = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const updatedTopic = await Topic.findByIdAndUpdate(id, { title, content }, { new: true });
        if (!updatedTopic) {
            return res.status(404).json({ error: 'Belirtilen ID ile konu bulunamadı.' });
        }
        res.json(updatedTopic);
    } catch (error) {
        console.error('Konu güncelleme hatası:', error);
        res.status(500).json({ error: 'Sunucu hatası, konu güncellenemedi.' });
    }
};

export const deleteTopic = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTopic = await Topic.findByIdAndDelete(id);
        if (!deletedTopic) {
            return res.status(404).json({ error: 'Belirtilen ID ile konu bulunamadı.' });
        }
        res.json({ message: 'Konu başarıyla silindi.' });
    } catch (error) {
        console.error('Konu silme hatası:', error);
        res.status(500).json({ error: 'Sunucu hatası, konu silinemedi.' });
    }
};
