const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") }); //config env
var exphbs = require("express-handlebars"); //template
const db = require("./config/db"); // connect database
const routes = require("./routes");

const cookieParser = require("cookie-parser"); //parser cookie
app.use(cookieParser());

var methodOverride = require("method-override"); // overide method
// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride("_method"));
//tạo 1 middleware lưu vào object req.query
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
db.connect();
//handlebars template
app.engine("handlebars", exphbs());
//config name file
app.engine(
  ".hbs",
  exphbs({
    extname: ".hbs",
    helpers: {
      increment: (a, b) => a + b,
      showMessages: (currentUser, data) => {
        let chat = data.content
        ? '<div class="text-left  mb-2">' +
          `<p class="mb-1">${data.users.name}</p>` +
          `<p class="friend">${data.content}</p>` +
          `<p class="pl-2 pt-2 time"> ${data.created_at.toLocaleString()}</p>` +
          "</div>"
        : "";

        if (data.users._id == currentUser) {
           chat = data.content
            ? `<div class="text-right mb-2"> <p class="your-self">` +
              `${data.content}</p></div>`
            : "";
        }

        return chat;
      },
    },
  })
);
app.set("view engine", ".hbs");

//set url view
app.set("views", path.join(__dirname, "resources/views"));

//set static folder
app.use(express.static(path.join(__dirname, "public")));
//route
routes(app);

app.use("/", (req, res) => {
  res.render("home");
});

const server = require("http").createServer(app);
const io = require("socket.io")(server);

io.on("connection", (socket) => {
  // socket.emit("message", "Welcome to web");
  socket.on("send", function (client) {
    if (client.message) {
      var date = new Date();
      client.time = date.toLocaleString();
      io.emit("message", client);
    }
  });
  socket.on("disconnect", (data) => {
    //console.log(data);
  });
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
