// @ts-check
const { test, expect } = require('@playwright/test')

// BT
// 1. Lấy giá của tất cả 6 sản phẩm lưu vào một cái mảng.
// 2. Sau đó kiểm tra xem có cái giá nào lớn hơn $50 không?
// 3. Thử lấy giá tiền sắp xếp nhỏ đến lớn, xong kiểm tra xem giá đã thực sự sắp xếp đúng chưa?

test('gom mang gia sp', async({ page }) => {
    // Khai báo dữ liệu
    const urlPage = 'https://www.saucedemo.com/'
    const userNameInput = 'Username'
    const userName = 'standard_user'
    const passWordInput = '[data-test="password"]'
    const passWord = 'secret_sauce'
    const priceLevel = 50

    // Đăng nhập vào hệ thống.
    await page.goto(urlPage)
    await page.getByPlaceholder(userNameInput).fill(userName)
    await page.locator(passWordInput).fill(passWord)
    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page.locator('.title')).toHaveText('Products')

    // 1. Lấy giá của tất cả 6 sản phẩm lưu vào một cái mảng.
    // 1.1.tao mang gia
    const arrStringPrice = await page.locator('.inventory_item_price').allTextContents()

    // 1.2. Bỏ $ và biến string thành float
    const arrNumberPrice = arrStringPrice.map(str => {
        const price = parseFloat(str.replace("$", ''))
            // check giá đã đổi thành số chưa
        expect(typeof price).toBe('number')
            // Đảm bảo dữ liệu trả về từ api không phải Nan do lỗi
        expect(price, 'Lỗi giá sản phẩm').not.toBeNaN
        return price
    });

    // 2. Kiểm tra xem có cái giá nào lớn hơn $50 không?
    const isAnyOver50 = arrNumberPrice.some(price => price > priceLevel);
    expect(isAnyOver50, `Có giá lớn hơn '${priceLevel}'`).toBe(false);
})