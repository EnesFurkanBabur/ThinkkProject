// controllers/commentController.js
import Comment from '../models/Comment.js';

export const createComment = async (req, res) => {
    try {
        const { content, userId, topicId } = req.body;
        const newComment = new Comment({ content, user: userId, topic: topicId });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        console.error('Yorum oluşturma hatası:', error);
        res.status(500).json({ error: 'Sunucu hatası, yorum oluşturulamadı.' });
    }
};

export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const updatedComment = await Comment.findByIdAndUpdate(id, { content }, { new: true });
        if (!updatedComment) {
            return res.status(404).json({ error: 'Belirtilen ID ile yorum bulunamadı.' });
        }
        res.json(updatedComment);
    } catch (error) {
        console.error('Yorum güncelleme hatası:', error);
        res.status(500).json({ error: 'Sunucu hatası, yorum güncellenemedi.' });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedComment = await Comment.findByIdAndDelete(id);
        if (!deletedComment) {
            return res.status(404).json({ error: 'Belirtilen ID ile yorum bulunamadı.' });
        }
        res.json({ message: 'Yorum başarıyla silindi.' });
    } catch (error) {
        console.error('Yorum silme hatası:', error);
        res.status(500).json({ error: 'Sunucu hatası, yorum silinemedi.' });
    }
};
