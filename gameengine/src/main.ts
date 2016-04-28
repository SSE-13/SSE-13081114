

function createMapEditor() {
    var world = new editor.WorldMap();
    var rows = mapData.length;
    var cols = mapData[0].length;

    for (var col = 0; col < rows; col++) {
        for (var row = 0; row < cols; row++) {
            var tile = new editor.Tile();
            tile.setWalkable(mapData[row][col]);
            tile.x = col * editor.GRID_PIXEL_WIDTH;
            tile.y = row * editor.GRID_PIXEL_HEIGHT
            tile.ownedCol = col;
            tile.ownedRow = row;
            tile.width = editor.GRID_PIXEL_WIDTH;
            tile.height = editor.GRID_PIXEL_HEIGHT;
            world.addChild(tile);


            eventCore.register(tile, events.displayObjectRectHitTest, onTileClick);
        }
    }
    return world;

}
var M_button=new Array();
 function materia(){
     var materia = new render.DisplayObjectContainer();
     for(var i=1;i<9;i++){
        M_button[i] = new ui.Button();
         M_button[i].text='素材'+i;
         M_button[i].width = 100;
         M_button[i].height = 30;
         M_button[i].color='#cecdcd';
         M_button[i].y=Math.floor((i-1)/2)*30;
         M_button[i].x=Math.abs((i%2-1)*100);
         materia.addChild(M_button[i]);
     }
     return materia;
 }


function onTileClick(tile: editor.Tile) {
    console.log(tile);
}

var storage = data.Storage.getInstance();
storage.readFile();
var mapData = storage.mapData;


var renderCore = new render.RenderCore();
var eventCore = events.EventCore.getInstance();
eventCore.init();


var mapEditor = createMapEditor();
var stage = new render.DisplayObjectContainer();
stage.addChild(mapEditor);
var panel = new editor.ControlPanel();
panel.x = 300;
stage.addChild(panel);

renderCore.start(stage);
