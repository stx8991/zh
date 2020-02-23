/* aui-toast */
(function( window, undefined ) {
    "use strict";
    var auiToast = function() {
        // this.create();
    };
    var isShow = false;
    auiToast.prototype = {
        create: function(params,callback) {
            var self = this;
            var toastHtml = '';
            switch (params.type) {
                case "success":
                    var iconHtml = '<i class="aui-iconfont aui-icon-correct"></i>';
                    break;
                case "fail":
                    var iconHtml = '<i class="aui-iconfont aui-icon-close"></i>';
                    break;
                case "custom":
                    var iconHtml = params.html;
                    break;
                case "loading":
                    var iconHtml = '<div class="aui-toast-loading"></div>';
                    break;
            }

            var titleHtml = params.title ? '<div class="aui-toast-content">'+params.title+'</div>' : '';
            toastHtml = '<div class="aui-toast">'+iconHtml+titleHtml+'</div>';
            if(document.querySelector(".aui-toast"))return;
            document.body.insertAdjacentHTML('beforeend', toastHtml);
            var duration = params.duration ? params.duration : "2000";
            self.show();
            if(params.type == 'loading'){
                if(callback){
                    callback({
                        status: "success"
                    });
                };
            }else{
                setTimeout(function(){
                    self.hide();
                }, duration)
            }
        },
        show: function(){
            var self = this;
            document.querySelector(".aui-toast").style.display = "block";
            document.querySelector(".aui-toast").style.marginTop =  "-"+Math.round(document.querySelector(".aui-toast").offsetHeight/2)+"px";
            if(document.querySelector(".aui-toast"))return;
        },
        hide: function(){
            var self = this;
            if(document.querySelector(".aui-toast")){
                document.querySelector(".aui-toast").parentNode.removeChild(document.querySelector(".aui-toast"));
            }
        },
        remove: function(){
            if(document.querySelector(".aui-dialog"))document.querySelector(".aui-dialog").parentNode.removeChild(document.querySelector(".aui-dialog"));
            if(document.querySelector(".aui-mask")){
                document.querySelector(".aui-mask").classList.remove("aui-mask-out");
            }
            return true;
        },
        success: function(params,callback){
            var self = this;
            params.type = "success";
            return self.create(params,callback);
        },
        fail: function(params,callback){
            var self = this;
            params.type = "fail";
            return self.create(params,callback);
        },
        custom:function(params,callback){
            var self = this;
            params.type = "custom";
            return self.create(params,callback);
        },
        loading:function(params,callback){
            var self = this;
            params.type = "loading";
            return self.create(params,callback);
        }
    };
    window.auiToast = auiToast;
})(window);
(function( window, undefined ) {
    "use strict";
    var auiDialog = function() {
    };
    var isShow = false;
    auiDialog.prototype = {
        params: {
            title:'',
            msg:'',
            buttons: ['取消','确定'],
            input:false
        },
        create: function(params,callback) {
        	var self = this;
            var dialogHtml = '';
            var buttonsHtml = '';
            var headerHtml = params.title ? '<div class="aui-dialog-header">' + params.title + '</div>' : '<div class="aui-dialog-header">' + self.params.title + '</div>';
            if(params.input){
                params.text = params.text ? params.text: '';
                var msgHtml = '<div class="aui-dialog-body"><input type="text" placeholder="'+params.text+'"></div>';
            }else{
                var msgHtml = params.msg ? '<div class="aui-dialog-body">' + params.msg + '</div>' : '<div class="aui-dialog-body">' + self.params.msg + '</div>';
            }
            var buttons = params.buttons ? params.buttons : self.params.buttons;
            if (buttons && buttons.length > 0) {
                for (var i = 0; i < buttons.length; i++) {
                    buttonsHtml += '<div class="aui-dialog-btn" tapmode button-index="'+i+'">'+buttons[i]+'</div>';
                }
            }
            var footerHtml = '<div class="aui-dialog-footer">'+buttonsHtml+'</div>';
            dialogHtml = '<div class="aui-dialog">'+headerHtml+msgHtml+footerHtml+'</div>';
            document.body.insertAdjacentHTML('beforeend', dialogHtml);
            // listen buttons click
            var dialogButtons = document.querySelectorAll(".aui-dialog-btn");
            if(dialogButtons && dialogButtons.length > 0){
                for(var ii = 0; ii < dialogButtons.length; ii++){
                    dialogButtons[ii].onclick = function(){
                        if(callback){
                            if(params.input){
                                callback({
                                    buttonIndex: parseInt(this.getAttribute("button-index"))+1,
                                    text: document.querySelector("input").value
                                });
                            }else{
                                callback({
                                    buttonIndex: parseInt(this.getAttribute("button-index"))+1
                                });
                            }
                        };
                        self.close();
                        return;
                    }
                }
            }
            self.open();
        },
        open: function(){
            if(!document.querySelector(".aui-dialog"))return;
            var self = this;
            document.querySelector(".aui-dialog").style.marginTop =  "-"+Math.round(document.querySelector(".aui-dialog").offsetHeight/5)+"px";
            if(!document.querySelector(".aui-mask")){
                var maskHtml = '<div class="aui-mask"></div>';
                document.body.insertAdjacentHTML('beforeend', maskHtml);
            }
            // document.querySelector(".aui-dialog").style.display = "block";
            setTimeout(function(){
                document.querySelector(".aui-dialog").classList.add("aui-dialog-in");
                document.querySelector(".aui-mask").classList.add("aui-mask-in");
                document.querySelector(".aui-dialog").classList.add("aui-dialog-in");
            }, 10)
            document.querySelector(".aui-mask").addEventListener("touchmove", function(e){
                e.preventDefault();
            })
            document.querySelector(".aui-dialog").addEventListener("touchmove", function(e){
                e.preventDefault();
            })
            return;
        },
        close: function(){
            var self = this;
            document.querySelector(".aui-mask").classList.remove("aui-mask-in");
            document.querySelector(".aui-dialog").classList.remove("aui-dialog-in");
            document.querySelector(".aui-dialog").classList.add("aui-dialog-out");
            if (document.querySelector(".aui-dialog:not(.aui-dialog-out)")) {
                setTimeout(function(){
                    if(document.querySelector(".aui-dialog"))document.querySelector(".aui-dialog").parentNode.removeChild(document.querySelector(".aui-dialog"));
                    self.open();
                    return true;
                },200)
            }else{
                document.querySelector(".aui-mask").classList.add("aui-mask-out");
                document.querySelector(".aui-dialog").addEventListener("webkitTransitionEnd", function(){
                    self.remove();
                })
                document.querySelector(".aui-dialog").addEventListener("transitionend", function(){
                    self.remove();
                })
            }
        },
        remove: function(){
            if(document.querySelector(".aui-dialog"))document.querySelector(".aui-dialog").parentNode.removeChild(document.querySelector(".aui-dialog"));
            if(document.querySelector(".aui-mask")){
                document.querySelector(".aui-mask").classList.remove("aui-mask-out");
            }
            return true;
        },
        alert: function(params,callback){
        	var self = this;
            return self.create(params,callback);
        },
        prompt:function(params,callback){
            var self = this;
            params.input = true;
            return self.create(params,callback);
        }
    };
	window.auiDialog = auiDialog;
})(window);


/* aui-pull-refresh */
(function(window) {
	'use strict';
	/**
	 * Extend obj function
	 *
	 * This is an object extender function. It allows us to extend an object
	 * by passing in additional variables and overwriting the defaults.
	 */
	var auiPullToRefresh = function (params,callback) {
		this.extend(this.params, params);
		this._init(callback);
	}
	var touchYDelta;
	var isLoading = false;
	var docElem = window.document.documentElement,
		loadWrapH,
		win = {width: window.innerWidth, height: window.innerHeight},
		winfactor= 0.2,
		translateVal,
		isMoved = false,
		firstTouchY, initialScroll;
	auiPullToRefresh.prototype = {
		params: {
            container: document.querySelector('.aui-refresh-content'),
			friction: 2.5,
			triggerDistance: 100,
			callback:false
        },
        _init : function(callback) {
			var self = this;
			var loadingHtml = '<div class="aui-refresh-load"><div class="aui-refresh-pull-arrow"></div></div>';
			self.params.container.insertAdjacentHTML('afterbegin', loadingHtml);
			self.params.container.addEventListener('touchstart', function(ev){
				self.touchStart(ev)
			});
			self.params.container.addEventListener('touchmove', function(ev){
				self.touchMove(ev)
			});
			self.params.container.addEventListener('touchend', function(ev){
				self.touchEnd(ev,callback);
			});
		},
		touchStart : function(ev) {
			// this.params.container.classList.remove("refreshing");
			if (isLoading) {
				return;
			}
			isMoved = false;
			this.params.container.style.webkitTransitionDuration =
		    this.params.container.style.transitionDuration = '0ms';
			touchYDelta = '';
			var touchobj = ev.changedTouches[0];
			// register first touch "y"
			firstTouchY = parseInt(touchobj.clientY);
			initialScroll = this.scrollY();
		},
		touchMove : function (ev) {
			if (isLoading) {
				ev.preventDefault();
				return;
			}
			var self = this;
			var moving = function() {
				var touchobj = ev.changedTouches[0], // reference first touch point for this event
					touchY = parseInt(touchobj.clientY);
					touchYDelta = touchY - firstTouchY;
				if ( self.scrollY() === 0 && touchYDelta > 0  ) {
					ev.preventDefault();
				}
				if ( initialScroll > 0 || self.scrollY() > 0 || self.scrollY() === 0 && touchYDelta < 0 ) {
					firstTouchY = touchY;
					return;
				}
				translateVal = Math.pow(touchYDelta, 0.85);
				self.params.container.style.webkitTransform = self.params.container.style.transform = 'translate3d(0, ' + translateVal + 'px, 0)';
				isMoved = true;
				if(touchYDelta > self.params.triggerDistance){
					self.params.container.classList.add("aui-refresh-pull-up");
					self.params.container.classList.remove("aui-refresh-pull-down");
				}else{
					self.params.container.classList.add("aui-refresh-pull-down");
					self.params.container.classList.remove("aui-refresh-pull-up");
				}
			};
			this.throttle(moving(), 20);
		},
		touchEnd : function (ev,callback) {
			var self =this;
			if (isLoading|| !isMoved) {
				isMoved = false;
				return;
			}
			// 根据下拉高度判断是否加载
			if( touchYDelta >= this.params.triggerDistance) {
				isLoading = true; //正在加载中
				ev.preventDefault();
				this.params.container.style.webkitTransitionDuration =
		    	this.params.container.style.transitionDuration = '300ms';
				this.params.container.style.webkitTransform =
				this.params.container.style.transform = 'translate3d(0,2.4rem,0)';
				document.querySelector(".aui-refresh-pull-arrow").style.webkitTransitionDuration =
		    	document.querySelector(".aui-refresh-pull-arrow").style.transitionDuration = '0ms';
				self.params.container.classList.add("aui-refreshing");
				if(callback){
					callback({
						status:"success"
					});
				}
			}else{
				this.params.container.style.webkitTransitionDuration =
		    	this.params.container.style.transitionDuration = '300ms';
				this.params.container.style.webkitTransform =
				this.params.container.style.transform = 'translate3d(0,0,0)';
				if(callback){
					callback({
						status:"fail"
					});
				}
			}
			isMoved = false;
			return;
		},
		cancelLoading : function () {
			var self =this;
			isLoading = false;
			self.params.container.classList.remove("aui-refreshing");
			document.querySelector(".aui-refresh-pull-arrow").style.webkitTransitionDuration =
		    	document.querySelector(".aui-refresh-pull-arrow").style.transitionDuration = '300ms';
			this.params.container.style.webkitTransitionDuration =
		    	this.params.container.style.transitionDuration = '0ms';
			self.params.container.style.webkitTransform =
			self.params.container.style.transform = 'translate3d(0,0,0)';
			self.params.container.classList.remove("aui-refresh-pull-up");
			self.params.container.classList.add("aui-refresh-pull-down");
			return;
		},
		scrollY : function() {
			return window.pageYOffset || docElem.scrollTop;
		},
		throttle : function(fn, delay) {
			var allowSample = true;
			return function(e) {
				if (allowSample) {
					allowSample = false;
					setTimeout(function() { allowSample = true; }, delay);
					fn(e);
				}
			};
		},
		winresize : function () {
			var resize = function() {
				win = {width: window.innerWidth, height: window.innerHeight};
			};
			throttle(resize(), 10);
		},
		extend: function(a, b) {
			for (var key in b) {
			  	if (b.hasOwnProperty(key)) {
			  		a[key] = b[key];
			  	}
		  	}
		  	return a;
		 }
	}
	window.auiPullToRefresh = auiPullToRefresh;

})(window);
$(function() {
		//ua判断跳转
		var ua = navigator.userAgent.toLowerCase();
		//图片预加载
		$(".lazy").lazyload({ 
	　　　　effect : "fadeIn",
	　　　　threshold : 180
		}); 
		//幻灯片
		var ibannerswiper = new Swiper('#ibanner', {
			autoplay: {
			delay: 3500,
			stopOnLastSlide: false,
			disableOnInteraction: false,
		},
		speed: 1000,
		loop: true,
		centeredSlides: true,
		pagination: {
			el: '.swiper-pagination',
		  },
		navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
		},
		});	
		//返回顶部按钮注入
		var backtophtml='<div class="goback"><i class="iconfont icon-fold"></i></div>';
		$('body').append(backtophtml);
		$(window).on("scroll", function() {
			var t = $(this).scrollTop();
			t > 200 ? $(".goback").addClass("cur") : $(".goback").removeClass("cur")
		}), $(document).on("click", ".goback", function() {
		$("body,html").animate({
			scrollTop:0
		}, 1000);
		});	
		//下拉刷新
		var pullRefresh = new auiPullToRefresh({
			container: document.querySelector('.channel'),
			triggerDistance: 100
		},function(ret){
			if(ret.status=="success"){
				setTimeout(function(){
					var wrap = document.getElementById("refresh")
					 window.location.href = "http://" + window.location.host + window.location.pathname + '?v=' + new Date().getTime(); 
					pullRefresh.cancelLoading(); //刷新成功后调用此方法隐藏
				},1500)
			}
		})			
		//关闭TIPS
		$(".icon-close").on("click",(function() {
			$("#tips").hide();
		}));				
		//换一批
		$(document).on("click",".btn_refresh",function(){
			var listT = $(this).parent().parent().find(".unhidden").attr("data-list-t")
			var listId = parseInt($(this).parent().parent().find(".unhidden").attr("data-listId"));
			$(this).parent().parent().find(".unhidden").removeClass("unhidden");
			if(listId==2){
				$("#"+listT+"1").addClass("unhidden");
			}else{
				$("#"+listT+(listId+1)).addClass("unhidden");
			}
		});		  
		//详情下拉
		$("._js_detail_area").on("click", function() {
			if ($(".detail-intro-txt").hasClass('ellipsis-2')) {
				$(".detail-intro-txt").removeClass("ellipsis-2");
				$("._js_detail_area i").removeClass("icon-unfold").addClass("icon-fold");
			} else {
				$(".detail-intro-txt").addClass("ellipsis-2");
				$("._js_detail_area i").removeClass("icon-fold").addClass("icon-unfold");
			}
		});	
	
		// movie_tab
		var thisIndex;
		$('.numBox .hd ul').find('li').each(function(index, d) {
			if ($(d).attr('class') == "active") {
				thisIndex = index;
			} else {
				$(d).removeClass("active");
			}
		});
		var listSwiper = new Swiper('#tabs-container',{
			autoplay:false,
			speed:500,
			initialSlide:thisIndex,
			on: {
				slideChangeTransitionStart: function(){
				$(".numBox .hd .active").removeClass('active');
				$(".numBox .hd li").eq(this.activeIndex).addClass('active');			  
				},
			},

		});
		$(".numBox .hd li").on('click',function(e){
			e.preventDefault()
			$(".numBox .hd .active").removeClass('active')
			$(this).addClass('active')
			listSwiper.slideTo($(this).index())
		});	
		//分享提示
		if (ua.match(/MicroMessenger/i)=='micromessenger'){
			$sharemask=$('<div class="share-mask"><p>点击此处分享</p></div>');
			$('.video-share').click(function(e){
				$('body').append($sharemask);
				document.body.style.overflow='hidden';
				document.addEventListener("touchmove",function(e){e.preventDefault()},false);
				$(document).one("click", function(){
					   $sharemask.remove();
						document.body.style.overflow='';//出现滚动条
						document.removeEventListener("touchmove",function(e){e.preventDefault()},false);					   
					});	
				e.stopPropagation();			
			});
		}else{
			$('.video-share').click(function(e){
			showDefault('wapshare');
			});
		}
});
/* 提示框 */
var toast = new auiToast({
    })
function showDefault(type){
	switch (type) {
		case "loading":
			toast.loading({
				title:"加载中",
				duration:2000
			},function(ret){
				console.log(ret);
				setTimeout(function(){
					toast.hide();
				}, 3000)
			});
		case "wapshare":
			toast.custom({
				title:"请用浏览器按钮分享",
				html:'提示',
				duration:2000
			});
			break;			
	}
};
