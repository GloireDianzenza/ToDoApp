const {app,sequelize} = require("./app");
const port = process.env.PORT || 3500;
app.set("port",port);

app.listen(port,()=>{
    console.log("Listening to port "+port);
})