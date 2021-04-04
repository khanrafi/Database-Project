var binds=[];
var binds2=[
  {
    t1:"tasfik",
    t2:"rahman"
  }
];

var obj2={};
var chr = String.fromCharCode(49);
var placeholder='t'+chr;
obj2[placeholder]="tasfik";


binds.push(obj2);

console.log(obj2);
console.log(binds[0].t1);
console.log(binds2[0].t1);


console.log(placeholder);
