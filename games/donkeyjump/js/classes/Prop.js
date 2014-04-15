/**
 * 道具类
 */
(function() {

    var Prop = function(cfg) {

        /**
         * 道具名称
         */
        this.name = '';

        /**
         * @private
         */
        this.__isStepon = false;

        Prop.superclass.constructor.call(this, cfg);
    }
    my.inherit(Prop, my.Sprite);

    /**
     * 初始化
     */
    Prop.prototype.init = function() {
        var propsTypes = ['prop_spring01', 'props_balloon', 'props_gliding01', 'props_michael', 'props_super', 'props_ufo'];
        var propsLists = {
            prop_spring01 : {
                width : 41,
                height : 14
            },
            props_balloon : {
                width : 54,
                height : 64
            },
            props_gliding01 : {
                width : 75,
                height : 64
            },
            props_michael : {
                width : 80,
                height : 45
            },
            props_super : {
                width : 58,
                height : 84
            },
            props_ufo : {
                width : 71,
                height : 44
            }
        };
        var name = propsTypes[my.Math.random(0, 5)];
        var config = propsLists[name];
        this.width = config.width;
        this.height = config.height;

        // 创建道具动画
        var anim = new my.Animation({
            image : my.ImageManager.get(name),
            frames : getPropFrames(name),
            loop : false
        });
        anim.init();

        this.name = name;
        this.anim = anim;
        Prop.superclass.init.call(this);
    }
    /**
     * 踩上道具
     * @param {Donkey Object} donkey
     */
    Prop.prototype.stepon = function(donkey) {
        if(this.__isStepon) {
            return false;
        }
        this.__isStepon = true;

        switch(this.name) {
            case 'prop_spring01':
                donkey.jump();
                donkey.speedY = -3;
                donkey.anim.speed = 0.2;
                break;
            case 'props_michael':
                donkey.stateUpdate = donkey.MJ;
                break;
            case 'props_super':
                donkey.stateUpdate = donkey.superJump;
                break;
            case 'props_gliding01':
                donkey.stateUpdate = donkey.gliding;
                break;
            case 'props_ufo':
                donkey.stateUpdate = donkey.UFO;
                break;
            case 'props_balloon':
                donkey.stateUpdate = donkey.balloon;
                break;
        }

        if(this.name == 'prop_spring01') {
            var anim = new my.Animation({
                image : my.ImageManager.get('prop_spring03'),
                frames : getPropFrames('prop_spring03'),
                loop : false
            });
            anim.init();
            this.anim = anim;
            this.height = 30;
            this.y -= 16;
        } else {
            this.destory();
        }
    }

    window.Prop = Prop;
})();
