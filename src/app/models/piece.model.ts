import { Directive, model } from '@angular/core'

@Directive({})
export class Piece {
    id = model<number>();
    title = model<string>();
    filename = model<string>();
    date = model<string>();
    media = model<Array<string>>();
    collections = model<Array<string>>();
    parent = model<string>();
    children = model<Array<string>>();
    description = model<string>();
    active = model<boolean>();
    use_as_wallpaper = model<boolean>();
}
