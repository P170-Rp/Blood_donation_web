// document.getElementById("registerForm").addEventListener("submit", function(e){
//  e.preventDefault();

//  const data={
//   username:username.value,
//   password:password.value,
//   name:name.value,
//   phone:phone.value,
//   blood_group:blood_group.value,
//   age:age.value,
//   city:city.value
//  };

//  fetch("http://localhost:3000/auth/register",{
//   method:"POST",
//   headers:{"Content-Type":"application/json"},
//   body:JSON.stringify(data)
//  })
//  .then(res=>res.json())
//  .then(data=>{
//   console.log(data);
//   msg.innerText=data.message;

//   if(data.status==="success"){
//     window.location.href="login.html";
//   }
//  })
//  .catch(err=>{
//   console.log(err);
//   msg.innerText="Server Error";
//  });
// });
