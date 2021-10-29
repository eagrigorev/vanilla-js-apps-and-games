var gallery = () => {
    var thumbs = document.getElementsByTagName("img");
    for (var i = 0; i < thumbs.length; i++) {
        thumbs[i].addEventListener("click", showImage);
        thumbs[i].addEventListener("click", navigation);
    }
};
var showImage = (eventObj) => {
    document.getElementById("big-img").innerHTML = "";
    var imageNameFinder = eventObj.target.id.split("-");
    var src = "img/gallery-" + imageNameFinder[1] + ".png";
    var bigImage = document.createElement("img");
    bigImage.setAttribute("id", "big-img-" + imageNameFinder[1]);
    bigImage.setAttribute("class", "current-image");
    bigImage.src = src;
    document.getElementById("big-img").appendChild(bigImage);
};
var navigation = () => {
    document.getElementById("nav").innerHTML = "";
    var prev = document.createElement("button");
    prev.innerHTML = "<< back";
    var next = document.createElement("button");
    next.innerHTML = "forward >>";
    var close = document.createElement("button");
    close.innerHTML = "hide";
    prev.setAttribute("class", "button");
    next.setAttribute("class", "button");
    close.setAttribute("class", "button");
    document.getElementById("nav").appendChild(prev);
    document.getElementById("nav").appendChild(next);
    document.getElementById("nav").appendChild(close);
    prev.onclick = () => {
        var currentImgId =
            document.getElementsByClassName("current-image")[0].id;
        switch (currentImgId) {
            case "big-img-3":
                var src = "img/gallery-2.png";
                currentImgId = "big-img-2";
                break;
            case "big-img-2":
                var src = "img/gallery-1.png";
                currentImgId = "big-img-1";
                break;
            case "big-img-1":
                var src = "img/gallery-3.png";
                currentImgId = "big-img-3";
                break;
        }
        document.getElementById("big-img").innerHTML = "";
        var bigImage = document.createElement("img");
        bigImage.setAttribute("id", currentImgId);
        bigImage.setAttribute("class", "current-image");
        bigImage.src = src;
        document.getElementById("big-img").appendChild(bigImage);
    };
    next.onclick = () => {
        var currentImgId =
            document.getElementsByClassName("current-image")[0].id;
        switch (currentImgId) {
            case "big-img-1":
                var src = "img/gallery-2.png";
                currentImgId = "big-img-2";
                break;
            case "big-img-2":
                var src = "img/gallery-3.png";
                currentImgId = "big-img-3";
                break;
            case "big-img-3":
                var src = "img/gallery-1.png";
                currentImgId = "big-img-1";
                break;
        }
        document.getElementById("big-img").innerHTML = "";
        var bigImage = document.createElement("img");
        bigImage.setAttribute("id", currentImgId);
        bigImage.setAttribute("class", "current-image");
        bigImage.src = src;
        document.getElementById("big-img").appendChild(bigImage);
    };
    close.onclick = () => {
        document.getElementById("big-img").innerHTML = "";
        document.getElementById("nav").removeChild(prev);
        document.getElementById("nav").removeChild(next);
        document.getElementById("nav").removeChild(close);
    };
};
window.onload = gallery;
