import { Directive, model } from '@angular/core'

@Directive({})
export class Medium {
    id = model<number>();
    title = model<string>();
}
