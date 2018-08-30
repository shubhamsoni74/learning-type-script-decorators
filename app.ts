function logged(constructorFn:Function) {
   console.log(constructorFn);
}
    
@logged
class Person{
    constructor() {
    console.log("Hii!");
    }
}

//factory
function logging(value:boolean){
    return value? logged:null;
}

@logging (false)
class Car {

}

//advanced
function printable(constructorFn: Function){
    constructorFn.prototype.print = function(){
        console.log(this);
    }
}
@logging(true)
@printable
class Plant {
    name ="Green plant";
}
const plant = new Plant();
(<any>Plant).print();


//Method Decorator
function editable(value:boolean){
    return function(target:any, propName:string,descriptor: PropertyDescriptor){
        descriptor.writable=value;

    }
}

class Project{
    projectName:string;

    constructor(name:string){
        this.projectName=name;
    }
    @editable(false)
    calcBudget() {
        console.log(1000);
    }
}

const project =new Project("Super Project");
project.calcBudget();
project.calcBudget= function(){
    console.log(2000);
};
project.calcBudget();

//property Decorator

function editable(value:boolean){
    return function(target:any, propName:string,descriptor: PropertyDescriptor){
        descriptor.writable=value;

    }
}
function overwritable(value:boolean){
    return function(target:any,propname:string):any{
        const newDescriptor: propertyDescriptor ={
             writable:value
        };
        return newDescriptor;
    }
}

class Project{
    @overwritable(false)
    projectName:string;

    constructor(name:string){
        this.projectName=name;
    }
    @editable(false)
    calcBudget() {
        console.log(1000);
    }
}

const project =new Project("Super Project");
project.calcBudget();
project.calcBudget= function(){
    console.log(2000);
};
project.calcBudget();

//parameter Decorator
function printInfo(target:any, methodname:string,paramindex:number){
    console.log("Target:",target);
    console.log("methodname:",methodname);
    console.log("paramindex:",paramindex);
}

class course{
    name: string;
    constructor(name:string){
        this.name=name;
    }
    printStudentNumbers(mode:string,@printInfo printAll:boolean){
        if(printAll){
            console.log(1000);
        }else{
            console.log(2000);
        }
    }
}
const course =new Course("Super Course");
course.printStudentNumbers("anything",true);
course.printStudentNumbers("anything",false);
