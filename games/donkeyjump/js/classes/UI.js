(function() {
    /**
     * UI控制
     */
    var UI = function() {
        // 预备界面
        this.gameCover = my.DOM.get('gameCover');
        // 游戏主体
        this.gameBody = my.DOM.get('gameBody');
        // 游戏结束
        this.gameOver = my.DOM.get('gameOver');
        // 分数
        this.number = my.DOM.get('number');
    }
    /**
     * UI事件定义
     */
    // 开始
    UI.prototype.onplay = my.fn;
    // 暂停
    UI.prototype.onpause = my.fn;
    // 返回列表
    UI.prototype.onresumeexit = my.fn;
    // 继续游戏
    UI.prototype.onresume = my.fn;
    // 准备
    UI.prototype.onretry = my.fn;

    /**
     * @private
     * 初始化开始游戏按钮
     */
    UI.prototype.__initBtnPlay = function() {
        var btnPlay = my.DOM.get('btnPlay'), self = this;
        btnPlay.onclick = function() {
            self.onplay();
        }
    }
    /**
     * @private
     * 初始化暂停按钮
     */
    UI.prototype.__initBtnPause = function() {
        var btnPause = my.DOM.get('btnPause'), self = this;
        btnPause.onclick = function() {
            self.onpause();
        }
    }
    /**
     * @private
     * 初始化返回列表按钮
     */
    UI.prototype.__initBtnResumeExit = function() {
        var btnResumeExit = my.DOM.get('btnResumeExit'), self = this;
        btnResumeExit.onclick = function() {
            self.onresumeexit();
        }
    }
    /**
     * @private
     * 初始化继续游戏按钮
     */
    UI.prototype.__initBtnResume = function() {
        var btnResume = my.DOM.get('btnResume'), self = this;
        btnResume.onclick = function() {
            self.onresume();
        }
    }
    /**
     * @private
     * 初始化准备按钮
     */
    UI.prototype.__initBtnRetry = function() {
        var btnRetry = my.DOM.get('btnRetry'), self = this;
        btnRetry.onclick = function() {
            self.onretry();
        }
    }


    /**
     * 初始化界面及事件
     */
    UI.prototype.init = function() {
        this.__initBtnPlay();
        this.__initBtnPause();
        this.__initBtnResumeExit();
        this.__initBtnResume();
        this.__initBtnRetry();
    }
    /**
     * 设置分数
     * @param {Number} number
     */
    UI.prototype.setNumber = function(number) {
        var numberChar = number.toString().split('');
        for(var i = 0; i < numberChar.length; i++) {
            numberChar[i] = '<span class="number' + numberChar[i] + '"></span>';
        }
        this.number.innerHTML = numberChar.join('');
    }
    /**
     * 显示或隐藏暂停按钮
     * @param {Boolean} state
     */
    UI.prototype.btnPauseVisible = function(state) {
        if(state) {
            my.DOM.show(my.DOM.get('btnPause'));
        } else {
            my.DOM.hide(my.DOM.get('btnPause'));
        }
    }
    /**
     * 显示或隐藏暂停面板
     * @param {Boolean} state
     */
    UI.prototype.panelResumeVisible = function(state) {
        if(state) {
            my.DOM.show(my.DOM.get('panelResume'));
        } else {
            my.DOM.hide(my.DOM.get('panelResume'));
        }
    }
    /**
     * 显示或隐藏预备状态
     * @param {Boolean} state
     */
    UI.prototype.beingReadyVisible = function(state) {
        if(state) {
            my.DOM.show(my.DOM.get('beingReady'));
        } else {
            my.DOM.hide(my.DOM.get('beingReady'));
        }
    }
    /**
     * 显示或隐藏开始状态
     * @param {Boolean} state
     */
    UI.prototype.beingGoVisible = function(state) {
        if(state) {
            my.DOM.show(my.DOM.get('beingGo'));
        } else {
            my.DOM.hide(my.DOM.get('beingGo'));
        }
    }
    /**
     * 更新游戏结果数据
     * @param {String} name
     * @param {Number} score
     */
    UI.prototype.updateResult = function(name, score) {
        my.DOM.get('name').innerHTML = name || 'Tap here to';
        my.DOM.get('score').innerHTML = score || 0;
    }
    /**
     * 切换到预备界面
     */
    UI.prototype.toCover = function() {
        my.DOM.hide(this.gameBody);
        my.DOM.hide(this.gameOver);
        my.DOM.show(this.gameCover);
    }
    /**
     * 切换到游戏主体界面
     */
    UI.prototype.toBody = function() {
        my.DOM.hide(this.gameOver);
        my.DOM.hide(this.gameCover);
        my.DOM.show(this.gameBody);
    }
    /**
     * 切换到游戏结束界面
     */
    UI.prototype.toOver = function() {
        my.DOM.hide(this.gameCover);
        my.DOM.hide(this.gameBody);
        my.DOM.show(this.gameOver);
    }

    window.UI = UI;
})();
