import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
 
const peoples = new Map();

peoples.set("mary", {
  name: "mary",
  tel: "082-313543",
});

const router = new Router();
router
  .get("/", (ctx) => {
    ctx.response.body = "Home";
  })
  .get("/people", (ctx) => {
    ctx.response.body = Array.from(peoples.values());
  })
  .post("/people/add", async (ctx) => {
    const body = ctx.request.body()
    if (body.type === "form") {
      const pairs = await body.value
      console.log('pairs=', pairs)
      const params = {}
      for (const [key, value] of pairs) {
        params[key] = value
      }
      console.log('params=', params)
      let name = params['name']
      let tel = params['tel']
      ctx.response.type = 'text/html'
      console.log(`name=${name} tel=${tel}`)
      if (peoples.get(name)) {
        ctx.response.body = `<p>帳號重複</p><p><a href="/public/">通訊管理系統</a></p>`       
                
      } else {
        peoples.set(name, {name, tel})
        ctx.response.body = `<p>新增 (${name}, ${tel})註冊成功</p></p><p><a href="/public/">通訊管理系統</a></p>`
      }
  
    }

  })
  .post("/people/find", async (ctx) => {
    const body = ctx.request.body()
    if (body.type === "form") {
      const pairs = await body.value
      console.log('pairs=', pairs)
      const params = {}
      for (const [key, value] of pairs) {
        params[key] = value
      }
      console.log('params=', params)
      let name = params['name']
      let tel = params['tel']
      console.log(`name=${name} tel=${tel}`)
      if (peoples.get(name)) {
        ctx.response.body = ({'error':`name=${name} 帳號已被別人使用過 `})        
      } else {
        peoples.set(name, {name, tel})
        ctx.response.type = 'text/html'
        ctx.response.body = `<p>新增 (${name}, ${tel})註冊成功</p></p><p><a href="/public/">通訊管理系統</a></p>`
      }
  
    }
  })
  .get("/public/(.*)", async (ctx) => {
    let wpath = ctx.params[0]
    console.log('wpath=', wpath)
    await send(ctx, wpath, {
      root: Deno.cwd()+"/public/",
      index: "index.html",
    })
  })

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log('start at : http://127.0.0.1:8000/public/')

await app.listen({ port: 8000 });
