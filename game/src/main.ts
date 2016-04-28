
 function createMapEditor(mapData) {
    
    var world = new game.WorldMap(mapData);
    var rows = mapData.length;
    var cols = mapData[0].length;
   
    for (var col = 0; col < rows; col++) {
        for (var row = 0; row < cols; row++) {
            var tile = new game.Tile();
            tile.setWalkable(mapData[row][col]);
            tile.x = col * game.GRID_PIXEL_WIDTH;
            tile.y = row * game.GRID_PIXEL_HEIGHT
            tile.ownedCol = col;
            tile.ownedRow = row;
            tile.width = game.GRID_PIXEL_WIDTH;
            tile.height = game.GRID_PIXEL_HEIGHT;
            world.addChild(tile);
            eventCore.register(tile, events.displayObjectRectHitTest, onTileClick);
        }
    }   
    return world;
}

    
 var startPosition = {x:7,y:7};
 var endPosition = {x:1,y:1}

function onTileClick(tile: game.Tile) {
     if(!body.isWalk){
     body.run(mapEditor.grid,tile);
     ticker.start([body]);
     }
}

var mapEditor ;
var boyShape ;
var body :game.BoyBody;
var ticker = new Ticker(); 
var storage = data.Storage.getInstance();

var onReadFileSuccess = ()=> {
   
    var mapData = storage.mapData;
    mapEditor = createMapEditor(mapData);
    stage.addChild(mapEditor);
   
    boyShape = new game.BoyShape();
    body = new game.BoyBody(boyShape);
    body.x = boyShape.x = 350;
    body.y = boyShape.y = 350;
    stage.addChild(boyShape);
          
}
storage.readFile(onReadFileSuccess);


var renderCore = new render.RenderCore();
var eventCore = events.EventCore.getInstance();

eventCore.init();

var stage = new render.DisplayObjectContainer();

renderCore.start(stage,["player.png","s2.jpg","s1.jpg","s3.jpg","Road.jpg","b1.jpg","b2.jpg","b3.jpg","b4.jpg"]);

