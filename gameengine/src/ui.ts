module ui {

    var eventCore: events.EventCore = events.EventCore.getInstance();

    export class Button extends render.DisplayObjectContainer {

        
        public name:string;
        
        public onClick: Function;
        public get text(): string {
            return this._text;
        }

        public set text(value: string) {
            this._text = value;
            this.label.text = value;
        }
        
        public get color(): string {
            return this._color;
        }

        public set color(value: string) {
            this._color = value;
            this.background.color = value;
        }

        public get width(): number {
            return this._width;
        }

        public set width(value: number) {
            this._width = value;
            this.background.width = value;
        }

        public get height(): number {
            return this._height;
        }

        public set height(value: number) {
            this._height = value;
            this.background.height = value;
        }


        private background: render.Rect;
        private label: render.TextField;
        private _text: string = "label";
        private _color:string = '#ffff00';



        constructor() {

            super();
            this.background = new render.Rect();
            this.background.width = this.width;
            this.background.height = this.height;
            this.background.color = this.color;
            this.label = new render.TextField();
            this.label.width = this.width;
            this.label.height = this.height;
            this.label.textAlign = "center";
            this.label.text = this.text;
            this.addChild(this.background);
            this.addChild(this.label);

            eventCore.register(this, events.displayObjectRectHitTest, () => {
                if (this.onClick) {
                    this.onClick(this);
                }
            });


        }







    }



}