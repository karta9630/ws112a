// render.js

export function layout(title, content) {
    return `
    <html>
    <head>
      <title>${title}</title>
      <style>
      body {
          padding: 80px;
          font: 16px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f4f4f4;
          color: #333;
        }
        
        h1 {
          font-size: 2.5em;
          color: #0066cc;
        }
        
        h2 {
          font-size: 1.5em;
          color: #009900;
        }
        
        #posts {
          margin: 0;
          padding: 0;
        }
        
        #posts li {
          margin: 40px 0;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 5px;
          background-color: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          list-style: none;
          transition: box-shadow 0.3s ease-in-out;
        }
        
        #posts li:hover {
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
        }
        
        textarea {
          width: 100%;
          max-width: 500px;
          height: 200px;
          border: 1px solid #ddd;
          border-radius: 5px;
          padding: 10px;
          font-size: 1em;
          transition: border-color 0.3s ease-in-out;
        }
        
        textarea:focus {
          border-color: #0066cc;
        }
        
        input[type=text],
        input[type=password],
        input[type=submit],
        textarea {
          margin-bottom: 15px;
        }
        
        input[type=text],
        input[type=password],
        textarea {
          width: 100%;
          max-width: 500px;
          height: 40px;
          border: 1px solid #ddd;
          border-radius: 5px;
          padding: 10px;
          font-size: 1em;
          transition: border-color 0.3s ease-in-out;
        }
        
        input[type=text]:focus,
        input[type=password]:focus,
        textarea:focus {
          border-color: #009900;
        }
      </style>
    </head>
    <body>
      <section id="content">
        ${content}
      </section>
    </body>
    </html>
    `;
  }
  
  export function loginUi() {
    return layout('Login', `
    <h1>登入</h1>
    <form action="/login" method="post">
      <p><input type="text" placeholder="帳號" name="username"></p>
      <p><input type="password" placeholder="密碼" name="password"></p>
      <p><input type="submit" value="登入"></p>
      <p> <a href="/signup">創建帳戶</a>
    </form>
    `);
  }
  
  export function signupUi() {
    return layout('Signup', `
    <h1>註冊</h1>
    <form action="/signup" method="post">
      <p><input type="text" placeholder="帳號" name="username"></p>
      <p><input type="password" placeholder="密碼" name="password"></p>
      <p><input type="text" placeholder="email" name="email"></p>
      <p><input type="submit" value="Signup"></p>
    </form>
    `);
  }
  
  export function success() {
    return layout('Success', `
    <h1>註冊成功</h1>
    You may <a href="/">連覽資料</a> / <a href="/login">登入</a>
    `);
  }
  
  export function fail() {
    return layout('Fail', `
    <h1>錯誤!</h1>
    你可以 <a href="/">內容</a> or <a href="JavaScript:window.history.back()">返回</a> !
    `);
  }
  
  export function list(posts, user) {
      console.log('list: user=', user);
      let list = [];
      for (let post of posts) {
          const deleteLink = (user && post.username === user.username)
          ? ` | <a href="/post/delete/${post.id}">刪除</a>`
          : '';
        list.push(`
        <li>
          <p><a href="/post/${post.id}">${post.title}</a></p>
          ${deleteLink}
          
        </li>
        `);
        
      }
      
      let content = `
      <h1>備忘錄</h1>
      <p>${(user == null) ? '<a href="/login">登入</a> 創建檔案' : '歡迎 ' + user.username + ' 進入系統，你可以 <a href="/post/new">進行創建檔案</a> 或是 <a href="/logout">登出</a> !'}</p>
      <p>有<strong>${posts.length}</strong> 筆資料</p>
      <ul id="posts">
        ${list.join('\n')}
      </ul>
      `;
      return layout('Posts', content);
    }
  
  export function newPost() {
    return layout('New Post', `
    <h1>新增資料</h1>
    <form action="/post" method="post">
      <p><input type="text" placeholder="日期" name="title"></p>
      <p><textarea placeholder="" name="body"></textarea></p>
      <p><input type="submit" value="新增"></p>
    </form>
    `);
  }
  
  
  export function deleteConfirmation(post) {
    return layout('Confirm Deletion', `
      <form action="/post/delete/${post.id}" method="post">
      </form>
    `);
  }
  export function show(post) {
    return layout(post.title, `
      <h1>${post.title}</h1>
      <p>${post.body}</p>
      <p>${deleteLink}</p>
    `);
  } 
  
  