import { Directive, model } from '@angular/core'

@Directive({})
export class Collection {
    id = model<number>();
    title = model<string>();
    location = model<string>();
    start_date = model<string>();
    end_date = model<string>();
    description = model<string>();
    active = model<boolean>();
}
