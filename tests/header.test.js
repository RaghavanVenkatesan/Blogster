const Page = require('./helpers/page');
const mongoose = require('mongoose');

async function allmethods() {
    let method = await Page.build();
    return method;
}

let page;

beforeEach(async() => {
    page = await allmethods();
    await page.goto('http://localhost:3000');
})

afterEach(async () => {
    await page.close();
})

test('The header has the correct text', async () => {
    const text = await page.getContentsOf('a.brand-logo'); 

    expect(text).toEqual('Blogster');
})

test('clicking login starts oauth flow', async () => {
    await page.click('.right a');

    const url = await page.url();

    expect(url).toMatch(/accounts\.google\.com/)
})

test('When signed in, shows logout button', async () => {
//     let cookie = require('cookie');
//     let signature = require('cookie-signature');

//     const sessionid = 'jsSJXh6WaW420NNAz7qAy1DfOyA1aWY9';
    // let name = 'connect.sid';

//     let secret = '123123123'
 
// if (secret && !Array.isArray(secret)) {
//  secret = [secret];
// }

// let option ={
//    cookie: { path: '/', _expires: null, originalMaxAge: null, httpOnly: true },
//    passport: { user: '63995c606896335dc1d6c2e8' }
//  }    

//  let signed = 's:' + signature.sign(sessionid, secret[0]);

//  let data =  cookie.serialize(name, signed, option)
// console.log(data);
//  await page.setCookie({ name: name, value: 's%3AH9qLATJklmILOKpW1owzPzwQqQ5PWVap.qehu0esC8mbczNRK%2BHrWY7Td6NoLnhynD6XaAiX5YpI'})
//  await page.goto('http://localhost:3000');
//  await page.waitForSelector('a[href="/auth/logout"]');
await page.login();

const text = await page.getContentsOf('a[href="/auth/logout"]'); 

 expect(text).toEqual('Logout');
 
 mongoose.connection.close()
})