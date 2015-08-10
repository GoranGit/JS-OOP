/**
 * Created by Goran on 7/4/2015.
 */

var k = {}

Object.defineProperty(k,'name',{
value:1,
    enumerable:true

});


//k.name = 'goran'// name  property descriptor is alredy changed to data desc...
k.name = 'Alek'

console.log(k);


function goran()
{
    var name  = 'Goran';
}
function b(name)
{
    console.log(name);
}