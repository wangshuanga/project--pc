// author lianghongna 20170919
var tools = {
    swiperbanner: function (bansel, mobsel, obj) {
        var banner = obj.bannerpic;
        var bannermax = new Array();
        var mobilemax = new Array();
        for (var i in banner) {
            bannermax.push(banner[i]);
        }
        var bannerAll = bannermax.concat(bannermax);
        var mobileAll = mobilemax.concat(mobilemax);
        var bannerWidth = $(bansel).width();
        var mobileWidth = $(mobsel).width();
        var pos = bannermax.length;

        // 结构渲染
        var mobilehtml = '<div class="mobile-wrap" style=margin-left:-' + mobileWidth * pos + 'px><ul class="mobile-pic">';
        for (var mob in mobileAll) {
            mobilehtml += '<li><img src="' + mobileAll[mob] + '"/></li>'
        }
        mobilehtml += '</ul></div>'

        var swiperhtml = '<div class="banner-wrap" style=margin-left:-' + bannerWidth * pos + 'px><ul class="banner-list">';
        for (var num in bannerAll) {
            swiperhtml += '<li style="background:url(' + bannerAll[num] + ') no-repeat center center;"></li>'
        }
        swiperhtml += "</ul></div>";

        $(bansel).append(swiperhtml);
        $(mobsel).append(mobilehtml);

        // 轮播布局
        var liLength = $(bansel).find(".banner-list li").length;

        $(bansel).find(".banner-list li").width(bannerWidth);
        $(bansel).find(".banner-list").width(bannerWidth * liLength);
        $(bansel).find(".banner-wrap").width(bannerWidth * liLength);

        $(mobsel).find(".mobile-wrap").width(mobileWidth * liLength);
        $(mobsel).find(".mobile-pic").width(mobileWidth * liLength);

        var clock = true;

        function prve() {
            if (!clock) {
                return;
            }
            clock = false;
            // 轮播图
            $(bansel).find(".banner-list").animate({"marginLeft": "+=" + bannerWidth}, 500, function () {
                var changeLi = $(bansel).find(".banner-list li").eq(liLength - 1).remove();
                $(bansel).find(".banner-list").prepend(changeLi);
                $(bansel).find(".banner-list").css({"margin-left": "0"});

                // nav
                var changeNav = $(bansel).find(".navlist li").eq(0).remove();
                $(bansel).find(".navlist").append(changeNav);

                // mobile
                $(mobsel).find(".mobile-pic").animate({"marginLeft": "+=" + mobileWidth}, 100, function () {
                    var changeLim = $(mobsel).find(".mobile-pic li").eq(liLength - 1).remove();
                    $(mobsel).find(".mobile-pic").prepend(changeLim);
                    $(mobsel).find(".mobile-pic").css({"margin-left": "0"});
                    clock = true;
                })
            });

        }

        // 上一个
        $(".btn-prve").on("click", function () {
            prve();
        })

        function next() {
            if (!clock) {
                return;
            }
            clock = false;
            // 轮播图
            $(bansel).find(".banner-list").animate({"marginLeft": "-=" + bannerWidth}, 500, function () {
                var changeLi = $(bansel).find(".banner-list li").eq(0).remove();
                $(bansel).find(".banner-list").append(changeLi);
                $(bansel).find(".banner-list").css({"margin-left": "0"})

                // nav
                var changeNav = $(bansel).find(".navlist li").eq(bannermax.length - 1).remove();
                $(bansel).find(".navlist").prepend(changeNav);

                // mobile
                $(mobsel).find(".mobile-pic").animate({"marginLeft": "-=" + mobileWidth}, 100, function () {
                    var changeLim = $(mobsel).find(".mobile-pic li").eq(0).remove();
                    $(mobsel).find(".mobile-pic").append(changeLim);
                    $(mobsel).find(".mobile-pic").css({"margin-left": "0"});
                    clock = true;
                })
            });

        }

        // 下一个
        $(".btn-next").on("click", function () {
            next();
        })

        var picTimer = "";
        var picTimer = setInterval(next, 3000);
        $(".btn-page").hover(function () {
            clearInterval(picTimer)
        }, function () {
            picTimer = setInterval(next, 3000);
        })
    }
}
