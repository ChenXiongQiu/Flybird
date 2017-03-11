// Fly 提供一个对象，保证整个游戏中只有一个全局对象！
(function(window) {

// 整个小鸟游戏的全局对象！
// 
// 也就是：游戏中所有的其他游戏角色都作为当前对象的一个属性或方法

var FlyObj = {};

// 1 把加载图片的函数放到这个位置
FlyObj.loadImages = function( imgSrc, callback ) {
	var loadedCount = 0, 
		length = imgSrc.length,
		imgList = {};

	imgSrc.forEach(function(value) {
		var img = new Image();
		img.src = 'imgs/' + value + '.png';
		imgList[value] = img;

		img.addEventListener('load', function() {
			loadedCount++;

			if(loadedCount >= length) {
				// 说明所有的图片都加载完成

				callback( imgList );
			}
		});
	});
};

// 2 角度转弧度

// 将Fly暴露到全局环境中
window.Fly = FlyObj;
})(window);