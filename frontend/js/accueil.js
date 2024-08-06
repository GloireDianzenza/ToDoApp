const url = new URL(window.location);
const searchParams = url.searchParams;
const username = searchParams.get("username");const password = searchParams.get("password");
if(username == null || username == undefined || username.trim() === "")window.location = "./index.html";
else if(password == null || password == undefined || password.trim() === "")window.location = "./index.html";
let idUser;

fetch("http://localhost:3500/api/users/"+username+"/"+password)
.then(response=>response.json())
.then(data=>{
    
    
    const id = data.id;
    idUser = id;
    fetch("http://localhost:3500/api/manage/"+id)
    .then(response=>response.json())
    .then(data=>{
        for(let task of data){
            fetch("http://localhost:3500/api/tasks/"+task.idTask)
            .then(response=>response.json())
            .then(data=>{
                let taskTitle = data.title;

                let taskDiv = document.createElement("div");
                taskDiv.classList.add("task");

                let inputDiv = document.createElement("input");
                inputDiv.id = "title";
                inputDiv.classList.add("title");
                inputDiv.value = taskTitle;
                taskDiv.appendChild(inputDiv);

                let editBtn = document.createElement("button");
                editBtn.id = "editBtn";
                editBtn.innerText = "Modifier";

                editBtn.addEventListener("click",()=>{
                    
                })

                taskDiv.appendChild(editBtn);
                
                let deleteBtn = document.createElement("button");
                deleteBtn.id = "deleteBtn";
                deleteBtn.innerText = "Supprimer";
                taskDiv.appendChild(deleteBtn);

                let completeChk = document.createElement("input");
                completeChk.type = "checkbox";
                completeChk.name = "completed";
                completeChk.id = "completed";

                completeChk.addEventListener("click",(event)=>{
                    let target = event.target;
                    let parent = target.parentNode;
                    let idTask = parseInt(parent.getAttribute("data-id"));
                    console.log(parent);

                    fetch("http://localhost:3500/api/manage/"+idUser+"/"+idTask+"/toggle",{
                        method:"PUT",
                        headers:{'Accept': 'application/json',
                'Content-Type': 'application/json'},
                    })
                    .then(response=>response.json())
                    .then(data=>{
                        console.log(data);
                        window.location = "./accueil.html?username="+username+"&password="+password;
                    })
                    .catch(error=>{
                        console.error("error",error);
                    })
                })


                fetch("http://localhost:3500/api/manage/"+id+"/"+data.id)
                .then(response=>response.json())
                .then(data=>{
                    completeChk.checked = data.completion === "Done";
                })
                .catch(error=>{
                    console.error("error",error);
                })
                
                taskDiv.appendChild(completeChk);
                taskDiv.setAttribute("data-id",data.id.toString());

                tasks.appendChild(taskDiv);
            })
        }
    })
    .catch(error=>{
        console.error("error",error);
    })


})
.catch(error=>{
    console.error("error",error);
    window.location = "./index.html";
})