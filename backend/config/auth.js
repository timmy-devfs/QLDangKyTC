/**
 * auth.js - Cấu hình JWT
 * TV-05 phụ trách
 */
const path = require('path');
// Nạp .env từ thư mục gốc
require('dotenv').config({ path: path.join(__dirname, '../../.env') }); 

const jwt = require('jsonwebtoken');

const JWT_SECRET  = process.env.JWT_SECRET  || 'uth_qlhp_test_secret_2025';
const JWT_EXPIRES = process.env.JWT_EXPIRES_IN || '8h';

module.exports = {
    secret: JWT_SECRET, // Xuất ra để dùng ở chỗ khác nếu cần
    expiresIn: JWT_EXPIRES,
    sign(payload)  { 
        return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES }); 
    },
    verify(token)  { 
        return jwt.verify(token, JWT_SECRET); 
    },
};