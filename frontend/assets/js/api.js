/**
 * api.js - Module goi REST API dung chung
 * TV-02 phu trach (Đã tối ưu hóa)
 */
const BASE_URL = 'http://localhost:3000/api';

const api = {
    // 3. Viết hàm getHeaders
    _getHeaders() {
        const token = localStorage.getItem('token'); // Đảm bảo key này khớp với trang Login
        return {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        };
    },

    // 4. Viết hàm get
    async get(endpoint) {
        const res = await fetch(BASE_URL + endpoint, { 
            headers: this._getHeaders() 
        });
        if (!res.ok) throw await res.json();
        return res.json();
    },

    // 5. Viết hàm post
    async post(endpoint, data) {
        const res = await fetch(BASE_URL + endpoint, {
            method: 'POST', 
            headers: this._getHeaders(), 
            body: JSON.stringify(data)
        });
        if (!res.ok) throw await res.json();
        return res.json();
    },

    // 6. Viết hàm put
    async put(endpoint, data) {
        const res = await fetch(BASE_URL + endpoint, {
            method: 'PUT', 
            headers: this._getHeaders(), 
            body: JSON.stringify(data)
        });
        if (!res.ok) throw await res.json();
        return res.json();
    },

    // 7. Viết hàm del
    async del(endpoint) {
        const res = await fetch(BASE_URL + endpoint, {
            method: 'DELETE', 
            headers: this._getHeaders()
        });
        if (!res.ok) throw await res.json();
        return res.json();
    }
};

// 8. Export để các trang HTML dùng (Rất quan trọng)
window.api = api;