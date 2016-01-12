var modules = [];
var dependencies = [];
var app = angular.module("AdGenerator", dependencies.concat(modules));


// //////
// Studio
// //////
app.controller("StudioGeneratorCtrl", ['$scope', '$timeout', function($scope, $timeout) {
    
    console.log("GumGum Studio Unit Generator");
    
    $scope.setDefaults = function(){
        $scope.pastedBackgroundPath = "";
        $scope.markupGenerated = false;
        $scope.direction = "left";
        $scope.studioAlign = "left";
        $scope.alignOffset = "0px";
        $scope.centerOffset = "";
        $scope.spritePrefixDisp = "name";
    }
    $scope.setDefaults();
    
    $scope.setAlignment = function(){
        if ($scope.studioAlign === "left"){
            $scope.direction = "left";
            $scope.alignOffset = "0px";
            $scope.centerOffset = "";
        } else if ($scope.studioAlign === "center") {
            $scope.direction = "left";
            $scope.alignOffset = "50%";
            $scope.centerOffset = "c.style.marginLeft=-(s/2)+\"px\";im.style.marginLeft=-(s/2)+\"px\";";
        } else if ($scope.studioAlign === "right"){
            $scope.direction = "right";
            $scope.alignOffset = "0px";
            $scope.centerOffset = "";
        }
    }
    
    $scope.formatPathInput = function(){
        // Formatted background tile path // TO DO: Support multiple URL structures such as http://d1u2cbczpt82kt.cloudfront.net/ads/com... //
        var awsPattern = "http://gumgum-content.s3.amazonaws.com";
        var awsString = $scope.pastedBackgroundPath.replace(awsPattern, "//c.gumgum.com");
        $scope.formBgPath = awsString;
        // Sprite name prefix
        var spritePrefixArray = $scope.pastedBackgroundPath.match(/\/([^\/]*)\_tile/i);
        $scope.spritePrefix = spritePrefixArray[1];
        $scope.spritePrefixDisp = $scope.spritePrefix;
        // Path prefix
        $scope.pathPrefix = $scope.formBgPath.substr(0, $scope.formBgPath.length-$scope.spritePrefix.length-9);
        // Autodetect sprite height
        $scope.spriteUrl = $scope.pathPrefix + $scope.spritePrefix + "_600.png";
        $scope.detectHeight = function(url){   
            var img = new Image();
            img.addEventListener("load", function(){
                $scope.unitHeight = this.naturalHeight / 2;
            });
            img.src = url;
        }
        $scope.detectHeight($scope.spriteUrl);
        // Assemble markup
        $scope.escAssembledStudioMarkup = "<div id=\"mGGUID\" align=\""+$scope.direction+"\" style=\"text-align:"+$scope.direction+";height:"+$scope.unitHeight+"px;position:relative;font:normal 0/117px arial;border:none;padding:0;margin:0px;overflow:hidden;font:normal 0/"+$scope.unitHeight+"px arial; cursor:pointer;background:none transparent;padding-top:0px;box-sizing:content-box;-moz-box-sizing:content-box;\"><div align=\""+$scope.direction+"\" id=\"adGGUID\" style=\"text-align:"+$scope.direction+";height:100%;position:relative;overflow:hidden;margin:0px 0px 0px 0px;font:normal 0/"+$scope.unitHeight+"px arial;cursor:pointer;\"><br style=\"display:none;\" /><style>#adGGUID, #adGGUID * {padding:0;margin:0;border:none;font:normal 0/117px arial;cursor:pointer}#hoGGUID {background:transparent url('//c.gumgum.com/ads/com/gumgum/bg/trans.gif') no-repeat scroll 0 0;position:absolute; width: 100%; height: 100%; "+$scope.direction+": 0px; top: 0px;}#hoGGUID:hover {cursor:pointer;}#bgGGUID {height: 100%;margin-"+$scope.direction+": 0px;background: url('" + $scope.formBgPath + "') repeat-x scroll 0px 0px;}#imGGUID {position:absolute;top:0px;"+$scope.direction+":"+$scope.alignOffset+";}#coGGUID {background-repeat:no-repeat; background-position: bottom "+$scope.direction+"; display:none;position:absolute;width: 100%; height: 100%; "+$scope.direction+": "+$scope.alignOffset+"; top: 0px;}</style><img id=\"imGGUID\" src=\"//c.gumgum.com/images/pixel.gif?GGUID\" onload='(function(e,m){var c = document.getElementById(\"coGGUID\");var im = document.getElementById(\"imGGUID\");var t = document.getElementById(\"mGGUID\");var na = 250; var no = 400; var s = 600;if([assetWidth] < 600)(s = no);if([assetWidth] < 400)(s = na);var u = m + \"" + $scope.spritePrefix + "_\"+s+\".png\";c.style.background=\"url(\"+u+\") no-repeat scroll bottom "+$scope.direction+"\";"+$scope.centerOffset+"e.src=u;e.onload=false;return false})(this,\"" + $scope.pathPrefix + "\")' /><div id=\"coGGUID\"></div><div id=\"bgGGUID\" style=\"margin-"+$scope.direction+":0px;\"></div><a id=\"hoGGUID\" onmouseover=\"document.getElementById('coGGUID').style.display='block';\" onmouseout=\"document.getElementById('coGGUID').style.display='none';\"></a></div><!--begintags--><!--endtags--></div>";
        $scope.formattedStudioMarkup = $scope.escAssembledStudioMarkup.replace(/\\"/g, '"');
    }
    
    $scope.generateStudioMarkup = function(){
        $scope.detectHeight($scope.spriteUrl);
        $scope.formatPathInput();
        $scope.markupGenerated = true;
        $timeout(function(){$("textarea").select();},100);
    }
    
    $scope.resetForm = function(){
        $scope.setDefaults();
        $timeout(function(){$("input").focus();},100);
    }
}]);


// //////////////
// Studio 728x 90
// //////////////
app.controller("Studio728GeneratorCtrl", ['$scope', '$timeout', function($scope, $timeout) {
    
    console.log("GumGum Studio 728x90 Unit Generator");
    
    $scope.setDefaults = function(){
        $scope.pastedBackgroundPath = "";
        $scope.markupGenerated = false;
        $scope.spritePrefixDisp = "name";
    }
    $scope.setDefaults();
    
    $scope.formatPathInput = function(){
        // Formatted background tile path // TO DO: Support multiple URL structures such as http://d1u2cbczpt82kt.cloudfront.net/ads/com... //
        var awsPattern = "http://gumgum-content.s3.amazonaws.com";
        var awsString = $scope.pastedBackgroundPath.replace(awsPattern, "//c.gumgum.com");
        $scope.formBgPath = awsString;
        // Sprite name prefix
        var spritePrefixArray = $scope.pastedBackgroundPath.match(/\/([^\/]*)\_tile/i);
        $scope.spritePrefix = spritePrefixArray[1];
        $scope.spritePrefixDisp = $scope.spritePrefix;
        // Path prefix
        $scope.pathPrefix = $scope.formBgPath.substr(0, $scope.formBgPath.length-$scope.spritePrefix.length-9);
        // Assemble markup
        $scope.escAssembledStudio728Markup = "<div ggnoclick id=\"mGGUID\" align=\"left\" style=\"text-align:left;height:90px;position:relative;font:normal 0/90px arial;border:none;padding:0;margin:0;overflow:visible !important;font:normal 0/90px arial; cursor:pointer; background: none transparent;padding-top:0;box-sizing:content-box;-moz-box-sizing:content-box;\"><div align=\"left\" id=\"adGGUID\" style=\"text-align:left;height:100%;position:relative;overflow:hidden;margin:0px 0px 0px 0px;font:normal 0/120px arial; cursor:default;\"><br style=\"display:none;\" /><style>#imGGUID, #coGGUID, #bgGGUID {-moz-transform-origin: center center; -webkit-transform-origin: center center; -o-transform-origin: center center; -ms-transform-origin: center center; transform-origin: center center;} #hoGGUID {-moz-transform-origin: center bottom; -webkit-transform-origin: center bottom; -o-transform-origin: center bottom; -ms-transform-origin: center bottom; transform-origin: center bottom;} #adGGUID, #adGGUID * {padding:0;margin:0;border:none;font:normal 0/90px arial;cursor:pointer;max-width:none !important;} #hoGGUID {background:transparent url('//c.gumgum.com/ads/com/gumgum/bg/trans.gif') no-repeat scroll 0 0;position:absolute; width: 100%; height: 100%; left: 0px; top: 0px; cursor: pointer;} #hoGGUID:hover {cursor:pointer;} #bgGGUID {width: 100%; height: 100%;margin-left: 0px;background: url('" + $scope.formBgPath + "') repeat-x scroll 0px 0px;} #imGGUID {position:absolute;top:0px;left:0px;width:728px;height:180px;} #coGGUID {background-image: url('" + $scope.pathPrefix + $scope.spritePrefix + "_728.png'); background-repeat:no-repeat; background-position: 0px -90px; display:none;position:absolute;width: 728px; height: 178px; left: 0px; top: 0px;overflow: hidden;}</style><img id=\"imGGUID\" src=\"//c.gumgum.com/images/pixel.gif?GGUID\" onload='(function(e){var c = document.getElementById(\"coGGUID\"); var ho = document.getElementById(\"hoGGUID\"); var im = document.getElementById(\"imGGUID\"); var bg = document.getElementById(\"bgGGUID\"); var t = document.getElementById(\"mGGUID\"); var ggc = parent.document.getElementById(\"GGUID_CLOSE\"); var gga = parent.document.getElementById(\"GGUID_ATTRIBUTION\"); var u = \"" + $scope.pathPrefix + $scope.spritePrefix + "_728.png\"; if ([assetWidth] < 728) { ho.style.width = 728 + \"px\"; ho.style.top = \"auto\"; ho.style.bottom = 0; var buttonOffset = 1; var ratio = [assetWidth] / 728; var closeButtonRatio = ((728 - [assetWidth]) / 16) + 1; var attrButtonRatio = ((728 - [assetWidth]) / 16) + 4; ggc.style.top = closeButtonRatio + \"px\"; gga.style.top = attrButtonRatio + \"px\"; var offset = -((728 - [assetWidth]) / 2) + \"px\"; var css = \"#mGGUID .scaled {backface-visibility: hidden; -webkit-filter: blur(0px); -moz-transform: scale(\"+ratio+\"); -webkit-transform: scale(\"+ratio+\"); -o-transform: scale(\"+ratio+\"); -ms-transform: scale(\"+ratio+\"); transform: scale(\"+ratio+\"); margin-left: \"+offset+\";}\"; var style = document.createElement(\"style\"); style.type = \"text/css\"; style.appendChild(document.createTextNode(css)); t.appendChild(style); c.className += \"scaled\"; im.className += \"scaled\"; ho.className += \"scaled\"; bg.style.display = \"none\"; } e.src=u; e.onload=false;return false})(this)' /><div id=\"coGGUID\"></div><div id=\"bgGGUID\" style=\"margin-left:0;\"></div><a id=\"hoGGUID\" onclick=\"window.open('[clickUrl]')\" onmouseover=\"document.getElementById('coGGUID').style.display='block';\" onmouseout=\"document.getElementById('coGGUID').style.display='none';\"></a></div><!--begintags--><!--endtags--></div>";
        $scope.formattedStudio728Markup = $scope.escAssembledStudio728Markup.replace(/\\"/g, '"');
    }
    
    $scope.generateStudio728Markup = function(){
        $scope.formatPathInput();
        $scope.markupGenerated = true;
        $timeout(function(){$("textarea").select();},100);
    }
    
    $scope.resetForm = function(){
        $scope.setDefaults();
        $timeout(function(){$("input").focus();},100);
    }
}]);


// //////
// Runway
// //////
app.controller("RunwayGeneratorCtrl", ['$scope', '$timeout', function($scope, $timeout) {
    
    console.log("GumGum Runway Unit Generator");
    
    $scope.setDefaults = function(){
        $scope.pastedDirectoryPath = "";
        $scope.runwayType = "three";
        $scope.markupGenerated = false;
    }
    $scope.setDefaults();
    
    $scope.formatPathInput = function(){
        var awsPattern = "http://gumgum-content.s3.amazonaws.com";
        var awsString = $scope.pastedDirectoryPath.replace(awsPattern, "//c.gumgum.com");
        $scope.formDirPath = awsString;
        if ($scope.runwayType === "three"){ // Template if there are three separate Hype files
            $scope.escAssembledRunwayMarkup = "<div ggnoclick style=\"_CLEARCSS_;cursor:pointer;overflow:hidden;height:120px\"><br style=\"display:none;\" /><style>.HYPE_scene{background-color:transparent !important;cursor: default;}</style><img id=\"imGGUID\" src=\"//c.gumgum.com/images/pixel.gif?GGUID\" onload='(function(e,m,n){ c = document.querySelectorAll(\".hype_container\")[0];var script = document.createElement(\"script\");script.type = \"text/javascript\";s = 600;if ([assetWidth] < 600) (s = 400);if ([assetWidth] < 400) (s = 250);u = m + s + \"_hype_container\";k = n + s + \".hyperesources/\" + m + s + \"_hype_generated_script.js?[timestamp]\";c.id = u;script.src = k;c.appendChild(script);e.onload = false;return false})(this,\"runway\",\""+$scope.formDirPath+"runway\")' /><div class=\"hype_container\" id=\"\" style=\"overflow:hidden;width:100%;height:100%;margin-top:-12px;\"></div><!--begintags--><!--endtags--><script>function openAd(){(window.GUMGUM||parent.GUMGUM)['GGUID'].openAd();}</script></div>";
        } else if ($scope.runwayType === "one") { // Template if there is only one Hype file
            $scope.escAssembledRunwayMarkup = "<div ggnoclick style=\"_CLEARCSS_;cursor:pointer;overflow:hidden;height:120px;\"><br style=\"display:none;\" /><style>.HYPE_scene{background-color:transparent !important;cursor: default;}</style><img id=\"imGGUID\" src=\"//c.gumgum.com/images/pixel.gif?GGUID\" onload='(function(e,m,n){c = document.querySelectorAll(\".hype_container\")[0];var script = document.createElement(\"script\");script.type = \"text/javascript\";u = m + \"_hype_container\";k = n + \"?[timestamp]\";c.id = u;script.src = k;c.appendChild(script);e.onload = false;return false})(this,\"runway\",\""+$scope.formDirPath+"runway.hyperesources/runway_hype_generated_script.js\")' /><div class=\"hype_container\" id=\"\" style=\"overflow:hidden;width:100%;height:100%;margin-top:-12px;\"></div><!--begintags--><!--endtags--><script>function openAd(){(window.GUMGUM||parent.GUMGUM)['GGUID'].openAd();}</script></div>";
        }
        $scope.formattedRunwayMarkup = $scope.escAssembledRunwayMarkup.replace(/\\"/g, '"');
    }
    
    $scope.generateRunwayMarkup = function(){
        $scope.formatPathInput();
        $scope.markupGenerated = true;
        $timeout(function(){$("textarea").select();},100);
    }
    
    $scope.resetForm = function(){
        $scope.setDefaults();
        $timeout(function(){$("input").focus();},100);
    }
}]);


// /////////
// In-Screen
// /////////
app.controller("InScreenGeneratorCtrl", ['$scope', '$timeout', function($scope, $timeout) {
    
    console.log("GumGum In-Screen Unit Generator");
    
    $scope.setDefaults = function(){
        $scope.pastedDirectoryPath = "";
        $scope.buttonShade = "dark";
        $scope.markupGenerated = false;
    }
    $scope.setDefaults();
    
    $scope.formatPathInput = function(){
        var awsPattern = "http://gumgum-content.s3.amazonaws.com";
        var awsString = $scope.pastedDirectoryPath.replace(awsPattern, "//c.gumgum.com");
        $scope.formDirPath = awsString;
        
        if ($scope.buttonShade === "light"){
            $scope.color = "_dark";
        } else {
            $scope.color = "";
        }
        
        $scope.escAssembledInScreenMarkup = "<div ggnoclick id=\"mGGUID\" style=\"_CLEARCSS_;height:100px;cursor:pointer;\"><br style=\"display:none;\" /><style>#mGGUID .button_info, #mGGUID .button_collapse {width: 22px;height: 50px;cursor:pointer;-moz-transition: none !important;-webkit-transition: none !important;-o-transition: color 0 ease-in !important;transition: none !important;z-index:3;}#mGGUID .button_info{position: absolute;bottom: 0;right: 22px;background: center top no-repeat url('//c.gumgum.com/ads/com/gumgum/sprites/is_buttons/00bt_info"+$scope.color+".png');}#mGGUID .button_collapse{position: absolute;bottom: 0;right: 0px;background: center top no-repeat url('//c.gumgum.com/ads/com/gumgum/sprites/is_buttons/00bt_close"+$scope.color+".png');}#mGGUID .button_info:hover {background-position:0 -51px;}#mGGUID .button_collapse:hover {background-position:0 -50px;}@media (max-width:600px){#mGGUID .button_info {display: none;}}</style><span class=\"button_info\" onclick=\"(top.GUMGUM||window.GUMGUM)['GGUID'].showInfo()\"></span><span class=\"button_collapse\" onclick=\"(top.GUMGUM||window.GUMGUM)['GGUID'].closeAd();\"></span><!--iframe--><style>.HYPE_scene {background: transparent !important;}.HYPE_element {cursor: default;}</style><div id=\"GGUID\" style=\"_CLEARCSS_;height:100px;width:100%;overflow:hidden;\"><div id=\"inscreen_hype_container\" style=\"margin:auto;position:relative;width:100%;height:100%;overflow:hidden;\" aria-live=\"polite\"><script type=\"text/javascript\" charset=\"utf-8\" src=\""+$scope.formDirPath+"inscreen.hyperesources/inscreen_hype_generated_script.js?[timestamp]\"></script></div></div><script>function openAd(){window.open('[clickUrl]');}</script><!--/iframe--><!--begintags--><!--endtags--></div>";
        $scope.formattedInScreenMarkup = $scope.escAssembledInScreenMarkup.replace(/\\"/g, '"');
    }
    
    $scope.generateInScreenMarkup = function(){
        $scope.formatPathInput();
        $scope.markupGenerated = true;
        $timeout(function(){$("textarea").select();},100);
    }
    
    $scope.resetForm = function(){
        $scope.setDefaults();
        $timeout(function(){$("input").focus();},100);
    }
}]);


// //////
// Canvas
// //////
app.controller("CanvasGeneratorCtrl", ['$scope', '$timeout', function($scope, $timeout) {
    
    console.log("GumGum Canvas Unit Generator");
    
    $scope.setDefaults = function(){
        $scope.pastedDirectoryPath = "";
        $scope.markupGenerated = false;
    }
    $scope.setDefaults();
    
    $scope.formatPathInput = function(){
        var awsPattern = "http://gumgum-content.s3.amazonaws.com";
        var awsString = $scope.pastedDirectoryPath.replace(awsPattern, "//c.gumgum.com");
        $scope.formDirPath = awsString;
        $scope.escAssembledCanvasMarkup = "<div ggnoclick id=\"mGGUID\" style=\"_CLEARCSS_;overflow:visible !important;position:relative;height:[assetHeight]px;\"><br style=\"display:none;\" /><style>#mGGUID iframe {overflow:hidden;}</style><!--iframe--><div style=\"width:100%;height:100%;\"><br style=\"display:none;\" /><style>.HYPE_scene{background-color:transparent !important;}</style><div id=\"hypGGUID\" style=\"cursor:pointer;width:100%;height:[assetHeight]px;\" onclick=\"(window.GUMGUM||parent.GUMGUM)['GGUID'].openAd()\"></div><img id=\"piGGUID\" style=\"display:none\" src=\"//c.gumgum.com/images/pixel.gif?GGUID\" onload='(function(x,m,path){i=document.getElementById(\"hypGGUID\");s = 600;if ([assetWidth] < 600 || [assetHeight] < 600) (s = 400);u = m + s + \"_hype_container\";i.id = u;var o = document.createElement(\"script\");o.type = \"text/javascript\";o.src = path + \"canvas\" + s + \".hyperesources/\" + m + s + \"_hype_generated_script.js?[timestamp]\";setTimeout(function(){i.appendChild(o)},1E3);x.onload=false;return false})(this, \"canvas\", \""+$scope.formDirPath+"\")' /><script>try{parent.document.getElementById(\"GGUID_ATTRIBUTION\").style.display=\"none\";parent.document.getElementById(\"GGUID_CLOSE\").style.display=\"none\";} catch(e){}function ggfinish(hypeDocument,element,event){var rheight = 120;hy = document.getElementById(hypeDocument.documentId());hy.className = \"runway_active\";parent.document.getElementById(\"GGUID_ATTRIBUTION\").style.display = \"block\";parent.document.getElementById(\"GGUID_CLOSE\").style.display = \"block\";parent.document.getElementById(\"GGADGGUID\").style.marginTop = (parseInt(\"[assetHeight]\")-rheight)+\"px\";parent.document.getElementById(\"GGADGGUID\").style.height = rheight+\"px\";parent.document.getElementById(\"mGGUID\").style.height = rheight+\"px\";}</script></div><!--/iframe--><!--begintags--><!--endtags--></div>";
        $scope.formattedCanvasMarkup = $scope.escAssembledCanvasMarkup.replace(/\\"/g, '"');
    }
    
    $scope.generateCanvasMarkup = function(){
        $scope.formatPathInput();
        $scope.markupGenerated = true;
        $timeout(function(){$("textarea").select();},100);
    }
    
    $scope.resetForm = function(){
        $scope.setDefaults();
        $timeout(function(){$("input").focus();},100);
    }
}]);


// ////////
// Lightbox
// ////////
app.controller("LightboxGeneratorCtrl", ['$scope', '$timeout', function($scope, $timeout) {
    
    console.log("GumGum Lightbox Generator");
    
    $scope.generateTracker = function(){
        return {
            desc : "",
            abbr : "",
            url : ""
        };
    }
    
    $scope.setDefaults = function(){
        $scope.pastedDirectoryPath = "";
        $scope.backgroundHeight = 90;
        $scope.markupGenerated = false;
        $scope.trackers = [];
        $scope.trackers = [$scope.generateTracker()];
    }
    $scope.setDefaults();
    
    $scope.addTracker = function(){
        $("html, body").animate({ scrollTop: $(document).height() }, "slow");
        $scope.trackers.push($scope.generateTracker());
    }
    
    $scope.removeTracker = function(index){
        if (index > 0) {
            $scope.trackers.splice(index, 1);
        }
    }
    
    $scope.formatTrackers = function(){
        return $scope.trackers.map(function(tracker) {
            return "/* "+tracker.desc+" */ case '"+tracker.abbr+"': clickUrl = '"+tracker.url+"';break;";
        }).join(' ');
    }
    
    $scope.formatPathInput = function(){
        var awsPattern = "http://gumgum-content.s3.amazonaws.com";
        var awsString = $scope.pastedDirectoryPath.replace(awsPattern, "https://c.gumgum.com");
        $scope.formDirPath = awsString;
        // Autodetect sprite height
        $scope.spriteUrl = $scope.formDirPath + "lightbox_bg.png";
        $scope.detectHeight = function(url){   
            var img = new Image();
            img.addEventListener("load", function(){
                $scope.backgroundHeight = this.naturalHeight / 2;
            });
            img.src = url;
        }
        $scope.detectHeight($scope.spriteUrl);
        // Assemble markup
        $scope.escAssembledLightboxMarkup = "<!DOCTYPE HTML><html><head><title></title><style type=\"text/css\">body {background: transparent;padding: 0;margin: 0;color: #252525;font: normal 12px/14px sans;overflow: hidden;}a img {border: none;}#container {position: absolute;width: 640px;height: 450px;left: 50%;top: 50%;padding: 0;margin: -225px 0 0 -320px;cursor: pointer;-webkit-box-shadow: 0 0 40px 0 rgba(0, 0, 0, .3);box-shadow: 0 0 40px 0 rgba(0, 0, 0, .3);}#container #background-image {position: absolute;z-index: 100;bottom: 0;left: 0;width: 640px;height: "+$scope.backgroundHeight+"px;background: url('"+$scope.formDirPath+"lightbox_bg.png') no-repeat top left;display: block;pointer-events: none;}#container .main {display: block;width: 100%;height: 90px;position: absolute;bottom: 0;left: 0;z-index: 101;}.projekktor {z-index: 99;position: absolute;top: 0;left: 0;}</style></head><body><div id=\"container\"><video class=\"projekktor\" width=\"640\" height=\"360\" poster=\""+$scope.formDirPath+"video_thumb.jpg\"></video><div id=\"background-image\"></div><a class=\"ggEvent main\" rel=\"site\" href=\"#\" target=\"new\" id=\"site-link\" onclick=\"GG.player.setVolume(0,2);\"></a></div><script src=\"https://c.gumgum.com/ads/com/gumgum/player.min.js\" type=\"text/javascript\">GG.setPlaylist = function() {var baseUrl = '"+$scope.formDirPath+"video',assets = {playlist: {},setAssets: (function() {this.playlist = {0: {src: baseUrl + \".flv\",type: \"video/flv\"},1: {src: baseUrl + \".mp4\",type: \"video/mp4\"},2: {src: baseUrl + \".ogv\",type: \"video/ogg\"},3: {src: baseUrl + \".webm\",type: \"video/webm\"}}; return this;}),setTag: (function() {var clickLink = $('a[rel=site]');var clickUrl = '';switch (GG.URLP.type) {"+$scope.formatTrackers()+"}clickLink.attr('href', clickUrl);return this;}),init: (function() {this.setTag().setAssets();})};assets.init(); return GG.player.setFile([assets.playlist]);}; var trigger = document.getElementById(\"site-link\"); var bgImage = document.getElementById(\"background-image\");trigger.onmouseover = function() {bgImage.style.backgroundPosition = \"bottom left\";};trigger.onmouseleave = function() {bgImage.style.backgroundPosition = \"top left\";};</script></body></html>";
        $scope.formattedLightboxMarkup = $scope.escAssembledLightboxMarkup.replace(/\\"/g, '"');
    }
    
    $scope.generateLightboxMarkup = function(){
        $scope.formatPathInput();
        $scope.markupGenerated = true;
        $("html, body").animate({ scrollTop: $(document).height() }, "slow");
        $timeout(function(){$("textarea").select();},100);
        $scope.saveFile();
    }
    
    $scope.saveFile = function(){
        var saveData = (function () {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        return function (data, fileName) {
                var html = data,
                    blob = new Blob([html], {type: "text/html"}),
                    url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = fileName;
                a.click();
                window.URL.revokeObjectURL(url);
            };
        }());
    
        var data = $scope.formattedLightboxMarkup,
            fileName = "lightbox_00.html";
    
        saveData(data, fileName);
    }
    
    $scope.resetForm = function(){
        $scope.setDefaults();
        $timeout(function(){$("input").focus();},100);
    }
    
    $(".generated-markup textarea, .generated-markup input").on("focus", function(){
        $(this).select();
    });
}]);