import Message from '../models/Messages.js';


export const createMessage = async (req, res) => {
    try {
        const { content, senderId, receiverId } = req.body;
        const newMessage = new Message({ content, sender: senderId, receiver: receiverId });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Mesaj oluşturma hatası:', error);
        res.status(500).json({ error: 'Sunucu hatası, mesaj oluşturulamadı.' });
    }
};

export const updateMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const updatedMessage = await Message.findByIdAndUpdate(id, { content }, { new: true });
        if (!updatedMessage) {
            return res.status(404).json({ error: 'Belirtilen ID ile mesaj bulunamadı.' });
        }
        res.json(updatedMessage);
    } catch (error) {
        console.error('Mesaj güncelleme hatası:', error);
        res.status(500).json({ error: 'Sunucu hatası, mesaj güncellenemedi.' });
    }
};

export const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMessage = await Message.findByIdAndDelete(id);
        if (!deletedMessage) {
            return res.status(404).json({ error: 'Belirtilen ID ile mesaj bulunamadı.' });
        }
        res.json({ message: 'Mesaj başarıyla silindi.' });
    } catch (error) {
        console.error('Mesaj silme hatası:', error);
        res.status(500).json({ error: 'Sunucu hatası, mesaj silinemedi.' });
    }
};
