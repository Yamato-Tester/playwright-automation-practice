// @ts-check
const { test, expect } = require('@playwright/test');

test('Người dùng có thể mua hàng thành công', async({ page }) => {
    // 1. Đi tới trang web
    await page.goto('https://www.saucedemo.com/')

    // 2. Đăng nhập
    await page.getByPlaceholder('Username').fill('standard_user')
    await page.getByPlaceholder('Password').fill('secret_sauce')
    await page.locator('[data-test="login-button"]').click()

    // 3. Chọn sản phẩm đầu tiên và thêm vào giỏ hàng
    // Thay vì lấy ID loằng ngoằng, tìm nút "Add to cart" của sản phẩm đầu tiên
    await page.locator('.inventory_item').first().getByRole('button', { name: 'Add to cart' }).click()

    // 4. Đi tới giỏ hàng
    await page.locator('.shopping_cart_link').click()

    // 5. Nhấn Checkout
    await page.locator('[data-test="checkout"]').click()

    // 6. Điền thông tin (Dùng data-test vì trang này có sẵn)
    await page.locator('[data-test="firstName"]').fill('Nguyen')
    await page.locator('[data-test="lastName"]').fill('Van A')
    await page.locator('[data-test="postalCode"]').fill('10000')
    await page.locator('[data-test="continue"]').click()

    // 7. Nhấn Finish để hoàn tất
    await page.locator('[data-test="finish"]').click()

    // 8. KIỂM CHỨNG
    // Sau khi nhấn Finish, phải có dòng chữ "Thank you for your order!"
    const completeHeader = page.locator('.complete-header')
    await expect(completeHeader).toHaveText('Thank you for your order?')
});