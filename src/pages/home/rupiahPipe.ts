import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'rupiah' })
export class ConvertToRupiah implements PipeTransform {
    transform(value: number){

    }
}