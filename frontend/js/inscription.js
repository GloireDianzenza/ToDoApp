document.querySelector("form").addEventListener("submit",(event)=>{
    event.preventDefault();
    let formdata = new FormData(document.querySelector("form"),document.querySelector("input[type=submit]"));
})