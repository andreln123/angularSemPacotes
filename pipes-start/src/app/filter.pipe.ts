import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'filter',
    pure: false //Altera o desempenho da aplicação, mas às vezes é necessário. Trata-se de um pipe impuro.
})
export class FilterPipe implements PipeTransform {
    transform(value: any, filterString: string, propName: string): any {
        let resultArray = [];

        if ((value.lenght === 0) || (filterString === ''))
            return value;

        for (let item of value) {
            if (item[propName] === filterString)
                resultArray.push(item);
        }

        return resultArray;
    }
}