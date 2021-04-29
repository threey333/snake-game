//利用沙箱模式以免造成全局污染
(function (window) {
  //游戏对象的属性
  function Game(target) {
    this.food = new Food();
    this.snake = new Snake();
    this.map = target;
  }

  //把食物对象和蛇对象渲染在地图上。
  Game.prototype.render = function (target) {
    this.food.render(target);
    this.snake.render(target);
  };

  //游戏对象的方法
  Game.prototype.startGame = function (target) {
    //创建定时器让蛇跑起来
    //因为定时器内的回调函数this指向是window，所以要改变定时器内的this指向。
    const that = this;

    //先清楚定时器
    console.log(this.snake.timerid);
    clearInterval(this.snake.timerid);
    this.snake.timerid = null;

    this.snake.timerid = setInterval(function () {
      that.snake.move(map, that.food);
      let x = that.snake.body[0].x;
      let y = that.snake.body[0].y;

      //给游戏下定结束规则,即蛇喷到墙就算游戏结束
      if (
        x < 0 ||
        x >= that.map.offsetWidth / that.snake.width ||
        y < 0 ||
        y >= that.map.offsetHeight / that.snake.height
      ) {
        clearInterval(that.snake.timerid);
        alert("Game over");
        
        //当游戏结束后开始游戏案例显示
        btn.style.display = "block";
        that.snake.direction = "right";
        console.log(that.snake.body);
        that.snake.body[0] = { x: 3, y: 0 };
        that.snake.body[1] = { x: 2, y: 0 };
        that.snake.body[2] = { x: 1, y: 0 };
        that.snake.body[3] = { x: 0, y: 0 };
      }

      //蛇头碰到蛇身也算游戏结束
      const length = that.snake.body.length;
      for (let index = 4; index < length; index++) {
        if (x == that.snake.body[index].x && y == that.snake.body[index].y) {
          clearInterval(that.snake.timerid);
          alert("Game over");
          btn.style.display = "block";
          that.snake.body = null;
          that.snake.body = [
            { x: 3, y: 0 },
            { x: 2, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: 0 },
          ];
          that.snake.direction = "right";
        }
      }
    }, 100);

    //改变蛇的方向
    //给页面注册键盘事件
    document.onkeyup = function (e) {
      var key = e.keyCode;

      //解决蛇突然反方向移动。
      //当前蛇that.snake.direction方向为right
      switch (key) {
        case 37:
          if (that.snake.direction === "right") {
            return 0;
          }
          that.snake.direction = "left";
          break;
        case 38:
          if (that.snake.direction === "bottom") {
            return 0;
          }
          that.snake.direction = "top";
          break;
        case 39:
          if (that.snake.direction === "left") {
            return 0;
          }
          that.snake.direction = "right";
          break;
        case 40:
          if (that.snake.direction === "top") {
            return 0;
          }
          that.snake.direction = "bottom";
          break;
      }
    };
  };

  window.Game = Game;
})(window);
