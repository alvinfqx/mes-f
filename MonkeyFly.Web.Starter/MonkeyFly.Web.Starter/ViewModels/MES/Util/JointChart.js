
var viewModel = function () {
    var self = this;
    var graph = new joint.dia.Graph;
    var paperWidth = window.innerWidth - 3;
    var paperHeight = window.innerHeight - 7;
    var paper = null;
    var cellArray = null;

    graph.on('add', function (cell) {
        //console.log('New cell with id ' + cell.id + ' added to the graph.');
    });
    graph.on('remove', function (cell) {
        //console.log('Cell with id ' + cell.id + ' remove to the graph.');
    });
    graph.on('change', function (cell) {
        //console.log('Cell with id ' + cell.id + ' change to the graph.');
    });

    //创建页面
    this.createPaper = function () {
        paper = new joint.dia.Paper({
            el: $('#paper'),
            model: graph,
            gridSize: 1,
            width: paperWidth,
            height: paperHeight,
            elementView: joint.dia.ElementView.extend({
                pointermove: function (evt, x, y) {
                    this._click = false;
                    joint.dia.ElementView.prototype.pointermove.apply(this, arguments);
                }
            }),
            LinkView: joint.dia.LinkView.extend({
                removeVertex: function(endType) {}
            })
        });
    };

    //创建节点
    this.createCell = function (x, y, width, height, label, id) {
        var cell = new joint.shapes.fsa.State({
            position: { x: x, y: y },
            size: { width: width, height: height },
            attrs: { text: { text: label } },
            id: id
        });
        return cell;
    };

    //连接节点
    this.linkArrow = function (id, source, target, isMain, label, vertices) {
        var arrow = new joint.shapes.fsa.Arrow({
            source: { id: source },
            target: { id: target },
            labels: [{ position: .5, attrs: { text: { text: label || '', 'font-weight': 'bold' } } }],
            vertices: vertices || [],
            id: id
        });
        if (isMain) {
            arrow.attr({
                '.connection': { stroke: '#ff0000', 'stroke-width': 2 },
                '.marker-target': { stroke: '#ff0000', fill: '#ff0000', d: 'M 10 0 L 0 5 L 10 10 z' }
            });
        }
        arrow.on('change:source', function (cell, source) {
            if (source.hasOwnProperty("id")) {
                var array = window.parent.chartData;
                for (var i = 0; i < array.length; i++) {
                    if (array[i].ZUniqueId == cell.attributes.id) {
                        array[i].ZpID = source.id;
                        window.parent.model.saveData(
                            array[i].ZUniqueId, 
                            array[i].ZtID,
                            array[i].ZpID, 
                            array[i].IfMain,
                            array[i].Comments);
                        //console.log(window.parent.model);
                    }
                }
            }
        });
        arrow.on('change:target', function (cell, target) {
            if (target.hasOwnProperty("id")) {
                var array = window.parent.chartData;
                for (var i = 0; i < array.length; i++) {
                    if (array[i].ZUniqueId == cell.attributes.id) {
                        array[i].ZtID = target.id;
                        window.parent.model.saveData(
                            array[i].ZUniqueId,
                            array[i].ZtID,
                            array[i].ZpID,
                            array[i].IfMain,
                            array[i].Comments);
                        //console.log(window.parent.model);
                    }
                }
            }
        });
        return arrow;
    };

    //绘制所有节点
    var drawAllCell = function (node, width, depth) {
        var drawX = 100 * (width + 1);
        var drawY = 100 * (depth + 1);

        if (!node) {
            return;
        }

        console.log(node.ZtCode);
        var obj = graph.getCell(node.ZtID);
        if (obj) {
            return;
        }

        graph.addCell(self.createCell(
                    drawX, drawY,
                    node.ZtCode.length * 15,
                    node.ZtCode.length * 6,
                    node.ZtCode, node.ZtID));
        drawX = drawX + node.ZtCode.length * 15 + 30;

        var childs = node.child, length;
        if (childs) {
            length = childs.length;
            for (var i = 0; i < length; i++) {
                drawAllCell(childs[i], i, depth + 1);
            }
        }
    }

    //绘制流程图
    this.drawing = function () {
        var treeData = eval(JSON.stringify(window.parent.chartData));
        for (var i = 0, length = treeData.length; i < length; i++) {
            if (treeData[i].ZtID == treeData[i].ZpID) {
                treeData[i].StartID = treeData[i].ZpID;
                treeData[i].ZpID = "";
                break;
            }
        }
        treeData = chart.toTreeData(treeData, "ZtID", "ZpID", "child");
        if (!(treeData && treeData.length > 0)) {
            console.error("JointData is error");
            return false;
        }
        
        for (var i = 0; i < treeData.length; i++) {
            drawAllCell(treeData[i], 0, 0);
        }

        var array = window.parent.chartData;
        for (var i = 0; i < array.length; i++) {
            if (array[i].ZtID != array[i].ZpID) {
                graph.addCell(self.linkArrow(array[i].ZUniqueId, array[i].ZpID, array[i].ZtID, array[i].IfMain));
            }
        }
    }

    //转换为treeData
    this.toTreeData = function (a, idStr, pidStr, childrenStr) {
        var r = [],
            hash = {},
            len = (a || []).length;
        for (var i = 0; i < len; i++) {
            hash[a[i][idStr]] = a[i];
        }
        for (var j = 0; j < len; j++) {
            var aVal = a[j], hashVP = hash[aVal[pidStr]];
            if (hashVP) {
                !hashVP[childrenStr] && (hashVP[childrenStr] = []);
                hashVP[childrenStr].push(aVal);
            } else {
                r.push(aVal);
            }
        }
        return r;
    }
};

var chart = null;
$(document).ready(function () {
    chart = new viewModel();
    chart.createPaper();
    chart.drawing();
});