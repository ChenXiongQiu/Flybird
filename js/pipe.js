(function(Fly) {

var Pipe = function( config ) {
	this.context = config.context;
	// 上边的管道
	this.imgTop = config.imgTop;
	// 下边的管道
	this.imgBottom = config.imgBottom;

	this.x = config.x;
	// 管道的宽度
	this.imgW = this.imgTop.width;
	this.imgH = this.imgTop.height;
	// 管道的Y坐标是随机生成的
	this.topY = 0;
	this.bottomY = 0;
	// 上下两个管道之间的距离
	this.pipeSpace = 150;
	
	this.speed = 0.2;

	this.initPipeHeight();
};

// 绘制管道：
// 1 上下管道的高度需要随机生成
// 2 canvas画布中展示多少个管道

Pipe.prototype.render = function( delta ) {
	this.initPath();

	// 绘制上边管道的图片
	this.context.drawImage(this.imgTop, this.x, this.topY);
	// 绘制下边管道的图片
	this.context.drawImage(this.imgBottom, this.x, this.bottomY);

	// 计算下一帧的坐标
	this.x -= this.speed * delta;
	if(this.x < -this.imgW) {

		this.x += this.imgW * 3 * 6;

		// 调用 生成高度的方法
		this.initPipeHeight();
	}
};

// 绘制路径
// 
// 问题：什么时候需要调用 绘制路径 方法？？
Pipe.prototype.initPath = function() {
	this.context.rect(this.x, this.topY, this.imgW, this.imgH);
	this.context.rect(this.x, this.bottomY, this.imgW, this.imgH);
};

// 随机生成管道的高度
Pipe.prototype.initPipeHeight = function() {
	// 最终需要将生成的高度，转化为 y 坐标
	// 因为 管道的高度不能太高，也不能太少了，所以，我们规定
	// 管道的最小高度为：50
	// 管道的最大高度为：250
	var h = Math.random() * 200 + 50;

	// 上边管道的Y坐标
	this.topY = h - this.imgH;
	// 下边管道的Y坐标
	this.bottomY = h + this.pipeSpace;
};

Fly.Pipe = Pipe;

})(Fly);