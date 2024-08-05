document.querySelector("form").addEventListener("submit",(event)=>{
    event.preventDefault();
    let formdata = new FormData(document.querySelector("form"),document.querySelector("input[type=submit]"));
    let username = formdata.get("pseudo");
    let password = formdata.get("password");
    let newUser = {username:username,password:password};
    console.log(newUser);
    fetch("http://localhost:3500/api/users",{
        method:"POST",
        headers:{'Accept': 'application/json',
                'Content-Type': 'application/json'},
        body:JSON.stringify(newUser)
    })
    .then(response=>response.json())
    .then(data=>{
        window.location = "./accueil.html?username="+data.username+"&password="+password;
    })
})