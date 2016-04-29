module game {


    export const GRID_PIXEL_WIDTH = 50;

    export const GRID_PIXEL_HEIGHT = 50;

    const NUM_ROWS = 12;

    const NUM_COLS = 12;

    export class WorldMap extends render.DisplayObjectContainer {

        private cache: HTMLCanvasElement;

        public isDirty = true;   
        public grid: astar.Grid;
        
        constructor(mapData) {
            
            super();
            this.cache = document.createElement("canvas");
            this.cache.width = 400;
            this.cache.height = 400;
            var rows = mapData.length;
            var cols = mapData[0].length;
            var grid = new astar.Grid(rows,cols);
            this.grid = grid;
            for (var col = 0; col < rows; col++) {
                for (var row = 0; row < cols; row++) {
                    if(mapData[col][row] % 2 == 0){
                        grid.setWalkable(row,col,true);
                    }
                     if(mapData[col][row] % 2 == 1 ){
                        grid.setWalkable(row,col,false);
                    }
                    
                    
                }
            }            
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

    export class BoyShape extends render.DisplayObjectContainer {
        constructor(){
            super();   
            var character = new render.Bitmap();
            character.source = "player.png";
            character.scaleX = 0.5;
            character.scaleY = 0.5;
            this.addChild(character);
        }
    }

    export class BoyBody extends Body {

        public x_Array = [];    // x坐标
        public y_Array = [];    // y坐标
        public dx : number;     // x方向的变化量
        public dy : number;     // y方向的变化量
        public x_move : number;   // 物体x方向移动位置换算成x坐标
        public y_move : number;   // 物体y方向移动位置换算成y坐标
        public n=1;               // 为了让计算速度的地方在速度改变前只执行一次 
        public vx0 =5;            // x方向速度
        public vy0 =5;            // y方向速度
        public path :astar.Node[];
        public isWalk = false;
        public run(grid,tile:game.Tile) {
                   
            endPosition = {x:tile.ownedCol,y:tile.ownedRow};
            
            grid.setStartNode(startPosition.x, startPosition.y);
            grid.setEndNode(endPosition.x, endPosition.y);
            var findpath = new astar.AStar();
            findpath.setHeurisitic(findpath.diagonal);
            var result = findpath.findPath(grid);
            this.path = findpath._path;
            if(result){
                startPosition.x = endPosition.x;
                startPosition.y = endPosition.y;
                this.isWalk = true;
                for (var i=0;　i < this.path.length　; i++){
                    this.x_Array[i]=this.path[i].x;
                    this.y_Array[i]=this.path[i].y;
              
                }
            }
                
            console.log(this.path);
            console.log(grid.toString());
        }

        public onTicker(duringTime) {
            for(var i=1 ; i < this.x_Array.length ; i++){
                
                this.x_move = this.x/50;
                this.y_move = this.y/50;
            
                if(this.x_move < this.x_Array[i-1]+0.02 && this.x_move >= this.x_Array[i-1] && this.y_move < this.y_Array[i-1] + 0.02 && this.y_move >= this.y_Array[i-1] &&this.n==i){
                    this.n++; 
                    
                    this.dx = this.x_Array[i]-this.x_Array[i-1];
                    this.dy = this.y_Array[i]-this.y_Array[i-1];
     
                    if(this.dx == 0){
                        this.vx = 0;                      
                    }
                    if(this.dx == 1){
                        this.vx = this.vx0;                       
                    }
                    if(this.dx == -1){
                        this.vx = -this.vx0;
               
                    }
                    if(this.dy == 0){
                        this.vy = 0;
                        
                    }
                    if(this.dy == 1){
                        this.vy = this.vy0;
                        
                        
                    }
                    if(this.dy == -1){
                        this.vy = -this.vy0;
              
                    }
                }
               
          
            if(this.x_move < endPosition.x + 0.02 && 
            this.x_move>= endPosition.x &&
            this.y_move >=endPosition.y && 
            this.y_move < endPosition.y + 0.02){
                this.vx = 0;               
                this.vy = 0;
                this.path = null;
                this.n = 1;
                this.isWalk = false;
            }
        }
                this.y += duringTime * this.vy;
                this.x += duringTime * this.vx;  
        }     
    }
    
}




