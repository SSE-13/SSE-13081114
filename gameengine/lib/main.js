function createMapEditor() {
    var world = new editor.WorldMap();
    var rows = mapData.length;
    var cols = mapData[0].length;
    for (var col = 0; col < rows; col++) {
        for (var row = 0; row < cols; row++) {
            var tile = new editor.Tile();
            
            tile.ownedCol = col;
            tile.ownedRow = row;
            tile.setWalkable(mapData[row][col]);
            tile.x = col * editor.GRID_PIXEL_WIDTH;
            tile.y = row * editor.GRID_PIXEL_HEIGHT;

            tile.width = editor.GRID_PIXEL_WIDTH;
            tile.height = editor.GRID_PIXEL_HEIGHT;
            world.addChild(tile);
            eventCore.register(tile, events.displayObjectRectHitTest, onTileClick);
        }
    }
    return world;
}
var M_button = new Array();
 function materia() {
     var materia = new render.DisplayObjectContainer();
    for (var i = 1; i < 9; i++) {
         M_button[i] = new ui.Button();
         M_button[i].text = '素材' + i;
         M_button[i].width = 100;
         M_button[i].height = 30;
         M_button[i].color = '#cecdcd';
         M_button[i].y = Math.floor((i - 1) / 2) * 30;
         M_button[i].x = Math.abs((i % 2 - 1) * 100);
         materia.addChild(M_button[i]);
    }
     return materia;
}
  function onTileClick(tile) {
      var pos = new command.CommandA(tile.ownedRow, tile.ownedCol);
      invoker.setCommand(pos);
      stage.addChild(UI(tile));
      if (tile.num == 1) {
         click(false, tile);
          button.text = "不可走";
         
          button.color = '#0000FF';
      }
      else {
          button.text = "可走";
         click(true, tile);
         
          button.color = '#FF0000';
      }
      button.onClick = function () {
         //点击不能更改图片
          if (tile.num == 1) {

             //tile.setWalkable(0);
              console.log(tile);
              button.text = "可走";
             click(true, tile);
              button.color = '#FF0000';
          }
          else {
             tile.setWalkable(1);
             //tile.setWalkable(1);
              console.log(tile);
              button.text = "不可走";
            click(false, tile);
              button.color = '#0000FF';
          }
          mapData[tile.ownedRow][tile.ownedCol] = tile.num;
      };
  }
 function click(b, tile) {
     if (b == true) {
         M_button[1].onClick = function () {
             alert("可走");
             tile.setWalkable(0);
         };
         M_button[3].onClick = function () {
             tile.setWalkable(0);
         };
         M_button[5].onClick = function () {
             tile.setWalkable(0);
         };
         M_button[7].onClick = function () {
            tile.setWalkable(0);
         };
         M_button[2].onClick = function () {
         M_button[4].onClick = function () {
         };
        M_button[6].onClick = function () {
         };
         M_button[8].onClick = function () {
         };
     }
     if (b == false) {
         //点击图片更改
         M_button[2].onClick = function () {
             tile.setWalkable(1);
             alert("不可走");
         };
         M_button[4].onClick = function () {
             tile.setWalkable(1);
         };
         M_button[6].onClick = function () {
             tile.setWalkable(1);
         };
         M_button[8].onClick = function () {
             tile.setWalkable(1);
         };
         M_button[1].onClick = function () {
         };
         M_button[3].onClick = function () {
         };
         M_button[5].onClick = function () {
         };
         M_button[7].onClick = function () {
        };
     }
 }
  //UI
  function UI(tile) {
      var Attribute = new render.DisplayObjectContainer();

          }
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
