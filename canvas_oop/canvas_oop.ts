/**
 * 基类，负责处理x,y,rotation 等属性
 */ 
class DisplayObject {

    x = 0;

    y = 0;

    rotation = 0;

    draw(context: CanvasRenderingContext2D) {
        context.save();
        context.rotate(this.rotation);
        context.translate(this.x, this.y);
        this.render(context);

        context.restore();
    }

    render(context: CanvasRenderingContext2D) {

    }

}

class Bitmap extends DisplayObject {


    source;
    render(context: CanvasRenderingContext2D) {

        var image = imagePool[this.source];
        if (image) {
            context.drawImage(image, this.x, this.y);
        }
        else {
            context.font = "20px Arial";
            context.fillStyle = '#000000';
            context.fillText('错误的URL', 0, 20);
        }
    }

}

class Rect extends DisplayObject {

    width = 100

    height = 100;

    color = '#FF0000';

    render(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.fillRect(0, 0, this.width, this.height);
    }
}

class TextField extends DisplayObject {
    content;color
 
    render(context: CanvasRenderingContext2D) {
        context.font = "20px Arial";
        context.fillStyle = this.color;
        context.fillText(this.content, 0, 20);
    }
}

function drawQueue(queue) {
    for (var i = 0; i < renderQueue.length; i++) {
        var displayObject: DisplayObject = renderQueue[i];
        displayObject.draw(context);
    }
}

var imagePool = {};

function loadResource(imageList, callback) {
    var count = 0;
    imageList.forEach(function(imageUrl) {
        var image = new Image();
        image.src = imageUrl;
        image.onload = onLoadComplete;
        image.onerror = onLoadError;

        function onLoadComplete() {
            imagePool[imageUrl] = image;
            count++;
            if (count == imageList.length) {
                callback();
            }
        }
        
        function onLoadError(){
            alert('资源加载失败:' + imageUrl);
        }
    })
}


var canvas: HTMLCanvasElement = document.getElementById("game") as HTMLCanvasElement;
var context = canvas.getContext("2d");


/*var rect = new Rect();
rect.width = 200;
rect.height = 100;
rect.color = '#00FF00'


var rect2 = new Rect();
rect2.width = 300;
rect2.height = 50;
rect2.x = 200;
rect2.y = 200;
rect2.rotation = Math.PI / 8;
rect2.color = '#00FFFF'*/

var text = new TextField();
text.x = 280;
text.y = 200;
text.content="克里斯冰歌"
text.color='#FFFF00'


var bitmap = new Bitmap();
bitmap.source = '4.jpg';

var ren = new Bitmap();
ren.source = '1.jpg';
ren.x = 90;
ren.y = 80;

var guai1 = new Bitmap();
guai1.source = '2.jpg';
guai1.x = 40;
guai1.y = 75;

var guai2 = new Bitmap();
guai2.source = '3.jpg';
guai2.x = 150;
guai2.y = 40;

//渲染队列
var renderQueue = [bitmap/*rect, rect2, */,text,ren,guai1,guai2];
//资源加载列表
var imageList = ['4.jpg','1.jpg','2.jpg','3.jpg'];

//先加载资源，加载成功之后执行渲染队列
loadResource(imageList, function() {
    drawQueue(renderQueue);
})


