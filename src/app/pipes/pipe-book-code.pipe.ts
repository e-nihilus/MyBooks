import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeBookCode'
})
export class PipeBookCodePipe implements PipeTransform {

  transform(id_book:string): string {
    let result:string;
    result= "Ref-" + id_book;
    return result
  }

}