let x={};
x.ONE=1;
x.TWO=2;
x.THREE=3;
x.FOUR=4;
let y = Object.keys(x).reduce((p, q) => {
    console.log(p+"  "+q);

    p[q] = x[q];
    console.log("p is:")
    console.log(p);
    return p;
},{} )



//console.log(x);
//console.log(y);


// let z = [1,2,3,4,5,6,7];
//  console.log(z);
// z.reduce((ac,run)=>
// {
//     console.log(ac +"      "+run);
//     return ac+run;
// })