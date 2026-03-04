// @ts-check
const { test, expect } = require('@playwright/test')

// BT: Kiểm tra lấy chi tiết bài viết qua api

test('Kiểm tra lấy chi tiết bài viết qua api', async({ request }) => {
    // 1. Gửi yêu cầu GET
    // Vì đã có baseURL trong config, bạn chỉ cần ghi phần đuôi
    const response = await request.get('breeds/image/random');

    // 2. Khẳng định Status Code thành công
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log('Dữ liệu ảnh chó:', body);

    // 3. Khẳng định cấu trúc dữ liệu JSON (Rất quan trọng trong API Test)
    // Dog API trả về: { "message": "url_anh", "status": "success" }
    expect(body).toHaveProperty('status', 'success');

    // Khẳng định message phải là một đường dẫn URL (bắt đầu bằng https)
    expect(body.message).toContain('https://images.dog.ceo');
})