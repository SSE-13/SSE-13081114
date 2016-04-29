var stage = new render.DisplayObjectContainer();


function createMapEditor() {
    var world = new editor.WorldMap();
    var rows = mapData.length;
    var cols = mapData[0].length;



    for (var row = 0; row < rows; row++) {
        for (var col = 0; col < cols; col++) {
            var tile = new editor.Tile();
            tile.setWalkable(mapData[row][col]);
            tile.x = col * editor.GRID_PIXEL_WIDTH;
            tile.y = row * editor.GRID_PIXEL_HEIGHT
            tile.ownedCol = col;
            tile.ownedRow = row;
            tile.width = editor.GRID_PIXEL_WIDTH;
            tile.height = editor.GRID_PIXEL_HEIGHT;
            world.addChild(tile);
            map_tile.push(tile);

            eventCore.register(tile, events.displayObjectRectHitTest, onTileClick);
        }
    }

    return world;

}

var mtbutton: Array<ui.Button> = new Array();

function materia() {
    var materia = new render.DisplayObjectContainer();
    for (var i = 0; i <= 7; i++) {
        mtbutton[i] = new ui.Button();
        if (i % 2 == 0) {
            mtbutton[i].text = 'S' + ((i + 2) / 2);
        } else {
            mtbutton[i].text = 'B' + ((i + 1) / 2);
        }

        mtbutton[i].width = 100;
        mtbutton[i].height = 30;
        mtbutton[i].color = '#fff4d7';
        mtbutton[i].y = Math.floor(i / 2) * 30;
        mtbutton[i].x = Math.abs((i % 2) * 100);
        materia.addChild(mtbutton[i]);
    }
    return materia;
}

function onTileClick(tile: editor.Tile) {


    stage.addChild(UI(tile));
    if (tile.num % 2 == 1) {
        buttons.text = "NO";
        click(false, tile);
        buttons.color = '#ffff00';
    } else if (tile.num % 2 == 0) {
        buttons.text = "OK";
        click(true, tile);
        buttons.color = '#00ffff';

    }
    buttons.onClick = () => {
        
        if (tile.num % 2 == 1) {
            var pos = new command.Commands(tile.ownedRow, tile.ownedCol, tile.num);
            invoker.setCommand(pos);
            buttons.text = "NO";
            click(true, tile);
            buttons.color = '#ffff00';

        } else if (tile.num % 2 == 0) {
            var pos = new command.Commands(tile.ownedRow, tile.ownedCol, tile.num);
            invoker.setCommand(pos);
            buttons.text = "OK";
            click(false, tile);
            buttons.color = '#00ffff';


        }
    }
}



function click(op: boolean, tile: editor.Tile) {
    if (op == true) {
        for (var i = 0; i <= 7; i++) {
            if (i % 2 == 0) {

                mtbutton[i].name = i.toString();

                mtbutton[i].onClick = (mtbutton) => {

                    var buttonIndex = parseInt(mtbutton.name);
                    var pos = new command.Commands(tile.ownedRow, tile.ownedCol, tile.num);
                    invoker.setCommand(pos);
                    if (tile != map_tile[63]) {
                        tile.setWalkable(buttonIndex);
                        mapData[tile.ownedRow][tile.ownedCol] = tile.num;
                    }
                    if (tile == map_tile[63]) {
                        alert("No Change!");
                    }
                }
            } else {
                mtbutton[i].onClick = (mtbutton) => {

                }
            }
        }

    } if (op == false) {
        for (var i = 0; i <= 7; i++) {
            if (i % 2 == 1) {
                mtbutton[i].name = i.toString();
                mtbutton[i].onClick = (mtbutton) => {

                    var buttonIndex = parseInt(mtbutton.name);
                    var pos = new command.Commands(tile.ownedRow, tile.ownedCol, tile.num);
                    invoker.setCommand(pos);
                    tile.setWalkable(buttonIndex);
                    mapData[tile.ownedRow][tile.ownedCol] = tile.num;
                }
            } else {
                mtbutton[i].onClick = (mtbutton) => {

                }
            }
        }
    }
}


function UI(tile: editor.Tile) {

    var Property = new render.DisplayObjectContainer();
    Property.x = 450;
    Property.y = 50;
    var Background = new render.Rect();
    Background.width = 200;
    Background.height = 50;
    Background.color = '#fff4d7';
    Property.addChild(Background);

    var X = tile.ownedRow + 1;
    var Y = tile.ownedCol + 1;
    var postion = new render.TextField();
    postion.text = X + '行 ' + Y + '列';
    postion.x = 10;
    postion.y = 10;
    Property.addChild(postion);

    return Property;
}


function Save() {

    var SaveButton = new render.DisplayObjectContainer();
    SaveButton.width = 50;
    SaveButton.height = 30;
    var Background = new render.Rect();
    Background.width = 50;
    Background.height = 30;
    Background.color = '#00ffff';

    var title = new render.TextField();
    title.text = 'Save';
    SaveButton.addChild(Background);
    SaveButton.addChild(title);

    eventCore.register(SaveButton, events.displayObjectRectHitTest, onSaveButtonClick);

    return SaveButton;

}

function onSaveButtonClick() {

    console.log("save");
    console.log(mapData);

    storage.saveFile(mapData);

}



function Cancel() {

    var CancelButton = new render.DisplayObjectContainer();
    CancelButton.width = 65;
    CancelButton.height = 30;
    var Background = new render.Rect();
    Background.width = 65;
    Background.height = 30;
    Background.color = '#ffff00';

    var title = new render.TextField();
    title.text = 'Cancel';

    CancelButton.addChild(Background);
    CancelButton.addChild(title);

    eventCore.register(CancelButton, events.displayObjectRectHitTest, onCancelButtonClick);

    return CancelButton;

}

function onCancelButtonClick() {

    if (invoker.Cancel()) {

        invoker.cancel();

        var row = invoker.commands.rows;
        var col = invoker.commands.cols;
        var num = invoker.commands.nums;


        for (var i = 0; i < map_tile.length; i++) {
            if (map_tile[i].ownedRow == row && map_tile[i].ownedCol == col) {
                map_tile[i].setWalkable(num);
                console.log(i);
                mapData[map_tile[i].ownedRow][map_tile[i].ownedCol] = map_tile[i].num;
            }

        }
    } else {
        alert("No Cancel!");
    }



}




var storage = data.Storage.getInstance();
storage.readFile();
var mapData = storage.mapData;


var map_tile = new Array();

var invoker = new command.Invoker();
invoker.init();

var renderCore = new render.RenderCore();
var eventCore = events.EventCore.getInstance();
eventCore.init();

var Materia = materia();
Materia.x = 450;
Materia.y = 130;

var save = Save();
save.x = 450;
var cancel = Cancel();
cancel.x = 580;

var mapEditor = createMapEditor();

stage.addChild(mapEditor);

var buttons = new ui.Button();
buttons.width = 200;
buttons.height = 30;
buttons.color = "#fff4d7"
buttons.x = 450;
buttons.y = 100;

var panel = new editor.ControlPanel();
panel.x = 600;

stage.addChild(save);
stage.addChild(cancel);
stage.addChild(buttons);
stage.addChild(Materia);


renderCore.start(stage, ["s2.jpg", "s1.jpg", "s3.jpg", "Road.jpg", "b1.jpg", "b2.jpg", "b3.jpg", "b4.jpg"]);

renderCore.start(stage);


