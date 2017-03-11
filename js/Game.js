(function(Fly) {

// 抽象游戏对象（世界对象）

var Game = function( config ) {
	this.context = config.context;

	// 游戏图片
	this.imgSrc = ['birds', 'land', 'sky', 'pipe1', 'pipe2'];

	// 上一帧的时间
	this.lastFrameTime = new Date() - 0;
	// 当前帧的时间
	this.curFrameTime = new Date() - 0;
	// 两帧的时间间隔
	this.delta = 0;
	// 是否开始游戏： true表示游戏进行
	// 							  false 表示游戏结束
	this.isStart = true;
};


Game.prototype = {
	constructor: Game,
	
	/**
	 * 初始化所有的游戏角色
	 * @return {[type]} [description]
	 */
	init: function( imgList ) {
		var ctx = this.context;
		var cv = ctx.canvas;
		var that = this;

		// 英雄对象（小鸟）
		this.hero = null;
		// 游戏中所有角色
		this.roles = [];

		// 创建小鸟对象
		this.hero = new Fly.Bird({
			img: imgList['birds'],
			context: ctx
		});
		
		// 创建天空对象
		for(var i = 0; i < 2; i++) {
			var sky = new Fly.Sky({
				img: imgList['sky'],
				context: ctx,
				x: imgList['sky'].width * i
			});

			this.roles.push( sky );
		}
		
		// 绘制管道
		for(var i = 0; i < 6; i++) {
			var pipe = new Fly.Pipe({
				context: ctx,
				imgTop: imgList['pipe2'],
				imgBottom: imgList['pipe1'],
				x: 300 + i * imgList['pipe1'].width * 3
			})

			this.roles.push( pipe );
		}

		// 创建陆地背景
		for(var i = 0; i < 4; i++) {
			var land = new Fly.Land({
				context: ctx,
				img: imgList['land'],
				x: i * imgList['land'].width,
				y: cv.height - imgList['land'].height
			})

			this.roles.push( land );
		}

		// 给canvas画布绑定单击事件
	  this.context.canvas.addEventListener('click', function() {
	  	that.hero.changeSpeed( -0.3 );
	  });
	},

	/**
	 * 开始游戏
	 * @return {[type]} [description]
	 */
	startGame: function() {
		this.render();
	},

	/**
	 * 结束游戏
	 * @return {[type]} [description]
	 */
	gameOver: function() {
		this.isStart = false;
	},

	/**
	 * 渲染游戏
	 * @return {[type]} [description]
	 */
	render: function() {
		// that 引用 this
		var that = this;
		var ctx = that.context;
		var cv = ctx.canvas;

		Fly.loadImages(that.imgSrc, function( imgList ) {
			// 初始化所有的角色
			that.init( imgList );
			// 因为 init 方法中用来初始化了 小鸟对象，所以，
			// 赋值操作需要放到 初始化 以后
			var b = that.hero;

	  	// 渲染画布
	  	var render = function() {
	  		if(that.isStart) {
	  			// 清空画布中上一帧的内容
		  		ctx.clearRect(0, 0, cv.width, cv.height);
		  		// 开启新路径
		  		ctx.beginPath();
		  		// 保存默认的状态
		  		ctx.save();

		  		// 当前帧的时间
		  		that.curFrameTime = new Date() - 0;
		  		// 两帧时间间隔
		  		that.delta = that.curFrameTime - that.lastFrameTime;
		  		// 将当前时间赋值为上一帧时间
		  		that.lastFrameTime = that.curFrameTime;

		  		// 统一调用所有游戏角色的 render 方法，来绘制自身
		  		that.roles.forEach(function( role ) {
		  			role.render( that.delta );
		  		});
		  		
		  		// 绘制小鸟
		  		b.render( that.delta );

		  		// 检测小鸟碰撞
		  		if(b.y <= 0 || (b.y >= cv.height - imgList['land'].height - 10) 
		  			|| ctx.isPointInPath(b.x, b.y)) {
		  			// that.isStart = false;
		  			that.gameOver();
		  		}

		  		ctx.restore();

		  		window.requestAnimationFrame( render );
	  		}
	  	};

	  	window.requestAnimationFrame( render );
	  } );
	}
};

Fly.Game = Game;

})(Fly);