// @ts-check
const { test, expect } = require('@playwright/test')
    // BT: Sắp xếp mảng giá nhỏ đến lớn, xong kiểm tra xem đã thỏa mãn chưa

test('Kiểm tra mảng giá đã sắp xếp chưa', async({ page }) => {
    // Khai báo dữ liệu
    const urlPage = 'https://www.saucedemo.com/'
    const userNameInput = 'Username'
    const userName = 'standard_user'
    const passWordInput = '[data-test="password"]'
    const passWord = 'secret_sauce'

    // Đăng nhập vào hệ thống.
    await page.goto(urlPage)
    await page.getByPlaceholder(userNameInput).fill(userName)
    await page.locator(passWordInput).fill(passWord)
    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page.locator('.title')).toHaveText('Products')

    // 1. Lấy mảng giá mặc định
    const getPriceList = async() => {
            const priceStringArr = await page.locator('.inventory_item_price').allTextContents()
            return priceStringArr.map(p => {
                // Bỏ ký tự, chuyển thành số
                const priceNum = parseFloat(p.replace('$', ''))
                expect(typeof priceNum, 'Giá không phải giá trị Number').toBe('number')
                expect(priceNum).not.toBe(NaN)
                return priceNum
            })
        }
        // Sắp xếp giá
    const priceBeforeSort = await getPriceList()
    await page.selectOption('.product_sort_container', 'lohi')

    // check xem giá đã thay đổi chưa
    // - Ý của dòng này là check xem giá cũ với giá sau khi ấn sort (giá hiện tại trên màn hình) đã thay đổi chưa,
    // nếu chưa thì đợi, đợi quá thời gian vẫn không đổi (thì là lỗi) => false
    await expect(page.locator('.inventory_item_price').first()).not.toHaveText(priceBeforeSort[0].toString());
    // await page.waitForTimeout(500); // Một khoảng nghỉ ngắn để DOM ổn định

    // Lấy giá mới sau khi sort
    const priceAfterSort = await getPriceList()

    // check xem giá đã sắp xếp đúng chưa
    const isSorted = priceAfterSort.every((p, i) => i === 0 || p >= priceAfterSort[i - 1])
    await expect(isSorted, `Giá chưa sắp xếp đúng thứ tự ${priceAfterSort.join(', ')}`).toBe(true)
    expect(priceAfterSort).not.toEqual(priceBeforeSort); // Check xem có thực sự thay đổi không
})