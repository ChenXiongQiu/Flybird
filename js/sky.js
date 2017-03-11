(function(Fly) {

  var Sky = function(config) {
    // 绘制天空背景
    this.img = config.img;
    // 上下文
    this.context = config.context;
    // 图片宽度
    this.imgW = this.img.width;

    // 速度
    this.speed = 0.2;
    // 坐标
    this.x = config.x || 0;
    this.y = config.y || 0;
  };

  Sky.prototype.render = function(delta) {
    // 先绘制天空背景
    this.context.drawImage(this.img, this.x, this.y);

    // 计算下一帧的位置
    this.x -= this.speed * delta;

    // 判断背景是否超出了画布的范围
    if (this.x <= -this.imgW) {
      this.x += 2 * this.imgW;
    }
  };

  Fly.Sky = Sky;

})(Fly);
