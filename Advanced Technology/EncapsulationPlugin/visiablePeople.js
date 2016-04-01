;(function ($,window,document,undefined) {

    //定义visiablePeople构造函数
    var VisiablePeople = function (ele,opt) {
        this.$element = ele,
        this.defaults = {
            current_item: 1,  // which item is showing
            piechart_num: 0,
            hexagon_num: 0
        },
        this.options = $.extend({},this.defaults,opt)
    }

    //定义some methods
    VisiablePeople.prototype = {
        mainScroll: function () {
            $(".nav-button").click(function () {
                var obj = $(this).attr("id").split("_")[2];
                mainScroll_turnPage(obj);
            });

            $(".button-next").click(function () {
                var obj = parseInt($(this).attr("id").split("_")[1]) + 1;
                mainScroll_turnPage(obj);
            });
        },

        // The actions when turn to different page.
        mainScroll_turnPage : function (obj) {
            $.scrollTo($("#page_" + obj), 200, { offset: -50 });
            $("#nav_pc_" + obj).addClass("current").siblings(".nav-pc li").removeClass("current");
            $("#nav_mobile_" + obj).addClass("current").siblings(".nav-button").removeClass("current");
        },

        //The progress function on page 1.
        progressBar : function () {
            $("#progressbar_full .progress-bar-croll").animate({
                left: 0
            }, 3000);

            $("#progressbar_one .progress-bar-croll").animate({
                left: "-194px"
            }, 2000);
        },

        //Toggle Duration and Salary Range in form.
        form_logic : function () {
            $("input[name='position_type']").click(function () {
                var checked_val = $(this).val();

                if (checked_val == "1") {
                    $("#duration").css("display", "none");
                    $("#salary_range").css("display", "block");
                } else if (checked_val == "2") {
                    $("#salary_range").css("display", "none");
                    $("#duration").css("display", "block");
                }
            });
        },

        piechart_logic : function () {
            $(".piechart-action").mouseover(function () {
                var obj = $(this).attr("id").split("_")[1];
                piechart_turnPart(obj);
            });

            $(".piechart-action").mouseout(function () {
                if (defaults.piechart_num == "0") {
                    $(".piechart-item-lg").css("display", "none");
                    $(".piechart-item").css("display", "block");
                    $(".piechart-text").css("font-weight", "normal");
                    $(".pie-type").css("width", "28px");
                } else {
                    piechart_turnPart(defaults.piechart_num);
                }
            });

            $(".piechart-action").click(function () {
                defaults.piechart_num = $(this).attr("id").split("_")[1];
                piechart_turnPart(defaults.piechart_num);
            });
        },

        // The actions when turn to different part on piechart.
        piechart_turnPart : function (obj) {
            $("#piechart_" + obj + "_lg").css("display", "block").siblings(".piechart-item-lg").css("display", "none");
            $("#piechart_" + obj).css("display", "none").siblings(".piechart-item").css("display", "block");
            $(".piechart-text").css("font-weight", "normal");
            $(".pie-type").css("width", "28px");
            $("#piechart_text" + obj + " .piechart-text").css("font-weight", "bold");
            $("#piechart_text" + obj + " .pie-type").css("width", "35px");
        },

        hexagon_logic : function () {
            $(".hexagon-action").mouseover(function () {
                var obj = $(this).attr("id").split("_")[1];
                $("#hexagon_" + obj).css("fill", "transparent").siblings(".hexagon-item").css("fill", "#fff");
            });

            $(".hexagon-action").mouseout(function () {
                $("#hexagon_" + defaults.hexagon_num).css("fill", "transparent").siblings(".hexagon-item").css("fill", "#fff");
            });

            $(".hexagon-action").click(function () {
                defaults.hexagon_num = $(this).attr("id").split("_")[1];
                $("#hexagon_" + defaults.hexagon_num).css("fill", "transparent").siblings(".hexagon-item").css("fill", "#fff");
            });
        }

    }

    $.fn.visiblePeople = function (options) {

        //创建VisiblePeople的实体
        var visiblePeople = new VisiablePeople(this,options);

        return this.each(function () {
            //show and hide navigation when click menu icon on mobile modle.
            $("#menu_icon").click(function () {
                $("#nav_mobile").toggle();
            });

            visiblePeople.progressBar();
            visiblePeople.form_logic();
            visiblePeople.piechart_logic();
            visiblePeople.hexagon_logic();
        });
    }

})(jQuery,window,document)