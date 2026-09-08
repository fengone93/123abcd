// ============================================================
//  欧乐影院 drpy 规则（基于真实 API）
//  注意：签名算法目前为硬编码示例，请从网站 JS 中提取最新算法替换
// ============================================================

// ========== MD5 纯 JS 实现 ==========
var MD5 = function (string) {
    function md5_RotateLeft(lValue, iShiftBits) { return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits)); }
    function md5_AddUnsigned(lX, lY) { var lX4, lY4, lX8, lY8, lResult; lX8 = (lX & 0x80000000); lY8 = (lY & 0x80000000); lX4 = (lX & 0x40000000); lY4 = (lY & 0x40000000); lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF); if (lX4 & lY4) { return (lResult ^ 0x80000000 ^ lX8 ^ lY8); } if (lX4 | lY4) { if (lResult & 0x40000000) { return (lResult ^ 0xC0000000 ^ lX8 ^ lY8); } else { return (lResult ^ 0x40000000 ^ lX8 ^ lY8); } } else { return (lResult ^ lX8 ^ lY8); } }
    function md5_F(x, y, z) { return (x & y) | ((~x) & z); }
    function md5_G(x, y, z) { return (x & z) | (y & (~z)); }
    function md5_H(x, y, z) { return (x ^ y ^ z); }
    function md5_I(x, y, z) { return (y ^ (x | (~z))); }
    function md5_FF(a, b, c, d, x, s, ac) { a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac)); return md5_AddUnsigned(md5_RotateLeft(a, s), b); }
    function md5_GG(a, b, c, d, x, s, ac) { a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac)); return md5_AddUnsigned(md5_RotateLeft(a, s), b); }
    function md5_HH(a, b, c, d, x, s, ac) { a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac)); return md5_AddUnsigned(md5_RotateLeft(a, s), b); }
    function md5_II(a, b, c, d, x, s, ac) { a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac)); return md5_AddUnsigned(md5_RotateLeft(a, s), b); }
    function md5_ConvertToWordArray(string) { var lWordCount; var lMessageLength = string.length; var lNumberOfWords_temp1 = lMessageLength + 8; var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64; var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16; var lWordArray = Array(lNumberOfWords - 1); var lBytePosition = 0; var lByteCount = 0; while (lByteCount < lMessageLength) { lWordCount = (lByteCount - (lByteCount % 4)) / 4; lBytePosition = (lByteCount % 4) * 8; lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition)); lByteCount++; } lWordCount = (lByteCount - (lByteCount % 4)) / 4; lBytePosition = (lByteCount % 4) * 8; lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition); lWordArray[lNumberOfWords - 2] = lMessageLength << 3; lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29; return lWordArray; }
    function md5_WordToHex(lValue) { var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount; for (lCount = 0; lCount <= 3; lCount++) { lByte = (lValue >>> (lCount * 8)) & 255; WordToHexValue_temp = "0" + lByte.toString(16); WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2); } return WordToHexValue; }
    var x = md5_ConvertToWordArray(string);
    var a = 0x67452301; var b = 0xEFCDAB89; var c = 0x98BADCFE; var d = 0x10325476;
    for (var k = 0; k < x.length; k += 16) {
        var AA = a, BB = b, CC = c, DD = d;
        a = md5_FF(a, b, c, d, x[k + 0], 7, 0xD76AA478); d = md5_FF(d, a, b, c, x[k + 1], 12, 0xE8C7B756); c = md5_FF(c, d, a, b, x[k + 2], 17, 0x242070DB); b = md5_FF(b, c, d, a, x[k + 3], 22, 0xC1BDCEEE); a = md5_FF(a, b, c, d, x[k + 4], 7, 0xF57C0FAF); d = md5_FF(d, a, b, c, x[k + 5], 12, 0x4787C62A); c = md5_FF(c, d, a, b, x[k + 6], 17, 0xA8304613); b = md5_FF(b, c, d, a, x[k + 7], 22, 0xFD469501); a = md5_FF(a, b, c, d, x[k + 8], 7, 0x698098D8); d = md5_FF(d, a, b, c, x[k + 9], 12, 0x8B44F7AF); c = md5_FF(c, d, a, b, x[k + 10], 17, 0xFFFF5BB1); b = md5_FF(b, c, d, a, x[k + 11], 22, 0x895CD7BE); a = md5_FF(a, b, c, d, x[k + 12], 7, 0x6B901122); d = md5_FF(d, a, b, c, x[k + 13], 12, 0xFD987193); c = md5_FF(c, d, a, b, x[k + 14], 17, 0xA679438E); b = md5_FF(b, c, d, a, x[k + 15], 22, 0x49B40821);
        a = md5_GG(a, b, c, d, x[k + 1], 5, 0xF61E2562); d = md5_GG(d, a, b, c, x[k + 6], 9, 0xC040B340); c = md5_GG(c, d, a, b, x[k + 11], 14, 0x265E5A51); b = md5_GG(b, c, d, a, x[k + 0], 20, 0xE9B6C7AA); a = md5_GG(a, b, c, d, x[k + 5], 5, 0xD62F105D); d = md5_GG(d, a, b, c, x[k + 10], 9, 0x02441453); c = md5_GG(c, d, a, b, x[k + 15], 14, 0xD8A1E681); b = md5_GG(b, c, d, a, x[k + 4], 20, 0xE7D3FBC8); a = md5_GG(a, b, c, d, x[k + 9], 5, 0x21E1CDE6); d = md5_GG(d, a, b, c, x[k + 14], 9, 0xC33707D6); c = md5_GG(c, d, a, b, x[k + 3], 14, 0xF4D50D87); b = md5_GG(b, c, d, a, x[k + 8], 20, 0x455A14ED); a = md5_GG(a, b, c, d, x[k + 13], 5, 0xA9E3E905); d = md5_GG(d, a, b, c, x[k + 2], 9, 0xFCEFA3F8); c = md5_GG(c, d, a, b, x[k + 7], 14, 0x676F02D9); b = md5_GG(b, c, d, a, x[k + 12], 20, 0x8D2A4C8A);
        a = md5_HH(a, b, c, d, x[k + 5], 4, 0xFFFA3942); d = md5_HH(d, a, b, c, x[k + 8], 11, 0x8771F681); c = md5_HH(c, d, a, b, x[k + 11], 16, 0x6D9D6122); b = md5_HH(b, c, d, a, x[k + 14], 23, 0xFDE5380C); a = md5_HH(a, b, c, d, x[k + 1], 4, 0xA4BEEA44); d = md5_HH(d, a, b, c, x[k + 4], 11, 0x4BDECFA9); c = md5_HH(c, d, a, b, x[k + 7], 16, 0xF6BB4B60); b = md5_HH(b, c, d, a, x[k + 10], 23, 0xBEBFBC70); a = md5_HH(a, b, c, d, x[k + 13], 4, 0x289B7EC6); d = md5_HH(d, a, b, c, x[k + 0], 11, 0xEAA127FA); c = md5_HH(c, d, a, b, x[k + 3], 16, 0xD4EF3085); b = md5_HH(b, c, d, a, x[k + 6], 23, 0x04881D05); a = md5_HH(a, b, c, d, x[k + 9], 4, 0xD9D4D039); d = md5_HH(d, a, b, c, x[k + 12], 11, 0xE6DB99E5); c = md5_HH(c, d, a, b, x[k + 15], 16, 0x1FA27CF8); b = md5_HH(b, c, d, a, x[k + 2], 23, 0xC4AC5665);
        a = md5_II(a, b, c, d, x[k + 0], 6, 0xF4292244); d = md5_II(d, a, b, c, x[k + 7], 10, 0x432AFF97); c = md5_II(c, d, a, b, x[k + 14], 15, 0xAB9423A7); b = md5_II(b, c, d, a, x[k + 5], 21, 0xFC93A039); a = md5_II(a, b, c, d, x[k + 12], 6, 0x655B59C3); d = md5_II(d, a, b, c, x[k + 3], 10, 0x8F0CCC92); c = md5_II(c, d, a, b, x[k + 10], 15, 0xFFEFF47D); b = md5_II(b, c, d, a, x[k + 1], 21, 0x85845DD1); a = md5_II(a, b, c, d, x[k + 8], 6, 0x6FA87E4F); d = md5_II(d, a, b, c, x[k + 15], 10, 0xFE2CE6E0); c = md5_II(c, d, a, b, x[k + 6], 15, 0xA3014314); b = md5_II(b, c, d, a, x[k + 13], 21, 0x4E0811A1); a = md5_II(a, b, c, d, x[k + 4], 6, 0xF7537E82); d = md5_II(d, a, b, c, x[k + 11], 10, 0xBD3AF235); c = md5_II(c, d, a, b, x[k + 2], 15, 0x2AD7D2BB); b = md5_II(b, c, d, a, x[k + 9], 21, 0xEB86D391);
        a = md5_AddUnsigned(a, AA); b = md5_AddUnsigned(b, BB); c = md5_AddUnsigned(c, CC); d = md5_AddUnsigned(d, DD);
    }
    return (md5_WordToHex(a) + md5_WordToHex(b) + md5_WordToHex(c) + md5_WordToHex(d)).toLowerCase();
};

// ========== 签名生成函数（目前为硬编码示例，需要从网站JS提取最新算法） ==========
function oleSign() {
    // TODO: 请从 https://www.olevod.com 的前端JS中提取最新的 _vv 生成算法
    // 以下硬编码值仅供临时测试（会过期）
    return 'bbf0e09f3bc115c7e7311d30f8a30fb0';  // 替换为动态生成的签名
}

// ========== 主规则 ==========
var rule = {
    title: '欧乐影院(API)',
    host: 'https://www.olevod.com',
    searchUrl: '',   // 搜索独立处理
    searchable: 2,
    quickSearch: 0,
    filterable: 1,
    multi: 1,
    url: '/vod/type/fyclass/fypage',
    filter: {},
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
    },
    timeout: 10000,
    class_name: '',
    class_url: '',
    play_parse: true,
    lazy: '',

    // ====== 一级：首页推荐 ======
    一级: $js.toString(() => {
        // 获取分类列表（缓存）
        let cacheKey = 'olevod_categories';
        let categories = getItem(cacheKey);
        if (!categories) {
            let sign = oleSign();
            let url = 'https://api.olelive.com/v1/pub/vod/list/type?_vv=' + sign;
            let res = fetch(url, fetch_params);
            try {
                let json = JSON.parse(res);
                if (json.code === 0 && json.data) {
                    let map = {};
                    json.data.forEach(item => {
                        map[item.typeId] = item.typeName;
                    });
                    categories = JSON.stringify(map);
                    setItem(cacheKey, categories);
                } else {
                    categories = '{}';
                }
            } catch (e) {
                categories = '{}';
                log('获取分类失败：' + e.message);
            }
        }
        // 默认取电影分类（1）的首页数据
        let sign2 = oleSign();
        let listUrl = 'https://api.olelive.com/v1/pub/vod/list/true/3/0/0/1/0/0/update/1/48?_vv=' + sign2;
        let html = fetch(listUrl, fetch_params);
        let d = [];
        try {
            let json = JSON.parse(html);
            if (json.code === 0 && json.data && json.data.list) {
                json.data.list.forEach(item => {
                    d.push({
                        title: item.name,
                        img: 'https://static.olelive.com/' + item.pic,
                        desc: item.remarks + ' | 评分:' + item.score,
                        url: item.id + ''
                    });
                });
            }
        } catch (e) {
            log('首页列表失败：' + e.message);
        }
        setResult(d);
    }),

    // ====== 分类视频列表 ======
    categoryContent: $js.toString(() => {
        let parts = input.split('/');
        let typeId = parts[parts.length - 2] || '1';
        let page = parseInt(parts[parts.length - 1]) || 1;
        let sign = oleSign();
        let listUrl = 'https://api.olelive.com/v1/pub/vod/list/true/3/0/0/' + typeId + '/0/0/update/' + page + '/48?_vv=' + sign;
        let html = fetch(listUrl, fetch_params);
        let d = [];
        try {
            let json = JSON.parse(html);
            if (json.code === 0 && json.data && json.data.list) {
                json.data.list.forEach(item => {
                    d.push({
                        title: item.name,
                        img: 'https://static.olelive.com/' + item.pic,
                        desc: item.remarks + ' | 评分:' + item.score,
                        url: item.id + ''
                    });
                });
            }
        } catch (e) {
            log('分类列表失败：' + e.message);
        }
        setResult(d);
    }),

    // ====== 二级：视频详情 ======
    二级: $js.toString(() => {
        let videoId = input.trim();
        let sign = oleSign();
        let detailUrl = 'https://api.olelive.com/v1/pub/vod/detail/' + videoId + '/true?_vv=' + sign;
        let html = fetch(detailUrl, fetch_params);
        VOD = {};
        try {
            let json = JSON.parse(html);
            if (json.code === 0 && json.data) {
                let data = json.data;
                // 基本信息
                VOD.vod_name = data.name || '';
                VOD.vod_pic = 'https://static.olelive.com/' + (data.pic || '');
                VOD.vod_content = data.content || '';
                VOD.vod_year = data.year || '';
                VOD.vod_director = data.director || '';
                VOD.vod_actor = data.actor || '';
                VOD.vod_area = data.area || '';
                VOD.vod_lang = data.lang || '';
                VOD.vod_douban_score = data.score || '';
                // 播放地址
                let urls = data.urls || [];
                if (urls.length > 0) {
                    VOD.vod_play_from = '欧乐';
                    let playUrl = urls
                        .filter(u => u.vip === false)   // 只取非VIP线路
                        .map(u => u.title + '$' + u.url)
                        .join('#');
                    VOD.vod_play_url = playUrl || '';
                } else {
                    VOD.vod_play_url = '';
                }
            }
        } catch (e) {
            log('详情解析失败：' + e.message);
        }
    }),

    // ====== 搜索 ======
    搜索: $js.toString(() => {
        let keyword = input.split('wd=')[1] || '';
        let page = 1;
        let sign = oleSign();
        let searchUrl = 'https://api.olelive.com/v1/pub/index/search/' + encodeURIComponent(keyword) + '/vod/0/' + page + '/48?_vv=' + sign;
        let html = fetch(searchUrl, fetch_params);
        let d = [];
        try {
            let json = JSON.parse(html);
            if (json.code === 0 && json.data && json.data.data) {
                let vodData = json.data.data.find(item => item.type === 'vod');
                if (vodData && vodData.list) {
                    vodData.list.forEach(item => {
                        d.push({
                            title: item.name,
                            img: 'https://static.olelive.com/' + item.pic,
                            desc: item.remarks + ' | 评分:' + item.score,
                            url: item.id + ''
                        });
                    });
                }
            }
        } catch (e) {
            log('搜索失败：' + e.message);
        }
        setResult(d);
    })
};
