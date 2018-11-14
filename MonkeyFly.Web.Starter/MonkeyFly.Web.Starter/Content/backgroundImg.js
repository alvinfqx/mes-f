//function imgSrc() {
//    document.write("<img id=\"img\" src=\"/Content/pics/" + parseInt(Math.random() * 340 + 1).toString() + ".jpg\" alt=\"MF Life\" />");
//}
//$("body").css("background-image", "../img/login-background.jpg");

var imgArr = ["Content/img/login-background.jpg",
    "Content/img/profile_big.jpg",
    "Content/img/p2.jpg",
    "Content/img/p3.jpg",
    "Content/img/p1.jpg", ];
var index = Math.floor(Math.random() * imgArr.length);
var currentImage = imgArr[index];
document.body.style.backgroundImage = "url(" + currentImage + ")";

