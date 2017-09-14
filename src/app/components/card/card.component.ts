import { Component, Input, ElementRef, ViewChild } from "@angular/core";

@Component ({
    selector: "card",
    templateUrl: "./card.component.html",
    styleUrls: ["./card.component.scss"]
})
export class CardComponent {
    constructor (public el: ElementRef) { }

    @ViewChild ("cardElement")
    cardElement: ElementRef;

    @Input ("name")
    name: string;

    @Input ("description")
    description: string;

    public scale: number = 1;
    public hidden: boolean = false;

    @Input ("stacked")
    public stacked: boolean = false;

    public get margin () {
        const style = window.getComputedStyle (this.cardElement.nativeElement);

        return {
            top: parseInt (style.marginTop),
            right: parseInt (style.marginRight),
            bottom: parseInt (style.marginBottom),
            left: parseInt (style.marginLeft)
        }
    }
}
