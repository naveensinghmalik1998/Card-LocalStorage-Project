var addBtn = document.querySelector("#add-btn");
var modal = document.querySelector(".modal");
var closeBtn = document.querySelector(".close-icon"); 

addBtn.onclick = function() {
    modal.classList.add("active");
}
closeBtn.addEventListener( "click", () => {
    modal.classList.remove("active");
});

var userData = [];
var idEI = document.getElementById("id");
var nameEI = document.querySelector("#name");
var l_nameEI = document.getElementById("l-name");
var emailEI = document.querySelector("#email");
var officeEI = document.querySelector("#office-code");
var jobTitle = document.querySelectorAll("#job-title");
var registerBtn = document.querySelector("#register-btn");
var registerform = document.querySelector("#register-form");
var imgUrl;

registerform.onsubmit = function(event) {
    event.preventDefault();
    regitrationData();
    getDataFromLocal();
    registerform.reset('');
    closeBtn.click();
};

if(localStorage.getItem("userData") != null) {
    userData = JSON.parse(localStorage.getItem("userData"));
}

function regitrationData() {
  userData.push({
    id: idEI.value,
    name: nameEI.value,
   lastName: l_nameEI.value,
   email: emailEI.value,
   officeCode: officeEI.value,
   jobTitle : jobTitle.value,
   profilePic : imgUrl == undefined ? "img/men images1.png" : imgUrl
  });

  var userString = JSON.stringify(userData);
  localStorage.setItem("userData", userString);
}

var tableData = document.querySelector("#table-data");
const getDataFromLocal = () => {
    tableData.innerHTML= "";
    userData.forEach((data,index) =>{
        tableData.innerHTML += ` 
        <tr index='${index}'>
        <td>${index+1}</td>
        <td><img src="${data.profilePic}" width="40" height="50"></td>
        <td>${data.id}</td>
        <td>${data.name}</td>
        <td>${data.l_name}</td>
        <td>${data.email}</td>
        <td>${data.officeCode}</td>
        <td>${data.jobTitle}</td>
        <td>
            <button><i class="fa fa-eye"></i></button>
            <button style="background-color: #EE534F;"><i class="fa fa-trash"></i></button>
        </td>
      </tr>
        `;
    });
};
getDataFromLocal();

var profile_pic = document.querySelector("#profile-pic");
var upload_pic = document.querySelector("#upload-pic");
upload_pic.onchange = function() {
    if(upload_pic.files[0].size <  2097152){

        var fReader = new FileReader();
        fReader.onload = function(e) {
             imgUrl = e.target.result;
            profile_pic.src = imgUrl;
        }
        fReader.readAsDataURL(upload_pic.files[0]);
    }else{
        alert('File size is too large');
    }
}