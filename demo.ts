interface Bird {
  fly: Boolean,
  sing: () =>{ }
}
interface Dog {
  fly: Boolean,
  bark: () => {}
}
// 类型断言
function trainAnimal(animal: Bird | Dog){
  if(animal.fly){
    (animal as Bird).sing()
  }else {
    (animal as Dog).bark()
  }
}
// in 语法
function trainAnimalSecond(animal: Bird | Dog){
  if("sing" in animal){
   animal.sing()
  }else {
   animal.bark()
  }
}

// typeof
function add (first: number|string,second: number|string){
  if(typeof first === "string" || typeof second === "string"){
    return `${first}${second}`
  }else {

    return first + second
  }
}
class NumberObj {
  count: number = 0
}
// instanceof
function addSecond (first: object|NumberObj,second: object|NumberObj){
  if( first instanceof NumberObj &&  second instanceof NumberObj){
    return first.count + second.count
  }else {

    return 0
  }
}