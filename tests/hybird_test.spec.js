// @ts-check
const { test, expect } = require('@playwright/test')

test('Luồng kết hợp giữa API và UI', async({ page, request }) => {
    const responsePost = await request.get('breeds/image/random')

    // Check trả về status 200 vì đang là get không phải post
    expect(responsePost.status()).toBe(200)

    // Chuyển dữ liệu trả về sang json
    const dataJson = await responsePost.json()
    const linkImg = dataJson.message
    expect(linkImg, `Link ảnh trống!!!`).not.toBe('')

    // Lên gg và truyền link ảnh vào xem có hiện không?
    await page.goto('https://www.google.com/')
    await page.locator('.gLFyf').fill(linkImg)
    await page.keyboard.press('Enter')

    // chụp ảnh
    // await page.screenshot({ path: 'chung-cu-google.png', fullPage: true });

    await expect(page).toHaveURL(/.*google.com\/search/);
    console.log('Đã search link ảnh chó thành công trên UI!');
})