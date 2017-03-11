// 小鸟的构造函数
// 1 将所有的代码放到沙箱中
(function(Fly) {

// 构造函数
// 只需要传入 img 属性即可！
var Bird = function( config ) {
	this.context = config.context;
	// 获取到当前图片
	this.img = config.img;
	// 小鸟默认位置
	this.y = config.y || 100;
	this.x = 100;
	
	// 计算出高度和宽度
	this.imgH = this.img.height;
	this.imgW = this.img.width / 3;
	
	// 加速度
	this.a = 0.0005;
	// 瞬时速度
	this.speed = 0;
	// 旋转的最大角度
	this.maxAngle = 45;
	// 达到最大角度的速度，即 速度为 0.5 的时候，角度为：45度
	this.maxSpeed = 0.5;
	// 当前速度对应的角度
	this.curAngle = 0;
	// 用来控制当前绘制的是第几帧
	this.frameIndex = 0;
};

// 原型
Bird.prototype.render = function( delta ) {
	// 控制两个方向的最大速度
	if(this.speed > this.maxSpeed) {
		this.speed = this.maxSpeed;
	} else if(this.speed < -this.maxSpeed) {
		this.speed = -this.maxSpeed;
	}
	// 计算角度
	this.curAngle = this.speed / this.maxSpeed * this.maxAngle;

	// 因为小鸟需要围绕自己旋转
	// 先平移再旋转
	this.context.translate(this.x, this.y);
	this.context.rotate( this.curAngle / 180 * Math.PI );

	// 绘制小鸟
	this.context.drawImage(this.img, this.frameIndex++ * this.imgW, 0, this.imgW, this.imgH, -1/2*this.imgW, -1/2*this.imgH, this.imgW, this.imgH);

	// 计算下一次绘制哪一帧
	this.frameIndex %= 3;

	// 调用计算下一帧位置的方法
	this.calcPosition(delta);
};

// 计算小鸟下一帧的位置
Bird.prototype.calcPosition = function( delta ) {
	// 计算经过时间 delta 后，小鸟的位置
	this.y += this.speed * delta + 1/2 * this.a * delta * delta;
	// 计算瞬时速度
	this.speed += this.a * delta;
};

// 改变小鸟速度的方法
Bird.prototype.changeSpeed = function( cSpeed ) {

	this.speed = cSpeed;
};

// 将 Bird 作为 Fly 全局对象的属性暴露
Fly.Bird = Bird;

})(window.Fly);