
console.log("before test() :name", name);

function test() {
    var name = "Lavanya"
    for (var name = 1; name < 5; name++) {
        console.log("within for loop of test() :  var name", name);

    }
    console.log("out of for loop of test() :  var name", name);

}
test();
console.log("after test() : name", name);

console.log("-----");

console.log("before test() :sisname", sisname);

function test() {
    var sisname = "Siri"
    for (var sisname = 1; sisname < 5; sisname++) {
        console.log("within for loop of test() :  var name", sisname);

    }
    console.log("out of for loop of test() :  var name", sisnamename);

}
test();
console.log("after test() : name", sisname);

