//利用沙箱模式避免造成全局污染
(function (window) {
    //创建蛇的实例方法
    function Snake(options) {
        options = options || {};
        this.width = options.width || 20;
        this.height = options.height || 20;
        this.direction = options.direction || 'right';
        this.headColor = options.boodBgc || '#ffb6b9';
        this.bodyColor = options.bodyColor || '#fae3d9';

        //蛇的核心，组成蛇的一节一节小方块，默认蛇是由三个小方块组成
        this.body = options.body = [
            { x: 3, y: 0 },
            { x: 2, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: 0 }
        ]
    }

    //把对象蛇渲染到地图上
    //把对象的方法放到对象的原型对象上，实现实例对象的公用
    Snake.prototype.render = function (target) {

        //动态创建蛇身
        const length = this.body.length;   //优化for消耗的时间
        for (let i = 0; i < length; i++) {
            var span = document.createElement('span');
            span.style.width = this.width + 'px';
            span.style.height = this.height + 'px';

            //判断蛇头还是蛇身，然后添加不同的背景蛇
            if (i === 0) {
                span.style.backgroundColor = this.headColor;
            } else {
                span.style.backgroundColor = this.bodyColor;
            }

            //给每节蛇身渲染到地图的响应位置
            //响应位置的实际坐标:每节的自身坐标*一节蛇身的宽度
            span.style.position = "absolute";

            //容易弄错的地方,this.body[i]==>获取的是每节蛇身x和y的坐标
            span.style.left = this.body[i].x * this.width + 'px';
            span.style.top = this.body[i].y * this.height + 'px';
            map.appendChild(span);
        }

    }

    /* 
        蛇对象的移动move()方法 
        蛇移动的原理：修改body数组中的蛇每一节的坐标
        有两种方式：
            1.需要让蛇的每一节坐标发生改变，····代码要使用for循环遍历（这种方式型能差）
            2.复制蛇头，删除蛇尾
    */
    Snake.prototype.move = function (target, obj) {
        //obj形参是把food对象里面的属性和方法传入进来使用

        //让蛇移动采用第二种方式。
        //实现思路：
        //1.复制当前蛇头的坐标，得到一个新的蛇头 newHead
        //2.将newHead 添加到body中
        //3.根据蛇移动的方向去修改newHead的坐标
        //4.把蛇尾删掉

        //第一步：
        var newHead = {
            x: this.body[0].x,
            y: this.body[0].y
        }
        //第二步：把新蛇头添加到body的头部
        this.body.unshift(newHead);

        //第三步：根据蛇移动的方向去修改newHead的坐标
        switch (this.direction) {
            case 'top':
                newHead.y--;
                break;
            case 'right':
                newHead.x++;
                break;
            case 'bottom':
                newHead.y++;
                break;
            case 'left':
                newHead.x--;
                break;
            default:
                break;
        }

        if (this.body[0].x === obj.x && this.body[0].y === obj.y) {
            //蛇头的坐标和食物的坐标相同说明蛇头吃了食物,此时清楚当前食物的坐标再重新渲染。
            var div = target.querySelector('div');
            target.removeChild(div);

            obj.render(target);

            //解决食物对象随机出现在蛇的身上
            let snakeLength = this.body.length;
            //重新出现的食物坐标和蛇身上的坐标做判断，相同则重新渲染
            for (let i = 0; i < snakeLength; i++) {
                if (obj.x == this.body[i].x && obj.y == this.body[i].y) {

                    //根蛇身上坐标相同则删除当前渲染的节点
                    var div = target.querySelector('div');
                    target.removeChild(div);
                    //当重新渲染后，for循环重新变成-1;
                    obj.render(target);
                    i = -1;
                }
            }
        } else {
            //第四步：删除蛇尾
            this.body.pop();
        }

        //渲染最新的蛇.
        //采用排他思想，渲染之前先删除蛇所有节点。
        var spans = target.querySelectorAll('span');
        var spansLength = spans.length;
        for (let i = 0; i < spansLength; i++) {
            target.removeChild(spans[i]);
        }
        //重新渲染
    
        this.render(target);
    }

    window.Snake = Snake;
})(window)