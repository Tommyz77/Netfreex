﻿function flashxExtract(id, success, error, download) {
    var page_url = "";

    if (id.length < 15)
        page_url = "https://www.flashx.to/" + id + ".html";
    else if (id.length == 32)
        page_url = "https://www.flashx.to/" + id + ".jsp";
    else
        page_url = "https://streamcrypt.net/flashx.to/" + id;

    cordovaHTTP.headers = [];
    cordovaHTTP.setHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");

    cordovaHTTP.get(page_url, {}, {}, function (response) {
        console.log(response);

        var content = response.data;

        try {
            var fname = content.split("fname\" value=\"")[1].split("\"")[0];
            var hash = content.split("hash\" value=\"")[1].split("\"")[0];
            var file_id = content.match("'file_id', '([^']+)'")[1];
            var idVideo = content.split('name="id" value="')[1].split("\"")[0];

            var coding_url = 'https://files.fx.fastcontentdelivery.com/jquery2.js?fx=' + window.btoa(file_id);
            cordovaHTTP.setHeader("Host", "files.fx.fastcontentdelivery.com");
            cordovaHTTP.setHeader("Referer", "https://www.flashx.tv/");
            cordovaHTTP.setHeader("Accept", "*/*");
            cordovaHTTP.get(coding_url, {}, {}, function (response) { }, function (response) { });
            coding_url = 'https://www.flashx.tv/counter.cgi?fx=' + window.btoa(file_id);
            cordovaHTTP.setHeader("Host", "www.flashx.tv");
            cordovaHTTP.get(coding_url, {}, {}, function (response) { }, function (response) { });
            coding_url = 'https://www.flashx.tv/flashx.php?fxfx=3';
            cordovaHTTP.setHeader("X-Requested-With", "XMLHttpRequest");
            cordovaHTTP.get(coding_url, {}, {}, function (response) { }, function (response) { });


            setTimeout(function () {
                doPostRequest(idVideo, fname, hash);
            }, 6000);
        } catch (e) {
            error(e);
        }

    }, function (response) {
        error(response);
    });

    function doPostRequest(id, fname, hash) {
        cordovaHTTP.setHeader("Content-Type", "application/x-www-form-urlencoded");
        cordovaHTTP.post("https://www.flashx.tv/dl?playthis", {
            op: "download1",
            usr_login: "",
            id: id,
            fname: fname,
            referer: "",
            hash: hash,
            imhuman: "Proceed+to+video"
        }, {}, function (response) {

            try {
                var content = response.data.split("download_div2")[1];

                content = content.split("eval(function")[1].split("</script>")[0];
                content = "eval(function" + content;

                //UNPACK
                var url = unpack(content);

                success(url, download);
            } catch (e) {
                error(e);
            }

        }, function (response) {
            error(response);
        });
    }


}

function removeLinkOfflineFlashX(id, link) {
    return true;
    //cordovaHTTP.headers = [];
    //cordovaHTTP.setHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");
    //cordovaHTTP.get("http://www.fastvideo.me/" + id, {}, {}, function (response) {
    //    return response.data.indexOf("Not Found") == -1;
    //}, function (response) {
    //    return false;
    //});
}


//function flashxExtract(id, success, error, download) {
//    var page_url = "";

//    if(id.length < 15)
//        page_url = "https://www.flashx.to/" + id + ".html";
//    else if(id.length == 32)
//        page_url = "https://www.flashx.to/" + id + ".jsp";
//    else
//        page_url = "https://streamcrypt.net/flashx.to/" + id;

//    $.ajax({
//        url: page_url,
//        type: "GET",
//        beforeSend: function (xhr) {
//            xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");
//        },
//        success: function (response) {
//            var content = response;
//            debugger
//            try {
//                var fname = content.split("fname\" value=\"")[1].split("\"")[0];
//                var hash = content.split("hash\" value=\"")[1].split("\"")[0];
//                var file_id = content.match("'file_id', '([^']+)'")[1];
//                var idVideo = content.split('name="id" value="')[1].split("\"")[0];

//                var coding_url = 'https://files.fx.fastcontentdelivery.com/jquery2.js?fx=' + window.btoa(file_id);
//                $.ajax({
//                    url: coding_url,
//                    type: "GET",
//                    beforeSend: function (xhr) {
//                        xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");
//                        xhr.setRequestHeader("Host", "files.fx.fastcontentdelivery.com");
//                        xhr.setRequestHeader("Referer", "https://www.flashx.tv/");
//                        xhr.setRequestHeader("Accept", "*/*");
//                    }
//                });
//                $.ajax({
//                    url: coding_url,
//                    type: "GET",
//                    beforeSend: function (xhr) {
//                        xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");
//                        xhr.setRequestHeader("Host", "www.flashx.tv");
//                        xhr.setRequestHeader("Referer", "https://www.flashx.tv/");
//                        xhr.setRequestHeader("Accept", "*/*");
//                    }
//                });
//                $.ajax({
//                    url: coding_url,
//                    type: "GET",
//                    beforeSend: function (xhr) {
//                        xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");
//                        xhr.setRequestHeader("Host", "www.flashx.tv");
//                        xhr.setRequestHeader("Referer", "https://www.flashx.tv/");
//                        xhr.setRequestHeader("Accept", "*/*");
//                        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
//                    }
//                });


//                setTimeout(function() {
//                    doPostRequest(idVideo, fname, hash);
//                }, 6000);
//            } catch (e) {
//                error(e);
//            }
//        },
//        error: function (e) {
//            error(e);
//        }
//    });
    
//    function doPostRequest(id, fname, hash) {
//        $.ajax({
//            url: "https://www.flashx.tv/dl?playthis",
//            type: "POST",
//            beforeSend: function (xhr) {
//                xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");
//                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//            },
//            data: {
//                op: "download1",
//                usr_login: "",
//                id: id,
//                fname: fname,
//                referer: "",
//                hash: hash,
//                imhuman: "Proceed+to+video"
//            },
//            success: function (response) {
//                try {
//                    var content = response.split("download_div2")[1];

//                    content = content.split("eval(function")[1].split("</script>")[0];
//                    content = "eval(function" + content;

//                    //UNPACK
//                    var url = unpack(content);

//                    success(url, download);
//                } catch (e) {
//                    error(e);
//                }
//            },
//            error: function (e) {
//                error(e);
//            }
//        });
//    }


//}

//function removeLinkOfflineFlashX(id, link) {
//    return true;
//    //cordovaHTTP.headers = [];
//    //cordovaHTTP.setHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");
//    //cordovaHTTP.get("http://www.fastvideo.me/" + id, {}, {}, function (response) {
//    //    return response.data.indexOf("Not Found") == -1;
//    //}, function (response) {
//    //    return false;
//    //});
//}
