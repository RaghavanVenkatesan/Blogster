const Page = require('./helpers/page');
const mongoose = require('mongoose');

async function allmethods() {
    let method = await Page.build();
    return method;
}

let page 
// console.log(page);

beforeEach(async () => {
    page = await allmethods();
    await page.goto('http://localhost:3000');
});

afterEach(async () => {
    await page.close();
});

// test('testing', () => {
//     let a = 3;
//     expect(a).toEqual(3);
// })

describe('When logged in', () => {
    beforeEach(async () => {
        await page.login();
        await page.click('a.btn-floating');
    });

    test('can see blog create form', async () => {
        const label = await page.getContentsOf('form label')
        const value = label.trim();

        expect(value).toEqual('Blog Title');
        // mongoose.connection.close();
    })

    describe('And using invalid inputs', () => {
        beforeEach(async () => {
            await page.click('form button');
        });

        test('the form shows an error message', async () => {
            const titleError = await page.getContentsOf('#title + .red-text');
            const contentError = await page.getContentsOf('#content + .red-text');
            
            const value1 = titleError.trim();
            const value = contentError.trim();
            
            expect(value1).toEqual('You must provide a value');
            expect(value).toEqual('You must provide a value');
        });
    });

    describe('And using vaild inputs', () => {
        beforeEach(async () => {
            await page.type('#title', 'My Title');
            await page.type('#content', 'My Content');
            await page.click('form button');
        });

        test('Submitting takes user to review screen', async () => {
            const text = await page.getContentsOf('h5');

            expect(text).toEqual('Please confirm your entries');
        })

        test('Submitting then saving adds blog to index page', async ()=> {
            await page.click('button.green');
            await page.waitForSelector('.card');

            const title = await page.getContentsOf('.card-title');
            const content = await page.getContentsOf('p');
      
            expect(title).toEqual('My Title');
            expect(content).toEqual('My Content');

            mongoose.connection.close();
        })
    })
});

describe('User is not logged in', () => {
    const actions = [
        {
            method: 'get',
            path: '/api/blogs'
        },
        {
            method: 'post',
            path: '/api/blogs',
            data: {
                title: 'T',
                content: 'C'
            }
        }
    ];

    test('Blog related actions are prohibited', async () => {
        const results = await page.execRequests(actions);

        for(let result of results) {
            expect(result).toEqual({ error: 'You must log in!' })
        }
    })
})