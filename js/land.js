(function(Fly) {

  var Land = function(config) {
  	// 上下文
    this.context = config.context;
    // 图片
    this.img = config.img;
    // 坐标
    this.x = config.x || 0;
    this.y = config.y || 0;
    // 图片宽度
    this.imgW = this.img.width;
    // 速度
    this.speed = 0.2;
  };

  Land.prototype.render = function(delta) {
  	// 绘制图片
    this.context.drawImage(this.img, this.x, this.y);

    // 计算坐标
    this.x -= this.speed * delta;
    // 改变位置
    if (this.x <= -this.imgW) {
      this.x += 4 * this.imgW;
    }
  };

  Fly.Land = Land;
})(Fly);
