let is_login = false;  
// feach data from API
fetch_data = () => {
fetch('https://api.jsonbin.io/b/5f69e387302a837e956b59b5', { headers: { "Content-Type": "application/json; charset=utf-8" }})
    .then(res => res.json())
    .then(response => {
        const tracks = response.tracks;
        generate_html(tracks , 'html_tbl')
        console.log(html_tbl);
    })
    .catch(err => {
        console.log("u");
        alert("sorry, there are no results for your search");
    });
}
// helper function to featch data into html and append it 
generate_html = (_arr , html_container) => {
    let html_tbl = 
    `<table class="table table-striped table-dark mt-5">
        <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Artist</th>
                <th scope="col">Download</th>
                <th scope="col">length</th>
            </tr>
        </thead>
        <tbody>`;
        for(let _eleOfArr of _arr){
            html_tbl +=`
            <tr>
                <th scope="row">${_eleOfArr.name}</th>
                <td> ${_eleOfArr.artist} </td>
                <td> <a class="btn btn-light download_btn" ${(is_login ? `href="${_eleOfArr.url}" target="_blank" download="download"`   : `data-target="#loginModal"  data-toggle="modal" onclick="set_item_url('${_eleOfArr.url }')" id="mohaemd"` )  } > Download </a>  </td>
                <td> ${_eleOfArr.length} S</td>
            </tr>
            `;
        }
        html_tbl += `
        </tbody>
    </table>`;
    document.getElementById(`${html_container}`).innerHTML  =  html_tbl;
};
set_item_url = (url) =>{
    localStorage.setItem('element_url',url);
    console.log(localStorage.getItem('element_url'));
}
fetch_data();
// handel login methon 
handel_login = () => {
    let user_name = document.loginform.user_name.value;   
    let password = document.loginform.password.value;
    if (user_name == "") { 
        document.getElementById("user_name").classList.add("border-danger");
        document.getElementById("user_name").focus();
        console.log('invalid data');
        return false;
    }else{
        document.getElementById("user_name").classList.remove("border-danger");
        document.getElementById("user_name").classList.add("border-success");
    }
    if(password == ""){
        document.getElementById("password").classList.add("border-danger");
        document.getElementById("password").focus();
        console.log('invalid data');
        return false;
    }else{
        document.getElementById("password").classList.remove("border-danger");
        document.getElementById("password").classList.add("border-success");
    }
    
}
// login request 
document.getElementById('loginform').addEventListener('submit' , (e)=>{
    handel_login();
    e.preventDefault();
    const formData = new FormData();
    formData.append('user_name' , user_name.value);
    formData.append('password' , password.value)
    document.getElementById('loading-icon').style.display = 'inline';
    fetch('http://localhost/leap13task/login.php' ,
    {
        method:'POST',
        body:formData
    })
    .then((response)=>{
        return response.text();
    })
    .then((text)=>{
        let login_result =JSON.parse( text);
        document.getElementById('loading-icon').style.display = 'none';
        if (!login_result.login) {
            var form_elem = document.getElementById('loginform');
            var alert_login = document.createElement('div');
            alert_login.innerText = 'Login Error Wrong User Name Or Password';
            alert_login.className += 'alert alert-danger';
            form_elem.parentNode.insertBefore(alert_login, form_elem);
            document.getElementById("user_name").classList.add("border-danger");
            document.getElementById("password").classList.add("border-danger");
        }else{
            is_login = true;
            fetch_data();
            var form_elem = document.getElementById('loginform');
            var alert_login = document.createElement('div');
            alert_login.innerText = 'Your Can Download Now ';
            alert_login.className += 'alert alert-success';
            form_elem.parentNode.insertBefore(alert_login, form_elem);
            setTimeout(() => {
                $('#loginModal').modal('hide');
            }, 2000);
                // here we can handel download buttons and download file ajax 
                // var a = document.createElement('a');
                // a.href     = "http://nilepromotion.com/abanob/wp-content/uploads/2019/07/Akon-Lonely.mp3";
                // a.download = 'download';
                // a.target   = '_blank';
                // a.click();
                }
    })
    .catch((error)=>{
        console.log(error)
    })
})
