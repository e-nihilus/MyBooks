export class Book {

    private static currentId: number = 0;

    constructor(public title:string, 
                public type:string, 
                public author:string, 
                public price:number, 
                public photo:string,
                public id_book:number = Book.sumaId(), 
                public id_user:number = 0){}

    private static sumaId(): number {
        return this.currentId++;
    }           
}
