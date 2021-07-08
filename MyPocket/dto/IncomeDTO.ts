export default class IncomeDTO{
    private _income:Number;
    private _category:String;
    private _date:Date;

    set income(value: Number) {
        this._income = value;
    }

    set category(value: String) {
        this._category = value;
    }

    set date(value: Date) {
        this._date = value;
    }

    get income(): Number {
        return this._income;
    }

    get category(): String {
        return this._category;
    }

    get date(): Date {
        return this._date;
    }

    constructor(income: Number, category: String, date: Date) {
        this._income = income;
        this._category = category;
        this._date = date;
    }
}