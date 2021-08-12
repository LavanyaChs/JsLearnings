document.forms['myform'].addEventListener('submit', (e) => {
    e.preventDefault()
    alert('form Submit ' + e.target + " Current target" + e.currentTarget)
})
const two = (e) => {
    //e.stopPropagation();
    //e.stopImmediatePropagation();
    alert("first_div Target: " + e.target + " Current target" + e.currentTarget)
};
const three = (e) => {
    //e.stopPropagation();
    //e.stopImmediatePropagation();
    alert('mainDiv Target: ' + e.target + " Current target" + e.currentTarget);
}
const four = (e) => {
    //e.stopPropagation();
    //e.stopImmediatePropagation();
    alert('first_div_subDiv Target: ' + e.target + " Current target" + e.currentTarget);
}
const five = (e) => {
    //e.stopPropagation();
    //e.stopImmediatePropagation();
    alert('sub_div1 Target: ' + e.target + " Current target" + e.currentTarget);
}
const six = (e) => {
    //e.stopPropagation();
    e.stopImmediatePropagation();
    alert('sub_div2 - event 1- Target: ' + e.target + " Current target" + e.currentTarget);
}
const bodyFun = (e) => {
    //e.stopPropagation();
    //e.stopImmediatePropagation();
    alert('body ' + e.target + " Current target" + e.currentTarget);
}
const six_sub = (e) => {
    //e.stopPropagation();
    alert('sub_div2 - event 2- Target: ' + e.target + " Current target" + e.currentTarget);
    document.getElementById("sub_div2").style.color = 'red'
}
// document.getElementById("body").addEventListener('click', bodyFun);
document.getElementById("test").addEventListener('click', one);
document.getElementById("first_div").addEventListener('click', two);
document.getElementById("mainDiv").addEventListener('click', three);
document.getElementById("first_div_subDiv").addEventListener('click', four);
document.getElementById("sub_div1").addEventListener('click', five);
document.getElementById("sub_div2").addEventListener('click', six);
document.getElementById("sub_div2").addEventListener('click', six_sub);

function one(e) {
    alert("test submitted - Target: " + e.target + " Current target" + e.currentTarget);
}



class Temp {
    constructor(fname, lname) {
        this.fname = fname;
        this.lname = lname;
    }
    getName() {
        console.log(this.fname + " " + this.lname)
    }
}

var obj1 = new Temp('testF', 'testL');
obj1.getName()


var obj = {
    firstName: "Sai",
    lastName: "Lavanya",
    getName: () => {
        console.log(`${this.firstName} ${this.lastName}`)
    }
}
// var newNameOb = new obj();

// var printName1 = newNameOb.getName.bind(newNameOb)
var printName = obj1.getName.call(obj);

// printName()

// printName1();


document.querySelector('.search').addEventListener('keyup', (e) => {
    console.log("Test Search!! " + e.target.value)
})




////

var name ='lav'
let email = '@jhasdjh';
function displayName(){
    
    

    if(true){
        let email ='dhjsj'
        var name= "vanya"
    }
    console.log(name);
console.log(email)
  }
displayName();
console.log(name);
console.log(email)


