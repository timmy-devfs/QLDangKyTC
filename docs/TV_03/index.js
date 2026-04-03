const express = require('express');
const app = express();
const path = require('path');
const { poolPromise } = require('./backend/configs/db');
const hocPhanRoutes = require('./backend/routes/hocPhanRoutes');

app.use(express.json());

// Cho phép truy cập các file HTML/CSS trong thư mục frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// Khai báo API
app.use('/api/hoc-phan', hocPhanRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${port}`);
    console.log(`👉 Xem giao diện tại: http://localhost:${port}/admin/hoc-phan.html`);
});