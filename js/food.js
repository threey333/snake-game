//利用沙箱模式以免造成全局污染
(function (window) {
  function Food(option) {
    option = option || {};
    this.width = option.width || 20;
    this.height = option.height || 20;
    this.bgc = option.bgc || "green";
    this.x = option.x || 0;
    this.y = option.y || 0;
  }

  //在Food函数对象的原型添加方法
  Food.prototype.render = function (target) {
    //在方法里面以面向过程解决一系列问题
    //获取地图元素对象
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.backgroundColor = this.bgc;
    div.style.width = this.width + "px";
    div.style.height = this.height + "px";

    //随机获取食物对象x和y坐标位置
    this.x = parseInt((Math.random() * target.offsetWidth) / this.width);
    this.y = parseInt((Math.random() * target.offsetHeight) / this.height);

    //食物对象在地图上的实际位置：自身坐标*自身宽带
    div.style.left = this.x * this.width + "px";
    div.style.top = this.y * this.height + "px";
    map.appendChild(div);
    //获取食物在地图上的坐标位置
  };
  window.Food = Food;
})(window);
