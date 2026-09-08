var rule = {
title: '欧乐影院',
host: 'https://api.olelive.com',

```
searchable: 1,
quickSearch: 1,
filterable: 1,

timeout: 15000,

class_name: '电影&电视剧&短剧&综艺&动漫',
class_url: '1&2&14&3&4',

headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Referer': 'https://www.olevod.com/',
    'Origin': 'https://www.olevod.com'
},

filter_def: {
    '1': {
        cateId: '0',
        area: '0',
        year: '0',
        by: 'update'
    },
    '2': {
        cateId: '0',
        area: '0',
        year: '0',
        by: 'update'
    },
    '14': {
        cateId: '0',
        area: '0',
        year: '0',
        by: 'update'
    },
    '3': {
        cateId: '0',
        area: '0',
        year: '0',
        by: 'update'
    },
    '4': {
        cateId: '0',
        area: '0',
        year: '0',
        by: 'update'
    }
},

filter: {
    '1': [
        {
            key: 'cateId',
            name: '分类',
            value: [
                { n: '全部', v: '0' },
                { n: '动作片', v: '101' },
                { n: '喜剧片', v: '102' },
                { n: '爱情片', v: '103' },
                { n: '科幻片', v: '104' },
                { n: '恐怖片', v: '105' },
                { n: '剧情片', v: '106' },
                { n: '战争片', v: '107' },
                { n: '动画片', v: '108' },
                { n: '悬疑片', v: '109' },
                { n: '惊悚片', v: '110' },
                { n: '纪录片', v: '111' },
                { n: '奇幻片', v: '112' },
                { n: '犯罪片', v: '113' }
            ]
        },
        {
            key: 'area',
            name: '地区',
            value: [
                { n: '全部', v: '0' },
                { n: '大陆', v: '大陆' },
                { n: '香港', v: '香港' },
                { n: '台湾', v: '台湾' },
                { n: '美国', v: '美国' },
                { n: '韩国', v: '韩国' },
                { n: '日本', v: '日本' },
                { n: '印度', v: '印度' },
                { n: '英国', v: '英国' },
                { n: '法国', v: '法国' },
                { n: '加拿大', v: '加拿大' },
                { n: '西班牙', v: '西班牙' },
                { n: '德国', v: '德国' },
                { n: '俄罗斯', v: '俄罗斯' },
                { n: '意大利', v: '意大利' },
                { n: '泰国', v: '泰国' },
                { n: '新加坡', v: '新加坡' },
                { n: '马来西亚', v: '马来西亚' },
                { n: '其它', v: '其它' }
            ]
        },
        {
            key: 'year',
            name: '年份',
            value: [
                { n: '全部', v: '0' },
                { n: '2026', v: '2026' },
                { n: '2025', v: '2025' },
                { n: '2024', v: '2024' },
                { n: '2023', v: '2023' },
                { n: '2022', v: '2022' },
                { n: '2021', v: '2021' },
                { n: '2020', v: '2020' },
                { n: '2019', v: '2019' },
                { n: '2018', v: '2018' },
                { n: '2017', v: '2017' },
                { n: '2016', v: '2016' },
                { n: '2015', v: '2015' },
                { n: '2014', v: '2014' },
                { n: '2013', v: '2013' },
                { n: '2012', v: '2012' },
                { n: '2011', v: '2011' },
                { n: '2010', v: '2010' }
            ]
        },
        {
            key: 'by',
            name: '排序',
            value: [
                { n: '按最新', v: 'update' },
                { n: '按添加', v: 'desc' },
                { n: '按最热', v: 'hot' },
                { n: '按评分', v: 'score' }
            ]
        }
    ],

    '2': [
        {
            key: 'cateId',
            name: '分类',
            value: [
                { n: '全部', v: '0' },
                { n: '欧美剧', v: '201' },
                { n: '国产剧', v: '202' },
                { n: '港台剧', v: '203' },
                { n: '日韩剧', v: '204' }
            ]
        },
        {
            key: 'area',
            name: '地区',
            value: [
                { n: '全部', v: '0' },
                { n: '大陆', v: '大陆' },
                { n: '香港', v: '香港' },
                { n: '台湾', v: '台湾' },
                { n: '美国', v: '美国' },
                { n: '韩国', v: '韩国' },
                { n: '日本', v: '日本' },
                { n: '英国', v: '英国' },
                { n: '法国', v: '法国' },
                { n: '泰国', v: '泰国' },
                { n: '新加坡', v: '新加坡' },
                { n: '马来西亚', v: '马来西亚' },
                { n: '其它', v: '其它' }
            ]
        },
        {
            key: 'year',
            name: '年份',
            value: [
                { n: '全部', v: '0' },
                { n: '2026', v: '2026' },
                { n: '2025', v: '2025' },
                { n: '2024', v: '2024' },
                { n: '2023', v: '2023' },
                { n: '2022', v: '2022' },
                { n: '2021', v: '2021' },
                { n: '2020', v: '2020' },
                { n: '2019', v: '2019' },
                { n: '2018', v: '2018' },
                { n: '2017', v: '2017' },
                { n: '2016', v: '2016' },
                { n: '2015', v: '2015' },
                { n: '2014', v: '2014' },
                { n: '2013', v: '2013' },
                { n: '2012', v: '2012' },
                { n: '2011', v: '2011' },
                { n: '2010', v: '2010' }
            ]
        },
        {
            key: 'by',
            name: '排序',
            value: [
                { n: '按最新', v: 'update' },
                { n: '按添加', v: 'desc' },
                { n: '按最热', v: 'hot' },
                { n: '按评分', v: 'score' }
            ]
        }
    ],

    '14': [
        {
            key: 'cateId',
            name: '分类',
            value: [
                { n: '全部', v: '0' },
                { n: '言情', v: '1209' },
                { n: '都市', v: '1210' },
                { n: '甜宠', v: '1211' },
                { n: '逆袭', v: '1212' },
                { n: '玄幻', v: '1213' },
                { n: '仙侠', v: '1214' },
                { n: '穿越', v: '1215' },
                { n: '重生', v: '1216' },
                { n: '王妃', v: '1217' },
                { n: '总裁', v: '1218' },
                { n: '离婚', v: '1219' },
                { n: '其他', v: '1220' }
            ]
        },
        {
            key: 'area',
            name: '地区',
            value: [
                { n: '全部', v: '0' },
                { n: '大陆', v: '大陆' },
                { n: '香港', v: '香港' },
                { n: '台湾', v: '台湾' },
                { n: '美国', v: '美国' },
                { n: '韩国', v: '韩国' },
                { n: '日本', v: '日本' },
                { n: '马来西亚', v: '马来西亚' },
                { n: '其它', v: '其它' }
            ]
        },
        {
            key: 'year',
            name: '年份',
            value: [
                { n: '全部', v: '0' },
                { n: '2026', v: '2026' },
                { n: '2025', v: '2025' },
                { n: '2024', v: '2024' },
                { n: '2023', v: '2023' },
                { n: '2022', v: '2022' },
                { n: '2021', v: '2021' },
                { n: '2020', v: '2020' }
            ]
        },
        {
            key: 'by',
            name: '排序',
            value: [
                { n: '按最新', v: 'update' },
                { n: '按添加', v: 'desc' },
                { n: '按最热', v: 'hot' },
                { n: '按评分', v: 'score' }
            ]
        }
    ],

    '3': [
        {
            key: 'cateId',
            name: '分类',
            value: [
                { n: '全部', v: '0' },
                { n: '真人秀', v: '305' },
                { n: '音乐', v: '302' },
                { n: '搞笑', v: '304' },
                { n: '家庭', v: '301' },
                { n: '曲艺', v: '303' }
            ]
        },
        {
            key: 'area',
            name: '地区',
            value: [
                { n: '全部', v: '0' },
                { n: '大陆', v: '大陆' },
                { n: '香港', v: '香港' },
                { n: '台湾', v: '台湾' },
                { n: '美国', v: '美国' },
                { n: '韩国', v: '韩国' },
                { n: '日本', v: '日本' },
                { n: '英国', v: '英国' },
                { n: '法国', v: '法国' },
                { n: '泰国', v: '泰国' },
                { n: '新加坡', v: '新加坡' },
                { n: '马来西亚', v: '马来西亚' },
                { n: '其它', v: '其它' }
            ]
        },
        {
            key: 'year',
            name: '年份',
            value: [
                { n: '全部', v: '0' },
                { n: '2026', v: '2026' },
                { n: '2025', v: '2025' },
                { n: '2024', v: '2024' },
                { n: '2023', v: '2023' },
                { n: '2022', v: '2022' },
                { n: '2021', v: '2021' },
                { n: '2020', v: '2020' }
            ]
        },
        {
            key: 'by',
            name: '排序',
            value: [
                { n: '按最新', v: 'update' },
                { n: '按添加', v: 'desc' },
                { n: '按最热', v: 'hot' },
                { n: '按评分', v: 'score' }
            ]
        }
    ],

    '4': [
        {
            key: 'cateId',
            name: '分类',
            value: [
                { n: '全部', v: '0' },
                { n: '日本', v: '401' },
                { n: '国产', v: '402' },
                { n: '欧美', v: '403' }
            ]
        },
        {
            key: 'area',
            name: '地区',
            value: [
                { n: '全部', v: '0' },
                { n: '大陆', v: '大陆' },
                { n: '香港', v: '香港' },
                { n: '台湾', v: '台湾' },
                { n: '美国', v: '美国' },
                { n: '韩国', v: '韩国' },
                { n: '日本', v: '日本' },
                { n: '英国', v: '英国' },
                { n: '法国', v: '法国' },
                { n: '泰国', v: '泰国' },
                { n: '新加坡', v: '新加坡' },
                { n: '马来西亚', v: '马来西亚' },
                { n: '其它', v: '其它' }
            ]
        },
        {
            key: 'year',
            name: '年份',
            value: [
                { n: '全部', v: '0' },
                { n: '2026', v: '2026' },
                { n: '2025', v: '2025' },
                { n: '2024', v: '2024' },
                { n: '2023', v: '2023' },
                { n: '2022', v: '2022' },
                { n: '2021', v: '2021' },
                { n: '2020', v: '2020' },
                { n: '2019', v: '2019' },
                { n: '2018', v: '2018' },
                { n: '2017', v: '2017' },
                { n: '2016', v: '2016' },
                { n: '2015', v: '2015' },
                { n: '2014', v: '2014' },
                { n: '2013', v: '2013' },
                { n: '2012', v: '2012' },
                { n: '2011', v: '2011' },
                { n: '2010', v: '2010' }
            ]
        },
        {
            key: 'by',
            name: '排序',
            value: [
                { n: '按最新', v: 'update' },
                { n: '按添加', v: 'desc' },
                { n: '按最热', v: 'hot' },
                { n: '按评分', v: 'score' }
            ]
        }
    ]
},

// 欧乐 _vv 签名
getVV: function () {
    var str = String(Math.floor(Date.now() / 1000));
    var r = ['', '', '', ''];

    for (var i = 0; i < str.length; i++) {
        var code = str.charCodeAt(i).toString(2);

        r[0] += code.slice(2, 3);
        r[1] += code.slice(3, 4);
        r[2] += code.slice(4, 5);
        r[3] += code.slice(5);
    }

    var a = [];

    for (var j = 0; j < r.length; j++) {
        var x = r[j] ? parseInt(r[j], 2).toString(16) : '0';

        if (x.length === 1) {
            x = '00' + x;
        } else if (x.length === 2) {
            x = '0' + x;
        }

        a.push(x);
    }

    var md = md5(str);

    return md.slice(0, 3) +
        a[0] +
        md.slice(6, 11) +
        a[1] +
        md.slice(14, 19) +
        a[2] +
        md.slice(22, 27) +
        a[3] +
        md.slice(30);
},

一级: 'js:do{\
    var page = MY_PAGE || 1;\
    var cate = MY_CATE || "1";\
    var fl = MY_FL || {};\
    var cateId = fl.cateId || "0";\
    var area = fl.area || "0";\
    var year = fl.year || "0";\
    var by = fl.by || "update";\
    var vv = rule.getVV();\
    var url = rule.host + "/v1/pub/vod/list/true/3/0/" + area + "/" + cate + "/" + cateId + "/" + year + "/" + by + "/" + page + "/48?_vv=" + vv;\
    var d = [];\
    try {\
        var html = request(url, {headers: rule.headers});\
        var json = JSON.parse(html);\
        var list = json && json.data && json.data.list ? json.data.list : [];\
        for (var i = 0; i < list.length; i++) {\
            var e = list[i];\
            if (!e || !e.id) continue;\
            d.push({\
                title: e.name || "",\
                img: e.pic ? "https://static.olelive.com/" + e.pic : "",\
                desc: e.remarks || "",\
                content: e.name || "",\
                url: String(e.id)\
            });\
        }\
    } catch (e) {\
        log("欧乐一级错误: " + e);\
    }\
    setResult(d);\
}while(false);',

二级: 'js:do{\
    var id = MY_URL;\
    var vv = rule.getVV();\
    var url = rule.host + "/v1/pub/vod/detail/" + id + "/true?_vv=" + vv;\
    try {\
        var html = request(url, {headers: rule.headers});\
        var json = JSON.parse(html);\
        var data = json && json.data ? json.data : {};\
        VOD = {\
            vod_id: String(id),\
            vod_name: data.name || "",\
            vod_pic: data.pic ? "https://static.olelive.com/" + data.pic : "",\
            vod_year: data.year || "",\
            vod_area: data.area || "",\
            vod_actor: data.actor || "",\
            vod_director: data.director || "",\
            vod_content: data.blurb || data.content || "",\
            vod_play_from: "欧乐影院",\
            vod_play_url: ""\
        };\
        var urls = data.urls || [];\
        var plays = [];\
        for (var i = 0; i < urls.length; i++) {\
            var p = urls[i];\
            if (!p || !p.url) continue;\
            plays.push((p.title || ("第" + (i + 1) + "集")) + "$" + p.url);\
        }\
        VOD.vod_play_url = plays.join("#");\
    } catch (e) {\
        log("欧乐二级错误: " + e);\
    }\
}while(false);',

搜索: 'js:do{\
    var page = MY_PAGE || 1;\
    var wd = KEY || "";\
    var vv = rule.getVV();\
    var url = rule.host + "/v1/pub/index/search/" + encodeURIComponent(wd) + "/vod/0/" + page + "/48?_vv=" + vv;\
    var d = [];\
    try {\
        var html = request(url, {headers: rule.headers});\
        var json = JSON.parse(html);\
        var groups = json && json.data && json.data.data ? json.data.data : [];\
        for (var i = 0; i < groups.length; i++) {\
            var group = groups[i];\
            if (!group || group.type !== "vod" || !group.list) continue;\
            for (var j = 0; j < group.list.length; j++) {\
                var e = group.list[j];\
                if (!e || !e.id) continue;\
                if (e.vip === true) continue;\
                d.push({\
                    title: e.name || "",\
                    img: e.pic ? "https://static.olelive.com/" + e.pic : "",\
                    desc: e.remarks || "",\
                    content: e.name || "",\
                    url: String(e.id)\
                });\
            }\
        }\
    } catch (e) {\
        log("欧乐搜索错误: " + e);\
    }\
    setResult(d);\
}while(false);',

lazy: 'js:input = {parse: 0, jx: 0, url: input, header: {"User-Agent": "Mozilla/5.0", "Referer": "https://www.olevod.com/"}};'
```

};
