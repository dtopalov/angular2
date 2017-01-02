import { Pipe, PipeTransform } from '@angular/core';
// import { THE COLLECTION MODEL TO BE FILTERED } from './';

@Pipe({
    name: 'collectionFilter'
})

export class FilterPipe implements PipeTransform {
    transform(collection: any [], filterValue: string): any[] {
        if (!filterValue) {
            return collection;
        }

        return collection.filter(item =>
            // property to filter by
            item.name.toLocaleLowerCase()
            .indexOf(filterValue) > -1);
    }
}