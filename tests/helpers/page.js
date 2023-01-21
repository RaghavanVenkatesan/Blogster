const puppeteer = require('puppeteer');
const sessionFactory = require('../factories/sessionFactory');
const userFactory = require('../factories/userFactory');

class CustomPage {
    static async build() {
        const browser = await puppeteer.launch({
          headless: true,
          args: ['--no-sandbox']
        });
    
        const page = await browser.newPage();
        const customPage = new CustomPage(page, browser);
    
        return new Proxy(customPage, {
          get: function(target, property) {
            return customPage[property];
          }
        });
      }

    constructor(page, browser){
        this.page = page
        this.browser = browser
    }

    async login() {
        const user = await userFactory();
        const { session, sig } = sessionFactory(user);
    
        await this.page.setCookie({ name: 'session', value: session });
        await this.page.setCookie({ name: 'session.sig', value: sig });
        await this.page.goto('http://localhost:3000/blogs');
        await this.page.waitForSelector('a[href="/auth/logout"]');
      }

   async goto(url) {
      await this.page.goto(url);
   }
   
   async close() {
    await this.browser.close();
   }

   async getContentsOf(selector) {
    return this.page.$eval(selector, el => el.innerHTML);
  }

  async click(selector) {
    return this.page.click(selector)
  }

  async url() {
    return this.page.url()
  }

  async waitForSelector(selector){
    return this.page.waitForSelector(selector)
  }

  async type(selector, value){
    return this.page.type(selector, value)
  }

  get(path){
    return this.page.evaluate(_path => {
      return fetch(_path, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());
    }, path);
  }

  post(path, data) {
    return this.page.evaluate(
      (_path, _data) => {
        return fetch(_path, {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(_data)
        }).then(res => res.json());
      },
      path,
      data
    );
  }

  execRequests(actions) {
    return Promise.all(
      actions.map(({ method, path, data }) => {
        return this[method](path, data);
      }) 
    )
  }
}

module.exports = CustomPage;