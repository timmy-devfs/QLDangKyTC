const sql = require('mssql');

// 1. Phải khai báo config TRƯỚC
const config = {
    user: 'sa',
    password: 'Minh2303@', 
    server: 'localhost',
    database: 'QLDangKyHP',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

// 2. Sau đó mới mang biến config vào đây để dùng
const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('✅ Kết nối SQL Server thành công!');
        return pool;
    })
    .catch(err => {
        console.log('❌ Lỗi kết nối: ', err);
    });

module.exports = { sql, poolPromise };