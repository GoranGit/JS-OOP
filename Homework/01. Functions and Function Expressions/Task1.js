/**
 * Created by Goran on 6/24/2015.
 */

// IIFE  se koristi za da razdeli scope od razli;ni fajlovi bidejki moze da imame isti iminja  na  funkcii
// IIFE definira oddelen scope  nezavisen od globalniot i se izvikuva  tocno ednas
(function(name){
    console.log(name);
}("Gosho"));

// IIFE koe vraka vrednost se narekuva  modul


var module  = function(){

    var nextId = 0;
    return function(){
       return  nextId+=1;
    }
    return 5;}();

console.log(module());
console.log(module());


function sum(numbers) {

    var sum = 0;
    if(numbers===undefined)
    throw  new Error("Parameter is not passed!");

    if(numbers.length===0)
    return null;

    for (var i = 0, len = numbers.length; i < len; i += 1)
    {
        if(typeof (numbers[i])!==typeof (5))
        {
            throw new Error( numbers[i] + " element is not a number!");
        }else
        sum+=numbers[i];
    }
    return sum;
}


console.log(typeof (5));

console.log(sum([1,"h2",3,4,5,6,7,8,9]));