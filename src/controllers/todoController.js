const Todo = require("../models/todoModel");

// Todo Ekle (Kullanıcıya ait todo ekler)
const todoAdd = async (req, res) => {
    try {
        const userId = req.user.id; // Auth middleware’den gelen kullanıcı ID'si

        // Aynı isimde todo varsa, sadece o kullanıcıya ait olup olmadığını kontrol et
        const _todo = await Todo.find({ name: req.body.name, userId });

        if (_todo.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Bu isimde kayıt mevcut"
            });
        }

        // Yeni todo oluştururken userId'yi body ile birlikte ekle
        const newTodo = new Todo({ ...req.body, userId });
        await newTodo.save();

        return res.status(201).json({
            success: true,
            message: "Todo başarıyla eklendi",
            data: newTodo
        });
    } catch (error) {
        console.error("Todo eklenirken hata oluştu:", error);
        return res.status(500).json({
            success: false,
            message: "Sunucu hatası",
            error: error.message
        });
    }
};

// Todo Listesi (Sayfalı ve kullanıcıya özel)
const todoList = async (req, res) => {
    try {
        const userId = req.user.id;  // Kullanıcı ID'si token'dan geliyor
        const page = parseInt(req.query.page) || 1; // Sayfa numarası
        const limit = 2;                           // Sayfa başına gösterilecek kayıt sayısı
        const skip = (page - 1) * limit;           // Atlanacak kayıt sayısı

        // Kullanıcının todosunu sayfalı olarak getir
        const todoList = await Todo.find({ userId })
            .skip(skip)
            .limit(limit);

        return res.status(200).json({
            success: true,
            page,
            perPage: limit,
            data: todoList
        });
    } catch (error) {
        console.error("Todo listesi getirilirken hata oluştu:", error);
        return res.status(500).json({
            success: false,
            message: "Sunucu hatası",
            error: error.message
        });
    }
};

// Todo Güncelle (Sadece kendi todo'sunu güncelleyebilir)
const todoUpdate = async (req, res) => {
    try {
        const userId = req.user.id;
        const todoId = req.params.id;
        const updateData = req.body;

        // Kullanıcıya ait ve id'si eşleşen todo bulunup güncellenir
        const updateTodo = await Todo.findOneAndUpdate(
            { _id: todoId, userId },
            updateData,
            { new: true }   // Güncellenmiş veriyi döndür
        );

        if (!updateTodo) {
            return res.status(404).json({
                success: false,
                message: "Todo bulunamadı veya yetkiniz yok"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Todo başarıyla güncellendi",
            data: updateTodo
        });
    } catch (error) {
        console.error("Todo güncellenirken hata oluştu:", error);
        return res.status(500).json({
            success: false,
            message: "Sunucu hatası",
            error: error.message
        });
    }
};

// Todo Sil (Sadece kullanıcı kendi todo'sunu silebilir)
const todoDelete = async (req, res) => {
    try {
        const userId = req.user.id;
        const todoId = req.params.id;

        // Kullanıcıya ait todo silinir
        const deleteTodo = await Todo.findOneAndDelete({ _id: todoId, userId });

        if (!deleteTodo) {
            return res.status(404).json({
                success: false,
                message: "Todo bulunamadı veya yetkiniz yok"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Todo başarıyla silindi"
        });
    } catch (error) {
        console.error("Todo silinirken hata oluştu:", error);
        return res.status(500).json({
            success: false,
            message: "Sunucu hatası",
            error: error.message
        });
    }
};

// Todo Detay (Sadece kullanıcı kendi todosunu görebilir)
const todoDetail = async (req, res) => {
    try {
        const userId = req.user.id;
        const todoId = req.params.id;

        // Kullanıcıya ait todo detayını getir
        const detailTodo = await Todo.findOne({ _id: todoId, userId });

        if (!detailTodo) {
            return res.status(404).json({
                success: false,
                message: "Todo bulunamadı veya yetkiniz yok"
            });
        }

        return res.status(200).json({
            success: true,
            data: detailTodo
        });
    } catch (error) {
        console.error("Todo detayı getirilirken hata oluştu:", error);
        return res.status(500).json({
            success: false,
            message: "Sunucu hatası",
            error: error.message
        });
    }
};

module.exports = {
    todoAdd,
    todoList,
    todoUpdate,
    todoDelete,
    todoDetail
};
