// 欧乐影院 - 网页爬虫版 (免签名，免API，适配所有TVBox)
var rule = {
    title: '欧乐Web',
    host: 'https://www.olevod.tv',
    class_name: '电影&电视剧&综艺&动漫&短剧&纪录片',
    class_url: '1&2&3&4&5&6',
    searchable: 1,
    quickSearch: 0,
    filterable: 0,

    // 分类列表（抓取网页HTML）
    一级: $js.toString(() => {
        let d = [];
        // 分类映射：1=电影, 2=电视剧 ...
        let classMap = { '1': 'dianying', '2': 'dianshiju', '3': 'zongyi', '4': 'dongman', '5': 'duanju', '6': 'jilupian' };
        let cid = classMap[MY_CATE] || 'dianying';
        let page = MY_PAGE || 1;
        let url = `https://www.olevod.tv/index.php?m=vod-cn-p-${page}.html`;
        
        try {
            let html = request(url, {
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
            });
            // 用正则或pdfh解析列表（这里的class名根据实际网页调整，先写通用结构）
            // 注意：欧乐网页列表可能是 .list-box .item 或 .vod-item
            let items = pdfa(html, '.list-box .item'); 
            if (!items || items.length === 0) {
                // 备用选择器
                items = pdfa(html, '.vod-item');
            }
            items.forEach((it) => {
                let title = pdfh(it, 'a&&Text');
                let href = pdfh(it, 'a&&href');
                let img = pdfh(it, 'img&&src');
                if (title && href) {
                    let id = href.split('/').pop().replace('.html', '');
                    d.push({
                        title: title,
                        img: img || '',
                        url: id
                    });
                }
            });
        } catch (e) {
            log('抓取失败: ' + e.message);
        }
        setResult(d);
    }),

    // 详情页及剧集（抓取播放页HTML）
    二级: $js.toString(() => {
        let VOD = {};
        let vod_id = input;
        let url = `https://www.olevod.tv/play/${vod_id}.html`;
        try {
            let html = request(url, {
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
            });
            // 获取剧名
            let title = pdfh(html, '.detail-title&&Text') || pdfh(html, 'h1&&Text');
            VOD.vod_name = title;
            // 获取封面
            VOD.vod_pic = pdfh(html, '.detail-pic img&&src') || '';
            // 获取简介
            VOD.vod_content = pdfh(html, '.detail-content&&Text') || '';
            // 获取剧集列表（通常在 .play-list a 里）
            let links = pdfa(html, '.play-list a');
            let playUrls = [];
            links.forEach((a) => {
                let ep = pdfh(a, '&&Text');
                let href = pdfh(a, '&&href');
                if (href) {
                    playUrls.push(ep + '$' + href);
                }
            });
            // 如果没找到，尝试备用选择器
            if (playUrls.length === 0) {
                let links2 = pdfa(html, '.list-box a');
                links2.forEach((a) => {
                    let href = pdfh(a, '&&href');
                    if (href && href.includes('play')) {
                        playUrls.push(pdfh(a, '&&Text') + '$' + href);
                    }
                });
            }
            VOD.vod_play_from = '欧乐Web';
            VOD.vod_play_url = playUrls.join('#');
        } catch (e) {
            log('详情抓取失败: ' + e.message);
        }
        setResult(VOD);
    }),

    // 搜索
    搜索: $js.toString(() => {
        let d = [];
        let keyword = input.split('wd=')[1] || input;
        let url = `https://www.olevod.tv/index.php?m=vod-search-p-1&wd=${encodeURIComponent(keyword)}`;
        try {
            let html = request(url, {
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
            });
            let items = pdfa(html, '.list-box .item');
            items.forEach((it) => {
                let title = pdfh(it, 'a&&Text');
                let href = pdfh(it, 'a&&href');
                let img = pdfh(it, 'img&&src');
                if (title && href) {
                    let id = href.split('/').pop().replace('.html', '');
                    d.push({ title: title, img: img || '', url: id });
                }
            });
        } catch (e) {}
        setResult(d);
    })
};
