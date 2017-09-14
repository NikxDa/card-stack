import { Component, ContentChildren, QueryList, ElementRef, ViewChild } from "@angular/core";
import { CardComponent } from "../card/card.component";

@Component ({
    selector: "card-stack",
    templateUrl: "./card-stack.component.html",
    styleUrls: ["./card-stack.component.scss"]
})
export class CardStackComponent {
    constructor (private el: ElementRef) { }

    lastScrollTop: number = 0;

    @ContentChildren (CardComponent)
    cards: QueryList<CardComponent>;

    @ViewChild ("cardStack")
    cardStack: ElementRef;

    get stackedCards () {
        return this.cards.filter ((itm) => itm.stacked);
    }

    get topStackedCard () {
        return this.stackedCards [this.stackedCards.length - 1];
    }

    get topCard () {
        return this.cards.find ((itm) => !itm.stacked);
    }

    onScroll () {
        const topOffset = this.cardStack.nativeElement.offsetTop;
        const scrollTop = this.cardStack.nativeElement.scrollTop;

        const topCard = this.topCard;
        const topStackedCard = this.topStackedCard;

        const cardOffset = ((topCard) ? topCard : topStackedCard)
                            .cardElement.nativeElement.offsetTop
                            - this.cardStack.nativeElement.offsetTop
                            - scrollTop;

        if (scrollTop > this.lastScrollTop) {
            if (!topCard) return;

            // Scroll down
            const marginTop = topCard.margin.top;

            // Card is over the stacked cards
            if (cardOffset <= marginTop) {
                // Fix the top stacked card if existing and hide it
                if (topStackedCard) {
                    topStackedCard.scale = 0.9;
                    topStackedCard.hidden = true;
                }

                // Stack the current card
                topCard.stacked = true;
            } else {
                if (topStackedCard) {
                    const wayToGo = cardOffset - marginTop;
                    const percentage = wayToGo / topStackedCard.cardElement.nativeElement.clientHeight;

                    topStackedCard.scale = this.clamp (0.9 + (percentage) * 0.1, 0.9, 1);
                }
            }
        } else {
            // Scroll up
            const topStackedCard = this.topStackedCard;

            if (topStackedCard) {
                const marginTop = topStackedCard.margin.top;

                if (cardOffset - marginTop - topStackedCard.margin.bottom >= topStackedCard.cardElement.nativeElement.clientHeight) {
                    topStackedCard.stacked = false;
                    topStackedCard.scale = 1;
                } else {
                    const wayToGo = cardOffset - marginTop;
                    const percentage = wayToGo / topStackedCard.cardElement.nativeElement.clientHeight;

                    topStackedCard.hidden = false;
                    topStackedCard.scale = this.clamp (0.9 + (percentage) * 0.1, 0.9, 1);
                }
            }
        }

        this.lastScrollTop = scrollTop;
    }

    clamp (number, min, max) {
        return Math.min(Math.max(number, min), max);
    }
}
