import { models } from './models'


    export const run = () =>{
        var p = new models.Person("John");
        console.log(p.name);
    };

