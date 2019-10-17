let users,bookMark,bookmarks;

bookMark={
    siteName:"",
    siteUrl:"",
}

// Get Data From Local Storage And If its first one create one 
if(localStorage.getItem('usersInfo')==null)
    {
        users = [];
    }
else
    {
        users = JSON.parse(localStorage.getItem('usersInfo'));
    }





/* function to reset all input fields */
let reset = () => {
        
        let x = document.getElementsByTagName("input");
        for(let i=0 ; i<x.length ; i++)
            x[i].value="";
};

/* Sign Up Form */

let sName = document.getElementById("name-signup");
let sAge=document.getElementById("age-signup");
let sLocation=document.getElementById("location-signup");
let sUserName=document.getElementById("userName-signup");
let sPassWord=document.getElementById("passWord-signup");
let sPassWord2=document.getElementById("passWord-signup2");




/* Sign Up Button */
document.getElementById("btn-signUp").addEventListener('click',function(e){
    
    if(sPassWord.value != sPassWord2.value){
        alert(" You Entered Two Different Passwords , Try Again ");
        sPassWord.value="";
        sPassWord2.value="";
    }
    else if(sName.value==""||sAge.value==""||sLocation.value==""||sUserName.value==""||sPassWord.value==""||sPassWord.value2==""){
        window.alert("You Must Fill All Fields");
        reset();
        return;
    }
    else{
        
        let user = {
            name:sName.value,
            age:sAge.value,
            country:sLocation.value,
            userName:sUserName.value.toLowerCase(),
            passWord:sPassWord.value,
            bookmarks:[]
        }
        
    // Check No user name can be repeated
    for (var i=0;i<users.length;i++)
    {
        if(user.userName==users[i].userName)
            {
                window.alert("This Username Already Exist , Change it");
                document.getElementById("userName-signup").value="";
                return;
            }
    
    }
    
    // Save Data And End OF sign up
    users.push(user); 
    localStorage.setItem("usersInfo",JSON.stringify(users));
                
    window.alert("Registration Done, Log in Now");
    
     reset();  
        
    }
});

/* End Of Sign Up Form */

/* Login Button */

function Login(){
    
    var x=document.getElementById("userName-login").value.toLowerCase();
    var y=document.getElementById("passWord-login").value;
    
    for (var i=0;i<users.length;i++)
    {
        if(x==users[i].userName && y==users[i].passWord)
            {
                localStorage.setItem("UserName",users[i].name);
                /* Change Names Of Tabs */
                document.querySelector(".tab2").innerHTML="ABOUT";
                document.querySelector(".tab1").innerHTML="BookMarks";
                /* Hidden Login Form And Show BookMarks */
                document.querySelector("#login-form").classList.add("d-none");
                document.querySelector("#bookMarks").classList.remove("d-none");
                /* Hidden SignUp Form And Show User Info */
                document.querySelector("#signUp-form").classList.add("d-none");
                document.querySelector("#userProfile").classList.remove("d-none");
                /* Fill Info Of User */
                document.querySelector(".pName").innerHTML=users[i].name;
                document.querySelector(".pUser").innerHTML=users[i].userName;
                document.querySelector(".pAge").innerHTML=users[i].age+" Years";
                document.querySelector(".pLocation").innerHTML="From "+users[i].name;
                
                /* Get User BookMarks */
                 
                if(localStorage.getItem(users[i].name)==null)
                {
                    bookmarks = [];
                }
                else
                {
                    bookmarks = JSON.parse(localStorage.getItem(users[i].name));
                }
                
                showB();
                return;
            }
    
    }
    window.alert("You Username Or Password is Wrong , Please Try Again!");
}

/* LogOut Button */
function logout(){
    location.reload(true);
}

/* Button Add To open Add Form */
function add(){
    document.querySelector("#bookMarksData").classList.add("d-none");
    document.querySelector("#bookMarkAdd").classList.remove("d-none");
    document.querySelector("#bookMarkSearch").classList.add("d-none");
}

/* Button save to save bookmark */
function save(){
    
    bookMark.siteName = document.getElementById("bmName").value;
    bookMark.siteUrl = document.getElementById("bmUrl").value;
    
    if(bookMark.siteName==""||bookMark.siteUrl==""){
        window.alert("You Must Fill All Fields");
        reset();
        return;
        }
    
    // Check No bookmark name can be repeated
    for (var i=0;i<bookmarks.length;i++)
    {
        if(bookMark.siteName==bookmarks[i].siteName||bookMark.siteUrl==bookmarks[i].siteUrl)
            {
                window.alert("This BookMark Already Exist!");
                reset();
                return;
            }
    
    }
    
    // save bookmark 
    let x = localStorage.getItem('UserName');
    for (let i=0 ; i<users.length ; i++)
        if( x == users[i].name )
            {
                bookmarks.push(bookMark);
                localStorage.setItem(x,JSON.stringify(bookmarks));
                reset();
                document.querySelector("#bookMarksData").classList.remove("d-none");
                document.querySelector("#bookMarkAdd").classList.add("d-none");
                showB();
                return;
            }
}



/* Print BookMarks */

function showB(){
    
    var temp="";
    for(var i = 0 ; i <bookmarks.length ; i++)
        {
            temp+='<div class="col-lg-4 col-sm-12 col-12"> <h3 class="border border-white bg-white text-danger rounded p-1 my-1"> '+bookmarks[i].siteName+'</h3> </div> <div class="col-lg-8 col-sm-12 col-12 d-flex justify-content-between"><a class="btn btn-light w-25 mx-auto font-weight-bold my-1 text-danger"  href="https://'+bookmarks[i].siteUrl+'" target="_blank">Visit</a><button class="btn btn-light w-25 mx-auto text-danger font-weight-bold my-1" id="btn-edit" onclick="edit('+i+')"> Edit </button><button class="btn btn-light w-25 mx-auto text-danger font-weight-bold my-1" id="btn-delete" onclick="deleteItem('+i+')"> Delete </button> </div>';
        }
    document.getElementById("bookMarksData").innerHTML=temp;
}


/* To Open Home BookMarks */
function home(){
    document.querySelector("#bookMarksData").classList.remove("d-none");
    document.querySelector("#bookMarkAdd").classList.add("d-none");
    document.querySelector("#bookMarkSearch").classList.add("d-none");
}
/* Delete Button */
function deleteItem(id){
    home();
    /* to know login name */
    let x = localStorage.getItem('UserName');
    /* to delete bookmark and save new list */
    bookmarks.splice(id,1);
    localStorage.setItem(x,JSON.stringify(bookmarks));
    showB();
}


/* Edit Button */
function edit(id){

    document.getElementById("bmName").value=bookmarks[id].siteName;
    document.getElementById("bmUrl").value=bookmarks[id].siteUrl;
    
    deleteItem(id);
    /* for print of edit bookmark on save fields */
    document.querySelector("#bookMarkAdd").classList.remove("d-none");
    document.querySelector("#bookMarkSearch").classList.add("d-none");
}


/* To Open Search Div */
function openSearch(){
    document.querySelector("#bookMarkSearch").classList.remove("d-none");
    document.querySelector("#bookMarksData").classList.add("d-none");
    document.querySelector("#bookMarksEdit").classList.add("d-none");
    
    
}

/* Search Function */
function search(){
    
    let x = document.getElementById("bookMarkSearch").value;
    for(let i=0;i<bookmarks.length;i++){
        if(bookmarks.siteName == x)
            {
                let temp2 ='<div class="col-lg-4 col-sm-12 col-12 d-flex justify-content-center "> <h3 class="border border-white bg-white text-danger rounded p-1 my-1"> '+bookmarks[i].siteName+'</h3> </div> <div class="col-lg-8 col-sm-12 col-12 d-flex justify-content-between"><a class="btn btn-light w-25 mx-auto font-weight-bold my-1 text-danger"  href='+bookmarks[i].siteUrl+' target="_blank">Visit</a><button class="btn btn-light w-25 mx-auto text-danger font-weight-bold my-1" id="btn-edit" onclick="edit('+i+')"> Edit </button><button class="btn btn-light w-25 mx-auto text-danger font-weight-bold my-1" id="btn-delete" onclick="deleteItem('+i+')"> Delete </button> </div>';
                document.getElementById("bookMarksDataSearch").innerHTML=temp2;
            }
        else
            alert("BookMark Not Found !");
    }
}



















