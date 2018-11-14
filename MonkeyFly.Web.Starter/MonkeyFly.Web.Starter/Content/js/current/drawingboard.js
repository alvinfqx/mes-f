/*
 * author:Jack
 * date:2017-7-6 17:58:58
 */
mf.DrawingBoard = function (DrawingID, Options) {
    var self = this, drawingID = "#" + DrawingID,
    canvas = null,
    canvas_bak = null,
    context = null;
    context_bak = null,
    historyList = new Array(),
    historyIndex = 0,
    Color = "#000000",
    Size = "1",
    GraphicsType = "Hand",
    isDrawing = false,
    StartPointX = 0,
    StartPointY = 0,
    defaultOptions = {
        imageSrc: "",
        canvasWidth: 400,
        canvasHeight: 400
    };
    //检查文件格式
    var checkFileIsImage = function (fileType) {
        switch (fileType) {
            case 'image/jpeg':
            case 'image/png':
            case 'image/gif':
            case 'image/bmp':
            case 'image/jpg':
                return true;
            default:
                return false;
        }
    };
    //记录图像操作
    var saveHistory = function () {
        historyList.push(canvas.toDataURL());
        historyIndex = historyList.length - 1;
    };
    //画板
    var initCanvas = function () {

        var $btn = $('<div style="display:inline-block;border-right: 2px solid rgba(20, 126, 239, 0.5);padding-right: 5px;">');
        $btn.append('<img class="Browse" title="Browse" src="../../Content/images/drawimage/Browse.png" style="cursor: pointer;width:25px;height:24px;border-width: 2px;border-style: dashed;border-color: rgba(20, 126, 239, 0.5);margin-right:3px;margin-left:3px;" />');
        $btn.append('<a id="download" download="picture"><img class="Download" title="Download" src="../../Content/images/drawimage/download.png" style="cursor: pointer;width:25px;height:24px;border-width: 2px;border-style: dashed;border-color: rgba(20, 126, 239, 0.5);margin-right:3px;" /></a>');
        $btn.append('<img class="Clear" title="Clear" src="../../Content/images/drawimage/xx.png" style="cursor: pointer;width:25px;height:24px;border-width: 2px;border-style: dashed;border-color: rgba(20, 126, 239, 0.5);margin-right:3px;" />');
        $btn.append('<img class="Previous" title="Previous" src="../../Content/images/drawimage/cancel.png" style="cursor: pointer;width:25px;height:24px;border-width: 2px;border-style: dashed;border-color: rgba(20, 126, 239, 0.5);margin-right:3px;" />');
        $btn.append('<img class="Next" title="Next" src="../../Content/images/drawimage/next.png" style="cursor: pointer;width:25px;height:24px;border-width: 2px;border-style: dashed;border-color: rgba(20, 126, 239, 0.5);margin-right:3px;" />');
        $btn.append('<img class="Pencil Shapes" title="Pencil" src="../../Content/images/drawimage/pencil.png" style="cursor: pointer;width:25px;height:24px;border-width: 2px;border-style: dashed;border-color: rgba(20, 126, 239, 0.5);margin-right:3px;" />');
        $btn.append('<img class="Brush Shapes" title="Brush" src="../../Content/images/drawimage/handwriting.png" style="cursor: pointer;width:25px;height:24px;border-width: 2px;border-style: dashed;border-color: rgba(20, 126, 239, 0.5);margin-right:3px;" />');
        $btn.append('<img class="Line Shapes" title="Line" src="../../Content/images/drawimage/line.png" style="cursor: pointer;width:25px;height:24px;border-width: 2px;border-style: dashed;border-color: rgba(20, 126, 239, 0.5);margin-right:3px;" />');
        $btn.append('<img class="Square Shapes" title="Square" src="../../Content/images/drawimage/square.png" style="cursor: pointer;width:25px;height:24px;border-width: 2px;border-style: dashed;border-color: rgba(20, 126, 239, 0.5);margin-right:3px;" />');
        $btn.append('<img class="Circle Shapes" title="Circle" src="../../Content/images/drawimage/circle.png" style="cursor: pointer;width:25px;height:24px;border-width: 2px;border-style: dashed;border-color: rgba(20, 126, 239, 0.5);margin-right:3px;" />');
        $btn.append('<img class="Eraser Shapes" title="Eraser" src="../../Content/images/drawimage/rubber.png" style="cursor: pointer;width:25px;height:24px;border-width: 2px;border-style: dashed;border-color: rgba(20, 126, 239, 0.5);" />');

        var $size = $('<div style="display:inline-block;border-right: 2px solid rgba(20, 126, 239, 0.5);">');
        $size.append('<img class="Size" data-size="1" src="../../Content/images/drawimage/line_size_1.png" style="cursor: pointer;width:25px; height:24px;border:2px dashed red;margin-left:3px;" />');
        $size.append('<img class="Size" data-size="2" src="../../Content/images/drawimage/line_size_3.png" style="cursor: pointer;width:25px; height:24px;" />');
        $size.append('<img class="Size" data-size="3" src="../../Content/images/drawimage/line_size_5.png" style="cursor: pointer;width:25px; height:24px;" />');
        $size.append('<img class="Size" data-size="4" src="../../Content/images/drawimage/line_size_7.png" style="cursor: pointer;width:25px; height:24px;margin-right:3px;" />');

        var $colorTr1 = $('<tr>');
        $colorTr1.append('<td rowspan="2" style="vertical-align:bottom;"><button class="checkColor" style="background-color:#000000;width:24px;height:25px;border:none;margin-right:3px;" /></td>');
        $colorTr1.append('<td><button class="ColorBtn" data-color="#000000" style="background-color:#000000;width:10px;height:13px;border:none;margin-right:3px;" /></td>');
        $colorTr1.append('<td><button class="ColorBtn" data-color="#FF0000" style="background-color:#FF0000;width:10px;height:13px;border:none;margin-right:3px;" /></td>');
        $colorTr1.append('<td><button class="ColorBtn" data-color="#80FF00" style="background-color:#80FF00;width:10px;height:13px;border:none;margin-right:3px;" /></td>');
        $colorTr1.append('<td><button class="ColorBtn" data-color="#00FFFF" style="background-color:#00FFFF;width:10px;height:13px;border:none;margin-right:3px;" /></td>');
        $colorTr1.append('<td><button class="ColorBtn" data-color="#ffd800" style="background-color:#ffd800;width:10px;height:13px;border:none;" /></td>');
        var $colorTr2 = $('<tr>');
        $colorTr2.append('<td><button class="ColorBtn" data-color="#808080" style="background-color:#808080;width:10px;height:13px;border:none;margin-right:3px;" /></td>');
        $colorTr2.append('<td><button class="ColorBtn" data-color="#FF8000" style="background-color:#FF8000;width:10px;height:13px;border:none;margin-right:3px;" /></td>');
        $colorTr2.append('<td><button class="ColorBtn" data-color="#408080" style="background-color:#408080;width:10px;height:13px;border:none;margin-right:3px;" /></td>');
        $colorTr2.append('<td><button class="ColorBtn" data-color="#8000FF" style="background-color:#8000FF;width:10px;height:13px;border:none;margin-right:3px;" /></td>');
        $colorTr2.append('<td><button class="ColorBtn" data-color="#CCCC00" style="background-color:#CCCC00;width:10px;height:13px;border:none;" /></td>');

        var $colorTable = $('<table cellspacing="0" cellpadding="0">');
        $colorTable.append($colorTr1);
        $colorTable.append($colorTr2);

        var $color = $('<div style="display:inline-block;position: absolute;top: -6px;padding-left: 5px;">');
        $color.append($colorTable);

        var $tool = $('<div class="Tool" style="text-align: left;position:relative;padding-bottom:5px;">');
        $tool.append($btn);
        $tool.append($size);
        $tool.append($color);

        var $DrawingContent = $('<div class="DrawingContent" style="position:relative;">');
        $DrawingContent.append('<canvas id="canvas" style="border-width: 1px;border-style: dashed;border-color: rgba(20, 126, 239, 0.50);position: absolute;left: 0px;top: 0px;"></canvas>');
        $DrawingContent.append('<canvas id="canvas_bak" style="border-width: 1px;border-style: dashed;border-color: rgba(20, 126, 239, 0.50);position: absolute;left: 0px;top: 0px;"></canvas>');

        var $DrawingDiv = $("#" + DrawingID);
        $DrawingDiv.html("");
        $DrawingDiv.append('<input id="fileInput" type="file" style="display:none;" />');
        $DrawingDiv.append($tool);
        $DrawingDiv.append($DrawingContent);

        canvas = $(drawingID + " #canvas")[0];
        canvas_bak = $(drawingID + " #canvas_bak")[0];
        canvas.width = Options.canvasWidth;
        canvas.height = Options.canvasHeight;
        canvas_bak.width = Options.canvasWidth;
        canvas_bak.height = Options.canvasHeight;
        context = canvas.getContext('2d');
        context_bak = canvas_bak.getContext('2d');
        if (Options.imageSrc && Options.imageSrc.length > 0) {
            var image = new Image();
            image.src = Options.imageSrc;
            image.onload = function () {
                context.drawImage(image, 0, 0, image.width, image.height, 0, 0, Options.canvasWidth, Options.canvasHeight);
                saveHistory();
            };
        }
        else {
            context.fillStyle = "#FFFFFF";
            context.fillRect(0, 0, Options.canvasWidth, Options.canvasHeight);
            saveHistory();
        }

        //设置Browse事件
        $(drawingID + " .Browse").click(function () {
            $(drawingID + " #fileInput").click();
            onPrevious = false;
            onNext = false;
        });

        //读取图像文件
        $(drawingID + " #fileInput").change(function () {
            var fileName = $(drawingID + " #fileInput").val();
            if (fileName && fileName.length > 0) {
                var fileImage = $(drawingID + " #fileInput")[0].files[0];
                if (checkFileIsImage(fileImage.type)) {
                    reader = new FileReader();
                    reader.onload = (function (f) {
                        return function (e) {
                            var image = new Image();
                            image.src = e.target.result;
                            image.onload = function () {
                                context.drawImage(image, 0, 0, image.width, image.height, 0, 0, Options.canvasWidth, Options.canvasHeight);
                                saveHistory();
                            };
                        };
                    })(fileImage)
                    reader.readAsDataURL(fileImage);
                }
            }
            $(drawingID + " #fileInput").val("");
        });

        //设置Download事件
        $(drawingID + " .Download").click(function () {
            $(drawingID + " #download")[0].href = canvas.toDataURL();
        });

        //设置Clear事件
        $(drawingID + " .Clear").click(function () {
            context.clearRect(0, 0, Options.canvasWidth, Options.canvasHeight);
            context_bak.clearRect(0, 0, Options.canvasWidth, Options.canvasHeight);
            saveHistory();
        });

        //设置Previous事件
        $(drawingID + " .Previous").click(function () {
            if (historyIndex <= 0) {
                return;
            }
            context.clearRect(0, 0, Options.canvasWidth, Options.canvasHeight);
            historyIndex = historyIndex - 1;
            var image = new Image();
            image.src = historyList[historyIndex];
            image.onload = function () {
                context.drawImage(image, 0, 0, image.width, image.height, 0, 0, Options.canvasWidth, Options.canvasHeight);
            };
        });

        //设置Next事件
        $(drawingID + " .Next").click(function () {
            if (historyIndex >= historyList.length - 1) {
                return;
            }
            context.clearRect(0, 0, Options.canvasWidth, Options.canvasHeight);
            historyIndex = historyIndex + 1;
            var image = new Image();
            image.src = historyList[historyIndex];
            image.onload = function () {
                context.drawImage(image, 0, 0, image.width, image.height, 0, 0, Options.canvasWidth, Options.canvasHeight);
            }
        });

        //设置Pencil
        $(drawingID + " .Pencil").click(function () {
            $(drawingID + " .Shapes").css("border-color", "rgba(20, 126, 239, 0.5)");
            $(drawingID + " .Pencil").css("border-color", "red");
            GraphicsType = "Pencil";
        });

        //设置Brush
        $(drawingID + " .Brush").click(function () {
            $(drawingID + " .Shapes").css("border-color", "rgba(20, 126, 239, 0.5)");
            $(drawingID + " .Brush").css("border-color", "red");
            GraphicsType = "Brush";
        });

        //设置Line
        $(drawingID + " .Line").click(function () {
            $(drawingID + " .Shapes").css("border-color", "rgba(20, 126, 239, 0.5)");
            $(drawingID + " .Line").css("border-color", "red");
            GraphicsType = "Line";
        });

        //设置Square
        $(drawingID + " .Square").click(function () {
            $(drawingID + " .Shapes").css("border-color", "rgba(20, 126, 239, 0.5)");
            $(drawingID + " .Square").css("border-color", "red");
            GraphicsType = "Square";
        });

        //设置Circle
        $(drawingID + " .Circle").click(function () {
            $(drawingID + " .Shapes").css("border-color", "rgba(20, 126, 239, 0.5)");
            $(drawingID + " .Circle").css("border-color", "red");
            GraphicsType = "Circle";
        });

        //设置Eraser
        $(drawingID + " .Eraser").click(function () {
            $(drawingID + " .Shapes").css("border-color", "rgba(20, 126, 239, 0.5)");
            $(drawingID + " .Eraser").css("border-color", "red");
            GraphicsType = "Eraser";
        });

        //设置Size
        $(drawingID + " .Size").map(function () {
            $(this).click(function () {
                $(drawingID + " .Size").css("border", "2px dashed white");
                $(this).css("border", "2px dashed red");
                Size = Number($(this).data("size"));
            });
        });

        //设置Color
        $(drawingID + " .ColorBtn").map(function () {
            $(this).click(function () {
                $(drawingID + " .checkColor").css("background-color", $(this).data("color"));
                Color = $(this).data("color");
            });
        });

        //在canvas_bak绑定鼠标事件
        $(canvas_bak).bind('mousedown', function (e) {
            if (GraphicsType != "Hand") {
                context.strokeStyle = Color;
                context_bak.strokeStyle = Color;
                context_bak.lineWidth = Size;

                e = e || window.event;
                StartPointX = e.clientX - $(drawingID + " #canvas").offset().left;
                StartPointY = e.clientY - $(drawingID + " #canvas").offset().top;
                context_bak.moveTo(StartPointX, StartPointY);
                isDrawing = true;
            }
        });
        $(canvas_bak).bind('mouseup', function (e) {
            if (GraphicsType != "Hand") {
                isDrawing = false;
                if (GraphicsType != 'Eraser') {
                    var image = new Image();
                    image.src = canvas_bak.toDataURL();
                    image.onload = function () {
                        context.drawImage(image, 0, 0, image.width, image.height, 0, 0, Options.canvasWidth, Options.canvasHeight);
                        context_bak.clearRect(0, 0, Options.canvasWidth, Options.canvasHeight);
                        saveHistory();
                    }
                    e = e || window.event;
                    var pointX = e.clientX - $(drawingID + " #canvas").offset().left;
                    var pointY = e.clientY - $(drawingID + " #canvas").offset().top;
                    context.beginPath();
                    context.moveTo(pointX, pointY);
                    context.lineTo(pointX + 2, pointY + 2);
                    context.stroke();
                }
            }
        });
        $(canvas_bak).bind('mouseout', function (e) {
            if (GraphicsType != "Hand") {
                context_bak.clearRect(0, 0, Options.canvasWidth, Options.canvasHeight);
            }
        });
        $(canvas_bak).bind('mousemove', function (e) {
            if (GraphicsType != "Hand") {
                e = e || window.event;
                var pointX = e.clientX - $(drawingID + " #canvas").offset().left;
                var pointY = e.clientY - $(drawingID + " #canvas").offset().top;

                switch (GraphicsType) {
                    case "Pencil":
                        if (isDrawing) {
                            context_bak.lineTo(
                                e.clientX - $(drawingID + " #canvas").offset().left,
                                e.clientY - $(drawingID + " #canvas").offset().top);
                            context_bak.stroke();
                        }
                        break;
                    case "Brush":
                        if (isDrawing) {
                            context_bak.beginPath();
                            context_bak.strokeStyle = Color;
                            context_bak.fillStyle = Color;
                            context_bak.arc(pointX, pointY, Size * 10, 0, Math.PI * 2, false);
                            context_bak.fill();
                            context_bak.stroke();
                            context_bak.restore();
                        }
                        else {
                            context_bak.clearRect(0, 0, Options.canvasWidth, Options.canvasHeight);
                            context_bak.beginPath();
                            context_bak.fillStyle = Color;
                            context_bak.arc(pointX, pointY, Size * 10, 0, Math.PI * 2, false);
                            context_bak.fill();
                            context_bak.stroke();
                        }
                        break;
                    case "Line":
                        if (isDrawing) {
                            context_bak.clearRect(0, 0, Options.canvasWidth, Options.canvasHeight);
                            context_bak.beginPath();
                            context_bak.moveTo(StartPointX, StartPointY);
                            context_bak.lineTo(pointX, pointY);
                            context_bak.stroke();
                        }
                        break;
                    case "Square":
                        if (isDrawing) {
                            context_bak.clearRect(0, 0, Options.canvasWidth, Options.canvasHeight);
                            context_bak.beginPath();
                            context_bak.moveTo(StartPointX, StartPointY);
                            context_bak.lineTo(pointX, StartPointY);
                            context_bak.lineTo(pointX, pointY);
                            context_bak.lineTo(StartPointX, pointY);
                            context_bak.lineTo(StartPointX, StartPointY);
                            context_bak.stroke();
                        }
                        break;
                    case "Circle":
                        if (isDrawing) {
                            context_bak.clearRect(0, 0, Options.canvasWidth, Options.canvasHeight);
                            context_bak.beginPath();
                            context_bak.arc(
                            StartPointX, StartPointY,
                            Math.sqrt((StartPointX - pointX) * (StartPointX - pointX) + (StartPointY - pointY) * (StartPointY - pointY)),
                            0, Math.PI * 2, false);
                            context_bak.stroke();
                        }
                        break;
                    case "Eraser":
                        context_bak.clearRect(0, 0, Options.canvasWidth, Options.canvasHeight);
                        context_bak.lineWidth = 1;
                        context_bak.beginPath();
                        context_bak.strokeStyle = '#000000';
                        context_bak.moveTo(pointX - Size * 10, pointY - Size * 10);
                        context_bak.lineTo(pointX + Size * 10, pointY - Size * 10);
                        context_bak.lineTo(pointX + Size * 10, pointY + Size * 10);
                        context_bak.lineTo(pointX - Size * 10, pointY + Size * 10);
                        context_bak.lineTo(pointX - Size * 10, pointY - Size * 10);
                        context_bak.stroke();
                        if (isDrawing) {
                            context.clearRect(pointX - Size * 10, pointY - Size * 10, Size * 20, Size * 20);
                        }
                        break;
                }
            }
        });
    };
    //设置画板属性
    Options = $.extend({}, defaultOptions, Options);
    //创建画板
    initCanvas();
    //获取file对象
    this.getImageFile = function () {
        return $(drawingID + " #canvas")[0].toDataURL("image/png");
    };
};