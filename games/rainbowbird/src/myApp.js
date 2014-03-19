


var Helloworld = cc.Layer.extend({
    bgSprite:null,
    groundSprite:null,
    flyBird:null,

    init:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask director the window size
        var size = cc.Director.getInstance().getWinSize();
        cc.log("flappy_packer=" + res.flappy_packer);
        cc.SpriteFrameCache.getInstance().addSpriteFrames(res.flappy_packer);


        var lazyLayer = cc.Layer.create();
        this.addChild(lazyLayer);

        // add "HelloWorld" splash screen"
        this.bgSprite = cc.Sprite.create(res.bg);
        this.bgSprite.setPosition(size.width / 2, size.height / 2);

        lazyLayer.addChild(this.bgSprite, 0);

        this.groundSprite = cc.Sprite.create(res.ground);
        this.groundSprite.setAnchorPoint(0, 0);
        this.groundSprite.setPosition(0, 0);
        lazyLayer.addChild(this.groundSprite, 1);

        cc.log("fly_bird=" + res.fly_bird);
        this.flyBird = cc.Sprite.createWithSpriteFrameName(res.fly_bird);
        this.flyBird.setPosition(size.width / 2, size.height / 2);
        lazyLayer.addChild(this.flyBird, 2);

        this.groundRun();
        this.initFlyBirdAnimation();
        this.birdFly();

        this.setTouchEnabled(true);
        return true;
    },

    groundRun:function() {
        var action1 = cc.MoveTo.create(0.5, cc.p(-120, 0));
        var action2 = cc.MoveTo.create(0, cc.p(0, 0));
        var action = cc.Sequence.create(action1, action2);
        this.groundSprite.runAction(cc.RepeatForever.create(action));
    },

    birdFly:function() {
        var anim = cc.Animate.create(cc.AnimationCache.getInstance().getAnimation("FlyBirdAnimation"));
        var flyAction = cc.Sequence.create(anim);
        this.flyBird.runAction(cc.RepeatForever.create(flyAction));
    },

    onTouchesBegan:function (touches, event) {
        //this.isMouseDown = true;
    },

    onTouchesMoved:function (touches, event) {
/*        if (this.isMouseDown) {
            if (touches) {
                //this.circle.setPosition(touches[0].getLocation().x, touches[0].getLocation().y);
            }
        }*/
    },
    onTouchesEnded:function (touches, event) {
        //this.isMouseDown = false;

        var loc = touches[0].getLocation();
        this.birdRiseAction();
    },

    onTouchesCancelled:function (touches, event) {
        console.log("onTouchesCancelled");
    }
});

Helloworld.prototype.initFlyBirdAnimation = function() {
    var animFrames = [];
    var str = "";
    for (var i = 1; i < 4; i++) {
        str = "bird" + i + ".png";
        var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
        animFrames.push(frame);
    }
    var animation = cc.Animation.create(animFrames, 0.05);
    cc.AnimationCache.getInstance().addAnimation(animation, "FlyBirdAnimation");
};

Helloworld.prototype.birdRiseAction = function () {
    var riseHeight = 60;
    var birdX = this.flyBird.getPositionX();
    var birdY = this.flyBird.getPositionY();
    var time = birdY / 600;

    var actionFrame = cc.Animate.create(cc.AnimationCache.getInstance().getAnimation("FlyBirdAnimation"));
    var flyAction = cc.Repeat.create(actionFrame, 90000);
    var riseAction1 = cc.MoveTo.create(0.2, cc.p(birdX, birdY + riseHeight));
    var riseAction2 = cc.RotateTo.create(0, -30);
    var riseAction = cc.Spawn.create(riseAction1, riseAction2);
    var fallAction1 = cc.MoveTo.create(time, cc.p(birdX, 50));
    var fallAction2 = cc.Sequence.create(cc.DelayTime.create(time / 6), cc.RotateTo.create(0, 30));
    var fallAction = cc.Spawn.create(fallAction1, fallAction2);

    this.flyBird.stopAllActions();
    this.flyBird.runAction(cc.Spawn.create(
        cc.Sequence.create(riseAction, cc.DelayTime.create(0.1), fallAction),
        flyAction)
    );
}

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Helloworld();
        layer.init();
        this.addChild(layer);
    }
});

