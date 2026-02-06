document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault();

    const data = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    };

    fetch("http://localhost:3000/auth/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
        if(result.status === "success"){
            localStorage.setItem("user_id", result.user_id);
            window.location.href = "dashboard.html";
        }else{
            document.getElementById("msg").innerText = "Invalid Username or Password";
        }
    })
    .catch(()=>{
        document.getElementById("msg").innerText = "Server Error";
    });
});
