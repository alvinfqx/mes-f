//contextID-蒙版ID  drawControllerimgID-画板控制器图片ID
mf.draw = function (contextID,drawControllerimgID, options) {
    var self = this;

    //撤销的array
    var cancelList = new Array();

    //撤销的次数
    var cancelIndex = 0;

    //默认设置项
    var defaults = {
        canvas: null,
        context:null,
        canvasTop: 0,
        canvasLeft: 0,
        canvas_bak: null,
        context_bak: null,
        size: 1,
        color: '#000000',
        canvasWidth: 500,
        canvasHeight:377
    };

    //画笔大小
    //var size = 1;
    //var color = '#000000';

    var options = $.extend({}, defaults, options);

    //改变canvasTop，canvasLeft
    this.changetopaleftValue = function (Top, Left) {
        options.canvasTop = Top;
        options.canvasLeft = Left;
    }

    //改变size
    this.changeSize = function (sizeValue) {
        options.size = sizeValue;
    }

    //改变color
    this.changeColor = function (colorValue) {
        options.color = colorValue;
    }

    //画图形
    this.draw_graph = function (graphType, obj) {
        //把蒙版放于画板上面
        $(contextID).css("z-index", 1);
        //先画在蒙版上 再复制到画布上

        chooseImg(obj);
        var canDraw = false;

        var startX;
        var startY;

        //鼠标按下获取 开始xy开始画图
        var mousedown = function (e) {
            if(graphType != null){
                options.context.strokeStyle = options.color;
                options.context_bak.strokeStyle = options.color;
                options.context_bak.lineWidth = options.size;
                e = e || window.event;
                startX = e.clientX - options.canvasLeft;
                startY = e.clientY - options.canvasTop;
                options.context_bak.moveTo(startX, startY);
                canDraw = true;

                if (graphType == 'pencil') {
                    options.context_bak.beginPath();
                } else if (graphType == 'circle') {
                    options.context.beginPath();
                    options.context.moveTo(startX, startY);
                    options.context.lineTo(startX + 2, startY + 2);
                    options.context.stroke();

                } else if (graphType == 'rubber') {
                    options.context.clearRect(startX - options.size * 10, startY - options.size * 10, options.size * 20, options.size * 20);
                }
            }          
        };

        //鼠标离开 把蒙版canvas的图片生成到canvas中
        var mouseup = function (e) {
            if (graphType != null) {
                e = e || window.event;
                canDraw = false;
                var image = new Image();
                if (graphType != 'rubber') {

                    image.src = options.canvas_bak.toDataURL();
                    image.onload = function () {
                        options.context.drawImage(image, 0, 0, image.width, image.height, 0, 0, options.canvasWidth, options.canvasHeight);
                        self.saveImageToAry();
                        self.clearContext();
                    }
                    var x = e.clientX - options.canvasLeft;
                    var y = e.clientY - options.canvasTop;
                    options.context.beginPath();
                    options.context.moveTo(x, y);
                    options.context.lineTo(x + 2, y + 2);
                    options.context.stroke();


                }
            }
        };

        //选择功能按钮 修改样式
        function chooseImg(obj) {
            var imgAry = $(drawControllerimgID);
            for (var i = 0; i < imgAry.length; i++) {
                $(imgAry[i]).removeClass('border_choose');
                $(imgAry[i]).addClass('border_nochoose');
            }
            $(obj).removeClass("border_nochoose");
            $(obj).addClass("border_choose");
        }

        // 鼠标移动
        var mousemove = function (e) {
            if (graphType != null) {
                e = e || window.event;
                var x = e.clientX - options.canvasLeft;
                var y = e.clientY - options.canvasTop;
                var z = e.clientX;
                //方块  4条直线搞定
                if (graphType == 'square') {
                    if (canDraw) {
                        options.context_bak.beginPath();
                        self.clearContext();
                        options.context_bak.moveTo(startX, startY);
                        options.context_bak.lineTo(x, startY);
                        options.context_bak.lineTo(x, y);
                        options.context_bak.lineTo(startX, y);
                        options.context_bak.lineTo(startX, startY);
                        options.context_bak.stroke();
                    }
                    //直线
                } else if (graphType == 'line') {
                    if (canDraw) {
                        options.context_bak.beginPath();
                        self.clearContext();
                        options.context_bak.moveTo(startX, startY);
                        options.context_bak.lineTo(x, y);
                        options.context_bak.stroke();
                    }
                    //画笔
                } else if (graphType == 'pencil') {
                    if (canDraw) {
                        options.context_bak.lineTo(e.clientX - options.canvasLeft, e.clientY - options.canvasTop);
                        options.context_bak.stroke();
                    }
                    //圆 未画得时候 出现一个小圆
                } else if (graphType == 'circle') {
                    self.clearContext();
                    if (canDraw) {
                        options.context_bak.beginPath();
                        var radii = Math.sqrt((startX - x) * (startX - x) + (startY - y) * (startY - y));
                        options.context_bak.arc(startX, startY, radii, 0, Math.PI * 2, false);
                        options.context_bak.stroke();
                    } else {
                        options.context_bak.beginPath();
                        options.context_bak.arc(x, y, 20, 0, Math.PI * 2, false);
                        options.context_bak.stroke();
                    }
                    //涂鸦 未画得时候 出现一个小圆
                } else if (graphType == 'handwriting') {
                    if (canDraw) {
                        options.context_bak.beginPath();
                        options.context_bak.strokeStyle = options.color;
                        options.context_bak.fillStyle = options.color;
                        options.context_bak.arc(x, y, options.size * 10, 0, Math.PI * 2, false);
                        options.context_bak.fill();
                        options.context_bak.stroke();
                        options.context_bak.restore();
                    } else {
                        self.clearContext();
                        options.context_bak.beginPath();
                        options.context_bak.fillStyle = options.color;
                        options.context_bak.arc(x, y, options.size * 10, 0, Math.PI * 2, false);
                        options.context_bak.fill();
                        options.context_bak.stroke();
                    }
                    //橡皮擦 不管有没有在画都出现小方块 按下鼠标 开始清空区域
                } else if (graphType == 'rubber') {
                    var size = options.size;
                    options.context_bak.lineWidth = 1;
                    self.clearContext();
                    options.context_bak.beginPath();
                    options.context_bak.strokeStyle = '#000000';
                    options.context_bak.moveTo(x - size * 10, y - size * 10);
                    options.context_bak.lineTo(x + size * 10, y - size * 10);
                    options.context_bak.lineTo(x + size * 10, y + size * 10);
                    options.context_bak.lineTo(x - size * 10, y + size * 10);
                    options.context_bak.lineTo(x - size * 10, y - size * 10);
                    options.context_bak.stroke();
                    if (canDraw) {
                        options.context.clearRect(x - size * 10, y - size * 10, size * 20, size * 20);

                    }
                }
            }           
        };


        //鼠标离开区域以外 除了涂鸦 都清空
        var mouseout = function () {
            if (graphType != 'handwriting') {
                self.clearContext();
            }
        }

        $(options.canvas_bak).unbind();
        $(options.canvas_bak).bind('mousedown', mousedown);
        $(options.canvas_bak).bind('mousemove', mousemove);
        $(options.canvas_bak).bind('mouseup', mouseup);
        $(options.canvas_bak).bind('mouseout', mouseout);

    };

    //清空层
    this.clearContext = function (type) {
        if (!type) {
            options.context_bak.clearRect(0, 0, options.canvasWidth, options.canvasHeight);
        } else {
            options.context.clearRect(0, 0, options.canvasWidth, options.canvasHeight);
            options.context_bak.clearRect(0, 0, options.canvasWidth, options.canvasHeight);
        }
    }

    //撤销上一个操作
    this.cancel = function () {
        cancelIndex++;
        options.context.clearRect(0, 0, options.canvasWidth, options.canvasHeight);
        var image = new Image();
        var index = cancelList.length - 1 - cancelIndex;
        var url = cancelList[index];
        image.src = url;
        image.onload = function () {
            options.context.drawImage(image, 0, 0, image.width, image.height, 0, 0, options.canvasWidth, options.canvasHeight);
        }
    }

    //重做上一个操作
    this.next = function () {
        cancelIndex--;
        options.context.clearRect(0, 0, options.canvasWidth, options.canvasHeight);
        var image = new Image();
        var index = cancelList.length - 1 - cancelIndex;
        var url = cancelList[index];
        image.src = url;
        image.onload = function () {
            options.context.drawImage(image, 0, 0, image.width, image.height, 0, 0, options.canvasWidth, options.canvasHeight);
        }
    }

    //保存历史 用于撤销
    this.saveImageToAry = function () {
        cancelIndex = 0;
        var dataUrl = options.canvas.toDataURL();
        cancelList.push(dataUrl);
    }
}
