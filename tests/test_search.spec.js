// @ts-check
const { test, expect } = require('@playwright/test')

// Bài tập
// 1. Đăng nhập vào hệ thống.
// 2. Kiểm tra xem có bao nhiêu sản phẩm hiển thị.
// 3. Tìm sản phẩm có tên là "Sauce Labs Bolt T-Shirt".
// 4. Kiểm tra xem giá của nó có đúng là $15.99 không.


test('Kiem tra san pham', async({ page }) => {

    //0. Khai báo dữ liệu
    const urlPage = 'https://www.saucedemo.com/'
    const userNameInput = 'Username'
    const userName = 'standard_user'
    const passWordInput = '[data-test="password"]'
    const passWord = 'secret_sauce'
    const targetProductName = 'Sauce Labs Bolt T-Shirt';
    const expectedPrice = '$15.99';


    //1. Đăng nhập vào hệ thống.
    await page.goto(urlPage)
    await page.getByPlaceholder(userNameInput).fill(userName)
    await page.locator(passWordInput).fill(passWord)
    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page.locator('.title')).toHaveText('Products')

    // 2. Kiểm tra xem có bao nhiêu sản phẩm hiển thị.
    const allProducts = page.locator('.inventory_item');

    // Kiểm tra xem có đúng 6 sản phẩm hiển thị không
    await expect(allProducts).toHaveCount(6);

    // 2_1. Tìm "Cái hộp" chứa sản phẩm cụ thể (Quan trọng nhất)
    // Thay vì tìm chung chung, tìm thẻ chứa đúng cái tên áo đó
    const productCard = allProducts.filter({ hasText: targetProductName });

    // 4. Kiểm tra các thành phần bên trong "Cái hộp" đó (Dữ liệu động)
    // Bây giờ dù giá nằm ở đâu, nó cũng chỉ tìm trong phạm vi productCard
    const currentPrice = productCard.locator('[data-test="inventory-item-price"]');
    await expect(currentPrice).toHaveText(expectedPrice);

    // 5. Sau khi check xong xuôi mới Click vào xem chi tiết
    await productCard.locator('[data-test="inventory-item-name"]').click();

    const buttonAddToCart = page.getByRole('button', { name: "Add to cart" })
    await expect(buttonAddToCart).toHaveText('Add to cart');
    await expect(page).toHaveURL(/.*inventory-item/);

    console.log('Giá sản phẩm và nút ấn thêm hoàn toàn chính xác!')
})