const count: number = 1;

const teacher: {
  name: string,
  age:number,
} = {
  age: 27,
  name:"niuxinyu"
}

class Person { }
const niuxinyu: Person = new Person()

function hello() {
  
}

function add(first: number) :number{
  return first
}

function sayHello():void {
  
}

function errorEmitter() :never {
  while(true){}
}

function add1({ first, sec }: { first: number, sec: number }): number{
  return first + sec
}
const func = (str: string): number  =>{
  return parseInt(str)
}
const fun1 : (str: string) => number = (str) => {
  return parseInt(str)
}

interface Teacher  {
  name: string
}
const rawData = '{"name":"dell"}'
const newData: Teacher = JSON.parse(rawData)

let temp:number|string = 123
temp = '234'
console.log(temp)

class Person1 {

}