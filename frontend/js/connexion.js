document.querySelector("form").addEventListener("submit",(event)=>{
    event.preventDefault();
    let formdata = new FormData(document.querySelector("form"),document.querySelector("input[type=submit]"));
    let username = formdata.get("pseudo");
    let password = formdata.get("password");
    fetch("http://localhost:3500/api/users/"+username+"/"+password)
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        if(data.message){
            window.location = "./connexion.html";
            return;
        }
        window.location = "./accueil.html?username="+data.pseudo+"&password="+password;
    })
    .catch(error=>{
        console.log("error",error)
    })
});