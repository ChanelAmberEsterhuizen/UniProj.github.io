//const { default: Axios } = require('axios');

//const uri = 'http://jsonplaceholder.typicode.com/users'; 
/*const uri = 'http://localhost:3000/people';
let req = new Request(uri, {
    method : 'GET', 
   mode: 'no-cors' 
}); 

fetch(req)
.then((response) => {
    if (response.ok){
        return response.json(); 
    }else{
        throw new Error('BAD http'); 
    }
})
.then((jsonData) =>{
    //console.log(jsonData); 
let ul = document.querySelector("#users"); 
let df = new DocumentFragment();
jsonData.array.forEach(user => {
    let li = document.createElement('li');
 let pn = document.createElement('p'); 
 let pue = document.createElement('p'); 
 pn.textContent = user.name ; 
 pue.textContent  = '-'.concat(user.username, ' ', user.email); 
pn.className = 'name'; 
pn.classList.add('info'); 
li.appendChild(pn); 
li.appendChild(pue);
df.appendChild(li); 
    
});
//((user) =>{
//let li = document.createElement('li');
 //let pn = document.createElement('p'); 
 //let pue = document.createElement('p'); 
 //pn.textContent = user.name ; 
 //pue.textContent  = '-'.concat(user.username, ' ', user.email); 
//pn.className = 'name'; 
//pn.classList.add('info'); 
//li.appendChild(pn); 
//li.appendChild(pue);
//df.appendChild(li); 

//} ) ;
ul.appendChild(df); 
})
.catch((err) =>{
console.log('ERROR', err.message); 
})


fetch('https://localhost:3000/people')
.then(response => {
    return response.json() ; 
})
.then(users => {console.log(users)}); */

//const { response } = require("../app");
 
//GET & Read data
const Http = new XMLHttpRequest();
const url='https://localhost:3000';
Http.open("GET", url);
console.log(Http.responseText)
Http.send();

Http.onreadystatechange = (e) => {
  console.log(Http.responseText)
}

function Validate() {

    $('#error p').remove();

    
    var error = $('#error');

    var idNumber = $('#idnumber').val();


    
    var correct = true;

    if (idNumber.length != 13 || !isNumber(idNumber)) {
        error.append('<p>ID number does not appear to be authentic</p>');
        correct = false;
    }

    var tempDate = new Date(idNumber.substring(0, 2), idNumber.substring(2, 4) - 1, idNumber.substring(4, 6));

    var id_date = tempDate.getDate();
    var id_month = tempDate.getMonth();
    var id_year = tempDate.getFullYear();

    var fullDate = id_date + "-" + (id_month + 1) + "-" + id_year;

    if (!((tempDate.getYear() == idNumber.substring(0, 2)) && (id_month == idNumber.substring(2, 4) - 1) && (id_date == idNumber.substring(4, 6)))) {
        error.append('<p>ID number does not appear to be authentic - date part not valid</p>');
        correct = false;
    }

 
    var genderCode = idNumber.substring(6, 10);
    var gender = parseInt(genderCode) < 5000 ? "Female" : "Male";


    var citzenship = parseInt(idNumber.substring(10, 11)) == 0 ? "Yes" : "No";

   
    var tempTotal = 0;
    var checkSum = 0;
    var multiplier = 1;
    for (var i = 0; i < 13; ++i) {
        tempTotal = parseInt(idNumber.charAt(i)) * multiplier;
        if (tempTotal > 9) {
            tempTotal = parseInt(tempTotal.toString().charAt(0)) + parseInt(tempTotal.toString().charAt(1));
        }
        checkSum = checkSum + tempTotal;
        multiplier = (multiplier % 2 == 0) ? 1 : 2;
    }
    if ((checkSum % 10) != 0) {
        error.append('<p>ID number does not appear to be authentic </p>');
        correct = false;
    };


  
    if (correct) {
        error.css('display', 'none');

       
        $('#result').empty();
    
        $('#result').append('<p>South African ID Number:   ' + idNumber + '</p><p>Birth Date:   ' + fullDate + '</p><p>Gender:  ' + gender + '</p><p>SA Citizen:  ' + citzenship + '</p>');
    }
    // otherwise, show the error
    else {
        error.css('display', 'block');
    }

    return false;
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

$('#idCheck').submit(Validate);



//Read data & GET

const Url = "https://localhost:3000";
Axios.get(Url)
.then(data => console.log(data))
.catch(err => console.log(err)) 