const bcrypt = require("bcryptjs");    // Şifreleri hashlemek ve doğrulamak için kütüphane
const jwt = require("jsonwebtoken");   // JWT token oluşturmak için kütüphane
const User = require("../models/userModel");

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;   // İstekten gelen kullanıcı bilgileri
        
        // Aynı email ile kayıtlı kullanıcı var mı kontrol et
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "E-posta zaten kayıtlı" 
            })
        }

        // Şifreyi güvenli hale getirmek için hashle
        const salt = await bcrypt.genSalt(10);          // Rastgele salt oluştur
        const hashedPassword = await bcrypt.hash(password, salt);  // Şifreyi hashle

        // Yeni kullanıcı objesi oluştur (şifre hashli)
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();   // Kullanıcıyı veritabanına kaydet

        return res.status(201).json({ success: true, message: "Kullanıcı başarıyla kayıt oldu" });
    } catch (error) {
        console.error("Kayıt hatası:", error);
        return res.status(500).json({ success: false, message: "Sunucu hatası", error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;    // Giriş için email ve şifre al
        
        // Email ile kullanıcıyı bul
        const user = await User.findOne({ email });  
        if (!user) {
            return res.status(400).json({ success: false, message: "Geçersiz e-posta veya şifre" });
        }

        // Şifre karşılaştırması yap (gelen şifre ve hashli şifre)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Geçersiz e-posta veya şifre" });
        }

        // Giriş başarılı, JWT token oluştur
        const token = jwt.sign(
            { id: user._id, email: user.email },   // Token payload (kimlik bilgileri)
            process.env.JWT_SECRET,                 // Gizli anahtar (env dosyasından)
            { expiresIn: "1d" }                    // Token geçerlilik süresi 1 gün
        );

        // Başarılı cevap, token ve kullanıcı bilgilerini dön
        return res.status(200).json({
            success: true,
            message: "Giriş başarılı",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Giriş hatası:", error);
        return res.status(500).json({ success: false, message: "Sunucu hatası", error: error.message });
    }
};

module.exports = {
    register,
    login,
};
