module.exports = class LinkedList {
    head;

    add(value) {
        if (this.head === undefined) {
            this.head = new N(value)

        } else {
            let temp = this.head;
            while (true) {
                if (temp.next === undefined) {
                    break
                }
                temp = temp.next
            }
            temp.next = new N(value)
        }
    }

    has(value) {
        if (this.head === undefined) {
            return false
        }
        let temp = this.head
        while (true) {
            if (temp.equals(value)) {
                return true;
            }
            if (temp.next === undefined) {
                break
            }
            temp = temp.next
        }
        return false
    }

    del(value) {
        if (this.head === undefined) {
            return false
        }

        if (this.head.equals(value)) {
            this.head = undefined;
            return true;
        } else {
            let temp = this.head
            let flag = false;
            while (true) {
                if (temp.next === undefined) {
                    break
                }
                if (temp.next.equals(value)) {
                    flag = true
                    break
                }
                temp = temp.next
            }
            if (flag) {
                temp.next = temp.next?.next
                return true
            } else return false
        }
    }


    list() {
        if (this.head === undefined) {
            return
        }
        let temp = this.head
        while (true) {
            temp.show()
            if (temp.next === undefined) {
                break
            }
            temp = temp.next
        }
    }
}

class N {
    value;
    next;

    constructor(value) {
        this.value = value
    }

    show() {
        console.log("\nvalue=", this.value)
    }

    equals(value) {
        return this.value === value
    }
}
