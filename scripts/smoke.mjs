import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
const browser = await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless:true, args:['--no-sandbox']});
const base = process.env.SMOKE_BASE_URL || 'http://127.0.0.1:5173';
let checks=0;
try {
 const page = await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.goto(base);await page.getByRole('heading',{name:'Small decisions. Greener futures.'}).waitFor();checks++;
 await page.getByRole('link',{name:'Explore the dashboard'}).click();
 await page.getByRole('heading',{name:'A brighter outlook starts here.'}).waitFor();
 await page.getByText('$18,450',{exact:true}).waitFor();
 await page.getByText('142 kg',{exact:true}).waitFor();
 await page.getByText('Not available',{exact:true}).waitFor();checks++;
 assert.equal(await page.locator('tbody tr').count(),2);
 assert.match(await page.locator('tbody tr').first().innerText(),/30 \/ 12/);checks++;
 await page.locator('svg.recharts-surface').first().waitFor();
 await page.screenshot({path:'/tmp/green-school-desktop.png',fullPage:true});checks++;
 for(const path of ['inventory','purchases','consumption','utilities','assets','recommendations','purchase-orders','impact','suppliers','calendar','reports','settings']){
  await page.goto(`${base}/app/${path}`);
  await page.getByRole('heading',{name:/Planned for Stage/}).waitFor();
  assert.equal(await page.locator('nav a.active').count(),1);checks++;
 }
 await page.goto(`${base}/login`);
 await page.getByLabel('School email').fill('test@example.org');
 await page.getByLabel('Password',{exact:true}).fill('example-only-password');
 await page.getByRole('button',{name:'Continue'}).click();
 await page.getByRole('status').filter({hasText:'does not send or store credentials'}).waitFor();checks++;
 await page.getByRole('link',{name:'Register your school'}).click();
 await page.getByRole('heading',{name:'Make space for better.'}).waitFor();checks++;
 await page.goto(`${base}/missing`);await page.getByRole('heading',{name:'This page isn’t here'}).waitFor();checks++;
 await page.setViewportSize({width:390,height:844});await page.goto(`${base}/app/dashboard`);
 await page.getByText('$18,450',{exact:true}).waitFor();
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth),true);
 await page.getByRole('button',{name:'Open navigation'}).click();
 await page.getByRole('navigation',{name:'Workspace'}).getByRole('link',{name:'Inventory',exact:true}).click();
 await page.getByRole('heading',{name:'Inventory',exact:true}).waitFor();
 assert.equal(await page.getByRole('button',{name:'Open navigation'}).getAttribute('aria-expanded'),'false');checks++;
 await page.goto(`${base}/app/dashboard`);await page.getByText('$18,450',{exact:true}).waitFor();
 await page.screenshot({path:'/tmp/green-school-mobile.png',fullPage:true});
 await page.goto(base);await page.getByRole('heading',{name:'Small decisions. Greener futures.'}).waitFor();
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth),true);checks++;
 await page.setViewportSize({width:768,height:1024});await page.goto(`${base}/app/dashboard`);await page.getByText('$18,450',{exact:true}).waitFor();
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth),true);checks++;
 assert.deepEqual(errors,[]);checks++;
 console.log(`Passed ${checks} browser checks: landing, dashboard data and charts, reservations, all workspace routes, auth boundary, 404, mobile navigation, responsive layouts, and no browser exceptions.`);
} finally {await browser.close();}
