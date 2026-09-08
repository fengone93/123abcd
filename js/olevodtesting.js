var rule = {
    title: '欧乐影院',
    host: 'https://www.olelive.com',
    url: 'https://api.olelive.com/v1/pub/index/search/{wd}/0/0/0/1',
    searchUrl: 'https://api.olelive.com/v1/pub/index/search/{wd}/0/0/0/1',
    searchable: 1,
    quickSearch: 1,
    filterable: 0,
    multi: 1,

    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.olevod.com/',
        'Origin': 'https://www.olevod.com/',
        'Accept': 'application/json, text/plain, */*'
    },

    // =========================
    // 生成欧乐 _vv
    // =========================
    get_vv: function () {
        var t = Math.floor(Date.now() / 1000).toString();

        var cols = ['', '', '', ''];

        for (var i = 0; i < t.length; i++) {
            var n = t.charCodeAt(i).toString(2);

            cols[0] += n.substring(2, 3);
            cols[1] += n.substring(3, 4);
            cols[2] += n.substring(4, 5);
            cols[3] += n.substring(5);
        }

        var pieces = [];

        for (var j = 0; j < cols.length; j++) {
            var x = cols[j] ? parseInt(cols[j], 2).toString(16) : '';
            while (x.length < 3) {
                x = '0' + x;
            }
            pieces.push(x);
        }

        var m = md5(t);

        return m.substring(0, 3)
            + pieces[0]
            + m.substring(6, 11)
            + pieces[1]
            + m.substring(14, 19)
            + pieces[2]
            + m.substring(22, 27)
            + pieces[3]
            + m.substring(30);
    },

    // =========================
    // 首页
    // =========================
    一级: $js.toString(() => {
        var vv = rule.get_vv();
        var url = 'https://api.olelive.com/v1/pub/index/search//0/0/0/1?_vv=' + vv;

        var d = [];

        try {
            var res = request(url, {
                headers: rule.headers
            });

            var json = JSON.parse(res);

            if (json.code !== 0 || !json.data) {
                setResult(d);
                return;
            }

            var groups = json.data.data || [];

            groups.forEach(function (group) {
                var list = group.list || [];

                list.forEach(function (it) {
                    if (!it.id) return;

                    d.push({
                        title: it.name || '',
                        img: it.pic || '',
                        desc: it.remarks || '',
                        url: String(it.id)
                    });
                });
            });

        } catch (e) {
            log('欧乐首页错误: ' + e);
        }

        setResult(d);
    }),

    // =========================
    // 详情
    // =========================
    二级: $js.toString(() => {
        var id = input.trim();
        var vv = rule.get_vv();

        var url =
            'https://api.olelive.com/v1/pub/vod/detail/' +
            id +
            '/true?_vv=' +
            vv;

        var VOD = {};

        try {
            var res = request(url, {
                headers: rule.headers
            });

            var json = JSON.parse(res);

            if (json.code !== 0 || !json.data) {
                VOD.vod_name = '获取失败';
                VOD.vod_play_from = '欧乐影院';
                VOD.vod_play_url = '播放$' + url;
                setResult(VOD);
                return;
            }

            var data = json.data;

            VOD.vod_id = id;
            VOD.vod_name = data.name || '';
            VOD.vod_pic = data.pic || '';
            VOD.vod_content = data.blurb || data.content || '';

            var urls = data.urls || [];
            var playList = [];

            urls.forEach(function (item, index) {
                var name = item.title || ('第' + (index + 1) + '集');
                var playUrl = item.url || '';

                if (playUrl) {
                    playList.push(name + '$' + playUrl);
                }
            });

            VOD.vod_play_from = '欧乐影院';

            if (playList.length > 0) {
                VOD.vod_play_url = playList.join('#');
            } else {
                VOD.vod_play_url = '正片$' + url;
            }

        } catch (e) {
            log('欧乐详情错误: ' + e);

            VOD.vod_name = '解析失败';
            VOD.vod_play_from = '欧乐影院';
            VOD.vod_play_url = '播放失败$' + url;
        }

        setResult(VOD);
    }),

    // =========================
    // 搜索
    // =========================
    搜索: $js.toString(() => {
        var wd = input;

        if (wd.indexOf('wd=') >= 0) {
            wd = wd.split('wd=')[1];
        }

        wd = decodeURIComponent(wd);

        var vv = rule.get_vv();

        var url =
            'https://api.olelive.com/v1/pub/index/search/' +
            encodeURIComponent(wd) +
            '/0/0/0/1?_vv=' +
            vv;

        var d = [];

        try {
            var res = request(url, {
                headers: rule.headers
            });

            var json = JSON.parse(res);

            if (json.code !== 0 || !json.data) {
                setResult(d);
                return;
            }

            var groups = json.data.data || [];

            groups.forEach(function (group) {
                var list = group.list || [];

                list.forEach(function (it) {
                    if (!it.id) return;

                    d.push({
                        title: it.name || '',
                        img: it.pic || '',
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
    })
};
