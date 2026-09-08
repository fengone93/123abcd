// 标准 TVBox 规则 - 欧乐影院 (API 直连版)
// 无需额外依赖，直接运行于 drpy2 环境

// ==================== 签名算法（从原版完整移植） ====================
function getSignature() {
    let t = Math.floor(Date.now() / 1000).toString();
    return getT(t);
}

function getT(e) {
    let t = e.toString(),
        r = [[], [], [], []];
    for (var i = 0; i < t.length; i++) {
        let e = he(t[i]);
        (r[0] += e.slice(2, 3)), (r[1] += e.slice(3, 4)), (r[2] += e.slice(4, 5)), (r[3] += e.slice(5));
    }
    let a = [];
    for (i = 0; i < r.length; i++) {
        let e = parseInt(r[i], 2).toString(16);
        2 == e.length && (e = '0' + e), 1 == e.length && (e = '00' + e), 0 == e.length && (e = '000'), (a[i] = e);
    }
    let n = Crypto.MD5(t).toString();
    return n.slice(0, 3) + a[0] + n.slice(6, 11) + a[1] + n.slice(14, 19) + a[2] + n.slice(22, 27) + a[3] + n.slice(30);
}

function he(e) {
    let t = [],
        r = e.split('');
    for (var i = 0; i < r.length; i++) {
        0 != i && t.push(' ');
        let e = r[i].charCodeAt().toString(2);
        t.push(e);
    }
    return t.join('');
}

// ==================== 规则主体 ====================
var rule = {
    title: '欧乐[API]',
    host: 'https://api.olelive.com',
    class_name: '电影&电视剧&综艺&动漫&短剧&纪录片&儿童',
    class_url: '1&2&3&4&5&6&7',
    searchable: 1,
    quickSearch: 0,
    filterable: 0,
    timeout: 10000,

    // ---------- 一级：分类列表 ----------
    一级: $js.toString(() => {
        let d = [];
        // 固定分类ID映射 (根据实际接口调整)
        let classMap = { '1': '电影', '2': '电视剧', '3': '综艺', '4': '动漫', '5': '短剧', '6': '纪录片', '7': '儿童' };
        let cid = MY_CATE || '1';
        let page = MY_PAGE || 1;
        let sign = getSignature();
        let url = `https://api.olelive.com/v1/pub/vod/list/true/3/0/0/${cid}/0/0/update/${page}/48?_vv=${sign}`;

        try {
            let html = request(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
                }
            });
            let json = JSON.parse(html);
            if (json.data && json.data.data && json.data.data.list) {
                json.data.data.list.forEach((e) => {
                    d.push({
                        title: e.name || '',
                        img: e.pic ? 'https://static.olelive.com/' + e.pic : '',
                        desc: e.remarks || '',
                        url: e.id + ''
                    });
                });
            }
        } catch (e) {
            log('欧乐列表获取失败: ' + e.message);
        }
        setResult(d);
    }),

    // ---------- 二级：详情 & 剧集 ----------
    二级: $js.toString(() => {
        let vod_id = input.split('cid=')[1] || input;
        let sign = getSignature();
        let url = `https://api.olelive.com/v1/pub/vod/detail/${vod_id}/true?_vv=${sign}`;
        let VOD = {};

        try {
            let html = request(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
                }
            });
            let json = JSON.parse(html);
            let obj = json.data.data;
            if (obj) {
                VOD.vod_name = obj.name || '';
                VOD.vod_pic = obj.pic ? 'https://static.olelive.com/' + obj.pic : '';
                VOD.vod_actor = obj.actor || '';
                VOD.vod_director = obj.director || '';
                VOD.vod_content = obj.content || '';
                VOD.vod_year = obj.year || '';
                VOD.type_name = obj.typeIdName || '';
                VOD.vod_area = obj.area || '';

                let playUrls = [];
                if (obj.urls && obj.urls.length > 0) {
                    obj.urls.forEach((e) => {
                        playUrls.push(e.title + '$' + e.url);
                    });
                }
                VOD.vod_play_from = '欧乐云';
                VOD.vod_play_url = playUrls.join('#');
            }
        } catch (e) {
            log('欧乐详情获取失败: ' + e.message);
        }
        setResult(VOD);
    }),

    // ---------- 搜索 ----------
    搜索: $js.toString(() => {
        let d = [];
        let keyword = input.split('wd=')[1] || input;
        let page = 1;
        let sign = getSignature();
        let url = `https://api.olelive.com/v1/pub/index/search/${encodeURIComponent(keyword)}/vod/0/${page}/48?_vv=${sign}`;

        try {
            let html = request(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
                }
            });
            let json = JSON.parse(html);
            if (json.data && json.data.data && json.data.data.data) {
                let vodList = json.data.data.data.find(item => item.type === 'vod');
                if (vodList && vodList.list) {
                    vodList.list.forEach((e) => {
                        // 过滤VIP (可选)
                        if (e.vip === true) return;
                        d.push({
                            title: e.name || '',
                            img: e.pic ? 'https://static.olelive.com/' + e.pic : '',
                            desc: e.remarks || '',
                            url: e.id + ''
                        });
                    });
                }
            }
        } catch (e) {
            log('欧乐搜索失败: ' + e.message);
        }
        setResult(d);
    })
};
