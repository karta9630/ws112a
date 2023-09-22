import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = " ";
  })
  .get("/nqu", (context) => {
    context.response.body =  (`
    <html>
      <body>
      <a href="https://www.nqu.edu.tw/">金門大學<a>
      </body>
    </html>
    `);
  })
  .get("/nqu/csie", (context) => {
    context.response.body =  (`
    <html>
      <body>
        <a href="https://csie.nqu.edu.tw/">金門大學資工系<a>
      </body>
    </html>
    `);
  })
  .get("/to/nqu", (context) => {
    context.response.redirect('https://www.nqu.edu.tw/')
  })
  .get("/to/nqu/csie", (context) => {
    context.response.redirect('https://csie.nqu.edu.tw/')
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log('start at : http://127.0.0.1:8000')
await app.listen({ port: 8000 });
