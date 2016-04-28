
module editor {


    export const GRID_PIXEL_WIDTH = 50;

    export const GRID_PIXEL_HEIGHT = 50;

    export class WorldMap extends render.DisplayObjectContainer {


        private cache: HTMLCanvasElement;

        public isDirty = true;
        constructor() {

            super();
            this.cache = document.createElement("canvas");
            this.cache.width = 400;
            this.cache.height = 400;

        }


        render(context: CanvasRenderingContext2D) {
            super.render(context);
        }
    }


    export class Tile extends render.Bitmap {


        public ownedRow: number;
        public ownedCol: number;


        constructor() {
            super();
        }

        public setWalkable(value) {

            this.num = value;
            switch (value) {
                case 0:
                     this.source = "s1.jpg";                    
                    break;
                case 1:
                     this.source = "b1.jpg";
                    break;
                case 2:                     
                     this.source = "s3.jpg";
                    break;
                case 3:
                     this.source = "b2.jpg";
                    break;
                case 4:                    
                     this.source = "Road.jpg";
                    break;
                case 5:
                     this.source = "b3.jpg";
                    break;
                case 6:                    
                     this.source = "s2.jpg";
                    break;
                case 7:
                     this.source = "b4.jpg";
                    break;
            
                default:
                    break;
            }           
        }

    }
    
    
    export class ControlPanel extends render.DisplayObjectContainer {
        
        constructor(){
            super();

        }
        
    }
}
