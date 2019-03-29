class Stringer {
    constructor(innerString, innerLength) {
        this.innerString = innerString;
        this.innerLength = innerLength;
    }

    increase(length) {
        this.innerLength += length;
    }

    decrease(length) {
        this.innerLength -= length;
        this.innerLength = Math.max(0, this.innerLength);
    }

    toString() {
        if (this.innerLength === 0) {
            return '...';
        } else if (this.innerLength < this.innerString.length) {
            return this.innerString.substr(0, this.innerLength) + '...';
        }
        return this.innerString;
    }
}