module command {




    export class Invoker {

        private list: Array<any>;
        public commands;

        public Cancel() {
            return this.list.length > 0;
        }

        public cancel() {
            var command = this.list.pop();
            this.commands = command;
            this.commands.cancel();

        }

        init() {
            this.list = [];
        }

        public setCommand(command) {
            command.execute();
            this.list.push(command);
        }

    }

    export class Commands extends Command {

        public row;
        public col;
        public num;
        public rows;
        public cols;
        public nums;

        constructor(row, col, num) {
            super();
            this.row = row;
            this.col = col;
            this.num = num;
        }

        public execute() {
            console.log("execute " + this.row + this.col);

        }

        public cancle(row, col, num) {
            console.log("Cancle " + this.row + this.col + this.num);
            this.getRow(this.row);
            this.getCol(this.col);
            this.getNum(this.num);
        }

        setRow() {
            return this.rows;
        }

        getRow(row) {
            this.rows = row;
        }

        setCol() {
            return this.cols;
        }

        getCol(col) {
            this.cols = col;
        }

        setNum() {
            return this.nums;
        }

        getNum(num) {
            this.nums = num;
        }
    }

    export class Command {

        execute() {


        }

    }

}