class Rat {
    constructor(name) {
        this.name = name;
        this.unitedRats = [];
    }

    unite(another) {
        if (typeof another === typeof this) {
            this.unitedRats.push(another);
        }
    }

    getRats() {
        return this.unitedRats;
    }

    toString(){
        return `${this.name}\r\n${this.unitedRats.map(r => '##' + r.toString()).join('')}`;
    }
}