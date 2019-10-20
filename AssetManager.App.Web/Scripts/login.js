var Background = {
    background_image_ratio: 0,
    background_image_loaded: false,
    winW: -1,
    winH: 460,
    viewport_height: 460,
    background_resized: false
};

var isDefined = function (e) {
    return null != e && void 0 != e && (e.length > 0 || "object" == typeof e || "boolean" == typeof e || "number" == typeof e)
};
var getViewport = function () {
    var e, t;
    return "undefined" != typeof window.innerWidth ? (e = window.innerWidth, t = window.innerHeight) : "undefined" != typeof document.documentElement && "undefined" != typeof document.documentElement.clientWidth && 0 != document.documentElement.clientWidth ? (e = document.documentElement.clientWidth, t = document.documentElement.clientHeight) : (e = document.getElementsByTagName("body")[0].clientWidth, t = document.getElementsByTagName("body")[0].clientHeight), [e, t]
};
var resize_bg = function (e) {
    void 0 != e && (Context.original_orientation = e), document.body && document.body.offsetWidth && (Background.winW = document.body.offsetWidth, Background.winH = document.body.offsetHeight), "CSS1Compat" == document.compatMode && document.documentElement && document.documentElement.offsetWidth && (Background.winW = document.documentElement.offsetWidth, Background.winH = document.documentElement.offsetHeight), window.innerWidth && window.innerHeight && (Background.winW = window.innerWidth, Background.winH = window.innerHeight);
    var t = document.documentMode;
    if (isDefined(document.documentElement) && isDefined(document.documentElement.clientHeight) && (Background.viewport_height = document.documentElement.clientHeight) && Background.viewport_height > 10) {
        $("td#login-container-center").css("height", Background.viewport_height - 10);
    }
    else {
        $("td#login-container-center").css("height", Background.winH - 10);
    }

    var n = getViewport();

    var o = $(document).width() - 400,
        i = $(document).height(),
        a = o,
        r = Math.round(a / Background.background_image_ratio);
    $("#login-background-image").width(a);
    $("#login-background-image").height(r);

    if (i > r && (r = i, a = Math.round(r * Background.background_image_ratio))) {
        $("#login-background-image").width(a);
        $("#login-background-image").height(r);
    }

    Background.background_resized = true;
    onLoadImage();
};

var onLoadImageHelper = function () {
    var e = $("#login-background-image");
    e.hide(),
        $("#login-background-image_old").remove(),
        $("#background-branding-overlay").css("visibility", "visible"),
        e.show();
    var t = $("html").css("background-color");
    $("#background-branding-overlay").css("background-color", t),
        $("#background-branding-overlay").show(),
        $("#background-branding-overlay").fadeOut(500, "linear")
};

var onLoadImage = function () {
    var backgroundImage = $("#login-background-image");
    Background.background_image_ratio = isDefined(backgroundImage) && isDefined(backgroundImage[0]) && isDefined(backgroundImage[0].naturalWidth) && isDefined(backgroundImage[0].naturalHeight) && backgroundImage[0].naturalHeight != 0 ? backgroundImage[0].naturalWidth / backgroundImage[0].naturalHeight : backgroundImage.width() / backgroundImage.height();
    Background.background_image_loaded = false;
    onLoadImageHelper();
};

$(document).ready(function () {
    resize_bg();
});

var RegisterOnLoadImage = function () {
    $("#login-background-image").load(function () {
        Background.background_image_loaded = true;
        onLoadImage();
        resize_bg()
    });
    resize_bg()
};

function pageOnReady() {
    $("#login-background-image").css("width", "auto");
    $("#login-background-image").css("height", "auto");

    RegisterOnLoadImage();

    //document.body.onresize = function () {
    //    resize_bg()
    //};

    $(window).resize(function () {
        resize_bg()
    });

    $("#login-container").show();
    $("div.progress").css("visibility", "hidden");

    if (isMobile.any() !== null) {
        $('.mobile-app-links').hide();
    }
}

// check if mobile device
var isMobile = {
    Android: function () { return navigator.userAgent.match(/Android/i); },
    BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
    iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
    Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
    any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};

$(pageOnReady);