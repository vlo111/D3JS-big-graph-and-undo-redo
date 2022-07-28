
class Undo {

    static PUSH = "PUSH";
    static POP = "POP";

    static history = [null];

    static position = 0;

    static data = {
        name: '',
        count: 0
    }

    static pushCommand = (counter) => {
        const previousCount = counter.count;

        return {
            execute() {
                counter.count += 1;
            },
            undo() {
                counter.count = previousCount;
            }
        }
    }

    static popCommand = (counter) => {
        const previousCount = counter.count;

        return {
            execute() {
                counter.count -= 1;
            },
            undo() {
                counter.count = previousCount;
            }
        }
    }

    static commands = {
        [this.PUSH]: this.pushCommand,
        [this.POP]: this.popCommand
    }

    static doCommand = (commandType, target) => {
        if (this.position < this.history.length - 1) {
            this.history = this.history.slice(0, this.position + 1);
        }

        if (Undo.commands[commandType]) {
            this.data.name = target;
            const concreteCommand = Undo.commands[commandType](this.data);
            this.history.push(concreteCommand);
            this.position += 1;

            concreteCommand.execute();
        }
        console.log(this.data)
    }

    static undo = () => {
        if (this.position > 0) {
            this.history[this.position].undo();
            this.position -= 1;
        }
        console.log(this.data)
    }

    static redo = () => {
        if (this.position < this.history.length - 1) {
            this.position += 1;
            this.history[this.position].execute();
        }
        console.log(this.data)
    }
}

export default Undo;
