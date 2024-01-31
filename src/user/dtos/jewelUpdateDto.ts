export class JewelsUpdateDto {
    jewelsAmount: number
    constructor(jewelsAmount: JewelsAmount) {
        this.jewelsAmount = jewelsAmount.jewelsAmount
    }
}

type JewelsAmount = {
    jewelsAmount: number
}








