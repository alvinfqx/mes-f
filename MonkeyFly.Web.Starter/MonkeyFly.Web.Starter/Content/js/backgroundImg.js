var imgArr = [
    "Content/img/login-background.jpg",
    "Content/img/b1.jpg",
    "Content/img/b2.jpg",
    "Content/img/b3.jpg",
    "Content/img/b5.jpg",
    "Content/img/b6.jpg",
    "Content/img/b7.jpg"
];
var index = Math.floor(Math.random() * imgArr.length);
var currentImage = imgArr[index];
document.body.style.backgroundImage = "url(" + currentImage + ")";

