const mongoose = require("mongoose");

// MongoDB bağlantı stringini .env dosyasından alıyoruz
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

// Mongoose ile MongoDB'ye bağlanma işlemi
mongoose.connect(CONNECTION_STRING, {
  useNewUrlParser: true,      // Yeni URL parser kullanılır (eski parserde hatalar olabilir)
  useUnifiedTopology: true    // Yeni topology motoru kullanılır, daha stabil bağlantı sağlar
})
.then(() => {
  // Bağlantı başarılı olursa burası çalışır
  console.log("MongoDB bağlantısı başarılı.");
})
.catch((error) => {
  // Bağlantı sırasında hata oluşursa burası çalışır
  console.error("MongoDB bağlantı hatası:", error);
  process.exit(1); // Hata varsa uygulamayı kapatabiliriz
});
