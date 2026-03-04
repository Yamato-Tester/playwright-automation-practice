// @ts-check
const { test, expect } = require('@playwright/test')

test('Tạo, sửa, xóa nhân viên', async({ request }) => {
    // 1.Gửi yêu cầu tạo
    const linkApi = 'https://webhook.site/f6f7857c-ab5b-4f3c-85fc-7c799d776106'
    const responsePost = await request.post(linkApi, {
            data: {
                "name": 'Yamato ',
                'job': 'Junior Automation tester'
            }
        })
        // Check trả về status 201
    expect(responsePost.status()).toBe(200)

    // Lẩy dữ liệu trả về
    // const body = await responsePost.json()
    // Vì trang này cùi nên nó không trả về json đc, ta sẽ dùng text thay thế
    const body = await responsePost.text();

    // check thử xem có phải đúng là cái tên mình vừa gửi không
    // await expect(body.name).toBe('Yamato 3')

    // check sever có tự tạo trường id không?
    // await expect(body.id).toHaveProperty('id')
    const requesPut = await request.put(linkApi, {
        data: {
            "name": 'Yamato new',
            'job': 'Senior Automation tester'
        }
    })
    expect(requesPut.status()).toBe(200)

    const requesDel = await request.delete(linkApi)
    expect(requesDel.status()).toBe(200)
})