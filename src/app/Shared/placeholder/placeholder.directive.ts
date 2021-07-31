import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    // syntax of attribute selector for Directives
    selector: '[appPlaceHolder]'
})
export class PlaceHolderDirective {
    // make viewContainer publice to use elsewhere
    constructor(public viewContainerRef: ViewContainerRef) {}
}