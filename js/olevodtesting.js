var rule = {
    title: '欧乐影院',
    host: 'https://www.olelive.com',
    searchable: 1,
    quickSearch: 1,
    filterable: 0,
    timeout: 15000,

    class_name: '搜索',
    class_url: 'search',

    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.olevod.com/',
        'Origin': 'https://www.olevod.com',
        'Accept': 'application/json, text/plain, */*'
    },

    // 欧乐 _vv
    getVV: function () {
        var t = Math.floor(Date.now() / 1000);

        // 主方案：公开逆向代码使用的时间戳分组算法
        function vv1(ts) {
            var s = String(ts);
            var r = ['', '', '', ''];

            for (var i = 0; i < s.length; i++) {
                var b = s.charCodeAt(i).toString(2);
                r[0] += b.substring(2, 3);
                r[1] += b.substring(3, 4);
                r[2] += b.substring(4, 5);
                r[3] += b.substring(5);
            }

            var a = [];
            for (var j = 0; j < r.length; j++) {
                var x = r[j] ? parseInt(r[j], 2).toString(16) : '';
                while (x.length < 3) {
                    x = '0' + x;
                }
                a.push(x);
            }

            var m = md5(s);

            return m.substring(0, 3) +
                a[0] +
                m.substring(6, 11) +
                a[1] +
                m.substring(14, 19) +
                a[2] +
                m.substring(22, 27) +
                a[3] +
                m.substring(30);
        }

        // 备用方案
        function vv2(ts) {
            var r = ts % 20;
            return md5((ts - r) + 'new.olelive.com');
        }

        return {
            main: vv1(t),
            backup: vv2(t)
        };
    },

    requestAPI: function (url) {
        var vv = this.getVV();

        var u1 = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_vv=' + vv.main;

        try {
            var r1 = request(u1, {
                headers: this.headers
            });

            if (r1) {
                var j1 = JSON.parse(r1);
                if (j1 && j1.code === 0) {
                    return j1;
                }
            }
        } catch (e) {
            log('欧乐主签名失败: ' + e);
        }

        var u2 = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_vv=' + vv.backup;

        try {
            var r2 = request(u2, {
                headers: this.headers
            });

            if (r2) {
                var j2 = JSON.parse(r2);
                if (j2 && j2.code === 0) {
                    return j2;
                }
            }
        } catch (e2) {
            log('欧乐备用签名失败: ' + e2);
        }

        return null;
    },

    一级: $js.toString(function () {
        var d = [];

        // 影视仓第一次进入时，使用空搜索获取站点返回的数据
        var api =
            'https://api.olelive.com/v1/pub/index/search//0/0/0/1';

        try {
            var json = rule.requestAPI(api);

            if (!json || !json.data) {
                setResult([]);
                return;
            }

            var groups = json.data.data || [];

            groups.forEach(function (group) {
                var list = group.list || [];

                list.forEach(function (it) {
                    if (!it.id) return;

                    d.push({
                        title: it.name || '',
                        img: rule.fixPic(it.pic || ''),
                        desc: it.remarks || '',
                        content: it.blurb || '',
                        url: String(it.id)
                    });
                });
            });

        } catch (e) {
            log('欧乐一级错误: ' + e);
        }

        setResult(d);
    }),

    二级: $js.toString(function () {
        var vod_id = input;
        var api =
            'https://api.olelive.com/v1/pub/vod/detail/' +
            vod_id +
            '/true';

        var VOD = {
            vod_id: vod_id,
            vod_name: '',
            vod_pic: '',
            vod_content: '',
            vod_play_from: '欧乐影院',
            vod_play_url: ''
        };

        try {
            var json = rule.requestAPI(api);

            if (!json || !json.data) {
                setResult(VOD);
                return;
            }

            var data = json.data;

            VOD.vod_name = data.name || '';
            VOD.vod_pic = rule.fixPic(data.pic || '');
            VOD.vod_content = data.blurb || data.content || '';

            var urls = data.urls || [];
            var plays = [];

            urls.forEach(function (it, index) {
                var title = it.title || ('第' + (index + 1) + '集');
                var url = it.url || '';

                if (url) {
                    plays.push(title + '$' + url);
                }
            });

            VOD.vod_play_url = plays.join('#');

        } catch (e) {
            log('欧乐详情错误: ' + e);
        }

        setResult(VOD);
    }),

    搜索: $js.toString(function () {
        var wd = input || '';

        if (wd.indexOf('wd=') >= 0) {
            wd = wd.split('wd=')[1];
        }

        try {
            wd = decodeURIComponent(wd);
        } catch (e) {
        }

        var api =
            'https://api.olelive.com/v1/pub/index/search/' +
            encodeURIComponent(wd) +
            '/0/0/0/1';

        var d = [];

        try {
            var json = rule.requestAPI(api);

            if (!json || !json.data) {
                setResult([]);
                return;
            }

            var groups = json.data.data || [];

            groups.forEach(function (group) {
                var list = group.list || [];

                list.forEach(function (it) {
                    if (!it.id) return;

                    d.push({
                        title: it.name || '',
                        img: rule.fixPic(it.pic || ''),
                        desc: it.remarks || '',
                        content: it.blurb || '',
                        url: String(it.id)
                    });
                });
            });

        } catch (e) {
            log('欧乐搜索错误: ' + e);
        }

        setResult(d);
    }),

    fixPic: function (pic) {
        if (!pic) return '';
        if (/^https?:\/\//i.test(pic)) {
            return pic;
        }
        return 'https://static.olelive.com/' + pic.replace(/^\/+/, '');
    }
};
