const { poolPromise } = require('../configs/db');

// 1. Lấy danh sách + Phân trang + Tìm kiếm
exports.getAllHocPhan = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        const offset = (page - 1) * limit;

        const pool = await poolPromise;
        const result = await pool.request()
            .input('search', `%${search}%`)
            .query(`
                SELECT *, COUNT(*) OVER() AS TotalRows 
                FROM HocPhan 
                WHERE TenHP LIKE @search OR MaHP LIKE @search
                ORDER BY MaHP 
                OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY
            `);

        const totalRows = result.recordset[0]?.TotalRows || 0;

        res.json({
            data: result.recordset,
            pagination: {
                total: totalRows,
                page: page,
                limit: limit,
                totalPages: Math.ceil(totalRows / limit)
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Lấy điều kiện tiên quyết (Dùng đúng MaHPTruoc)
exports.getDieuKien = async (req, res) => {
    try {
        const { id } = req.params; 
        const pool = await poolPromise;
        const result = await pool.request()
            .input('MaHP', id)
            .query(`
                SELECT dk.MaHPTruoc, hp.TenHP, dk.LoaiDK
                FROM DieuKienHP dk
                JOIN HocPhan hp ON dk.MaHPTruoc = hp.MaHP
                WHERE dk.MaHP = @MaHP
            `);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: "Lỗi lấy điều kiện", details: err.message });
    }
};

// 3. Xóa học phần
exports.deleteHocPhan = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await poolPromise;
        await pool.request()
            .input('MaHP', id)
            .query('DELETE FROM HocPhan WHERE MaHP = @MaHP');
        res.json({ message: `Đã xóa thành công ${id}` });
    } catch (err) {
        res.status(500).json({ error: "Lỗi xóa", details: err.message });
    }
};