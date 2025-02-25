const errorMessage = document.getElementsByClassName("error")[0];

document.getElementById("recoverPassword-form").addEventListener("submit",async(e)=>{
  e.preventDefault();
  const email = e.target.children.email.value;
  const res = await fetch("http://localhost:3000/api/recoverPassword",{
    method:"POST",
    headers:{
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
      email,
    }),
  });
  if(!res.ok) return errorMessage.classList.toggle("escondido",false);
  const resJson = await res.json();
  if(resJson.redirect){
    window.location.href = resJson.redirect;
  }
})