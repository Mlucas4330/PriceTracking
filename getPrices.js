import puppeteer from 'puppeteer';

const url = 'https://www.decolar.com/trip/accommodations/detail/PC69a2161822cc47dabfd56a0e0b50de8828151883?hotel_product_id=H1&flow=FH&abcv=YWJjdi1mb3JjZWRHRFM9ZmFsc2UmYWJjdi1mb3JjZWRGaW5hbD1mYWxzZQ&searchParams=RkgvQ0lUXzU4MjIvQ0lUXzYzODEvMjAyMy0xMS0xNi8yMDIzLTExLTE4L0NJVF82MzgxLzIwMjMtMTEtMTYvMjAyMy0xMS0xOC8zfEgxOkgsRjA6RixYUzpYUw%3D%3D&stepNum=0&throughResults=true&searchId=a443db3c-dd05-4350-a6a2-30b9efe6c9cd';

const getPrices = async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.goto(url);

    const prices = await page.evaluate(() => {
        const totalPrice = document.querySelector(".tertiary-price");
        const pricePerPerson = document.querySelector(".main-value")

        if (!totalPrice || !pricePerPerson) return;

        return {
            totalPrice: totalPrice.textContent,
            pricePerPerson: `R$ ${pricePerPerson.textContent}`
        }

    })
    await browser.close();

    return prices;
}

export const prices = await getPrices();