const errorMessage = document.getElementsByClassName("error")[0];

document.getElementById("changePassword-form").addEventListener("submit",async(e)=>{
  e.preventDefault();
  const email = e.target.children.email.value;
  const password = e.target.children.password.value;
  const res = await fetch("http://localhost:3000/api/changePassword",{
    method:"POST",
    headers:{
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  if(!res.ok) return errorMessage.classList.toggle("hidden",false);
  const resJson = await res.json();
  if(resJson.redirect){
    window.location.href = resJson.redirect;
  }
})