var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var humanContainer = new render.DisplayObjectContainer();
var human = new render.DisplayObjectContainer;
human.x = -50;
human.y = -65;
var head = new render.Bitmap();
head.x = 20;
head.y = 0;
var trunk = new render.Bitmap();
trunk.x = 25;
trunk.y = 40;
var left_leg = new render.Bitmap();
var right_leg = new render.Bitmap();
var left_arm = new render.Bitmap();
var right_arm = new render.Bitmap();
left_leg.x = 0;
left_leg.y = 140;
right_leg.x = 35;
right_leg.y = 147;
left_arm.x = -38;
left_arm.y = 75;
right_arm.x = 45;
right_arm.y = 75;
//head.source = "wander-icon.jpg";
//humanContainer.addChild(head)
head.source = "head.png";
trunk.source = "trunk.png";
left_leg.source = "left_leg.png";
right_leg.source = "right_leg.png";
left_arm.source = "left_arm.png";
right_arm.source = "right_arm.png";
humanContainer.addChild(human); //添加子节点
human.addChild(head);
human.addChild(left_leg);
human.addChild(right_leg);
human.addChild(left_arm);
human.addChild(right_arm);
human.addChild(trunk);
var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["head.png"]);
renderCore.start(humanContainer, ["trunk.png"]);
renderCore.start(humanContainer, ["left_arm.png"]);
renderCore.start(humanContainer, ["right_arm.png"]);
renderCore.start(humanContainer, ["left_leg.png"]);
renderCore.start(humanContainer, ["right_leg.png"]);
//var renderCore = new render.RenderCore();
//renderCore.start(humanContainer, ["wander-icon.jpg"]);
var HumanBody = (function (_super) {
    __extends(HumanBody, _super);
    function HumanBody() {
        _super.apply(this, arguments);
    }
    HumanBody.prototype.onTicker = function (duringTime) {
        this.x = this.x + this.vx * duringTime;
        // this.y = 
        this.rotation = this.rotation + Math.PI * duringTime;
    };
    return HumanBody;
}(Body));
var ticker = new Ticker();
var body = new HumanBody(humanContainer);
body.vx = 4;
body.y = 100;
ticker.start([body]);
//# sourceMappingURL=game.js.map