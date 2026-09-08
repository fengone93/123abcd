// =====================================================
// 欧乐影院 - 伪静态适配版（适配 /vod/type/ 路由）
// 解决 404 问题，兼容最新版欧乐网站结构
// =====================================================

var rule = {
    title: '欧乐Web',
    host: 'https://www.olevod.tv',
    class_name: '电影&电视剧&综艺&动漫&短剧&纪录片',
    class_url: '1&2&3&4&5&6',
    searchable: 1,
    quickSearch: 0,
    filterable: 0,
    timeout: 10000,

    // ========== 一级：分类列表 ==========
    一级: $js.toString(() => {
        let d = [];
        // 分类ID映射（对应 /vod/type/id-分类ID/pg-页码.html）
        let cid = MY_CATE || '1'; 
        let page = MY_PAGE || 1;
        
        // 新版伪静态地址（大多数欧乐站点的标准格式）
        let url = `https://www.olevod.tv/vod/type/id-${cid}/pg-${page}.html`;
        
        log('请求列表: ' + url);
        
        try {
            let html = request(url, {
                headers: { 
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'Referer': 'https://www.olevod.tv/'
                }
            });
            
            // 如果返回404，尝试备用格式（部分站点用 /vodlist/）
            if (html.includes('404') || html.includes('Not Found')) {
                log('主链接404，尝试备用格式...');
                url = `https://www.olevod.tv/index.php?m=vod-list-id-${cid}-pg-${page}-order--by--class-0-year--letter--area--actor--director--lang--state--size--weekstar--.png`;
                html = request(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } });
            }

            // 解析列表（欧乐的列表项通常在 class="movie-list" 或 "vod-list" 下的 li 或 div）
            let items = pdfa(html, '.movie-list .list-item') || pdfa(html, '.vod-list li') || pdfa(html, '.list-box .item');
            
            if (!items || items.length === 0) {
                // 极简备用选择器（抓取所有带链接的图片）
                items = pdfa(html, 'a[href*="/vod/play/"]');
            }

            items.forEach((it) => {
                let title = pdfh(it, 'a&&Text') || pdfh(it, 'img&&alt');
                let href = pdfh(it, 'a&&href');
                let img = pdfh(it, 'img&&src');
                
                // 如果href是相对路径，补全
                if (href && !href.startsWith('http')) {
                    href = 'https://www.olevod.tv' + href;
                }
                
                // 提取视频ID（从 /vod/play/id-xxx.html 或 /play/xxx.html 中提取）
                let id = '';
                if (href) {
                    let match = href.match(/id-(\d+)/);
                    if (match) id = match[1];
                    if (!id) {
                        let match2 = href.match(/\/play\/(\d+)\.html/);
                        if (match2) id = match2[1];
                    }
                }
                
                if (title && id) {
                    d.push({
                        title: title.trim(),
                        img: img || '',
                        desc: '',
                        url: id
                    });
                }
            });

            if (d.length === 0) {
                log('警告：未解析到任何条目，请检查网站是否可访问或页面结构已变');
            }

        } catch (e) {
            log('列表抓取异常: ' + e.message);
        }
        setResult(d);
    }),

    // ========== 二级：详情 & 剧集列表 ==========
    二级: $js.toString(() => {
        let VOD = {};
        let vod_id = input.trim();
        // 新版详情播放页地址
        let url = `https://www.olevod.tv/vod/play/id-${vod_id}.html`;
        
        log('请求详情: ' + url);
        
        try {
            let html = request(url, {
                headers: { 
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'Referer': 'https://www.olevod.tv/'
                }
            });

            // 如果404，尝试老式 /play/ 格式
            if (html.includes('404') || html.includes('Not Found')) {
                url = `https://www.olevod.tv/play/${vod_id}.html`;
                html = request(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } });
            }

            // ---- 提取基础信息 ----
            // 标题（通常在 h1 或 .title 中）
            let title = pdfh(html, 'h1&&Text') || pdfh(html, '.vod-title&&Text') || pdfh(html, '.detail-title&&Text');
            VOD.vod_name = title || '未知影片';
            
            // 封面图
            VOD.vod_pic = pdfh(html, '.detail-pic img&&src') || pdfh(html, '.vod-img img&&src') || pdfh(html, 'img[src*="/uploads/"]&&src');
            if (VOD.vod_pic && !VOD.vod_pic.startsWith('http')) {
                VOD.vod_pic = 'https://www.olevod.tv' + VOD.vod_pic;
            }

            // 简介
            VOD.vod_content = pdfh(html, '.detail-content&&Text') || pdfh(html, '.vod-content&&Text') || pdfh(html, '.desc&&Text');

            // ---- 提取剧集播放列表 ----
            let playUrls = [];
            // 欧乐剧集链接通常在 class="play-list" 或 "url-list" 里
            let links = pdfa(html, '.play-list a') || pdfa(html, '.url-list a') || pdfa(html, '.list-box a[href*="play"]');
            
            if (links.length === 0) {
                // 如果上面没抓到，抓所有包含 "play" 的链接
                links = pdfa(html, 'a[href*="/play/"]');
            }

            links.forEach((a) => {
                let ep = pdfh(a, '&&Text').trim();
                let href = pdfh(a, '&&href');
                if (href) {
                    if (!href.startsWith('http')) href = 'https://www.olevod.tv' + href;
                    // 过滤掉无效链接
                    if (href.includes('javascript') || href.includes('#') || href.includes('void')) return;
                    if (!ep) ep = '第' + (playUrls.length + 1) + '集';
                    playUrls.push(ep + '$' + href);
                }
            });

            // 如果剧集数量超过0，拼接播放源
            if (playUrls.length > 0) {
                VOD.vod_play_from = '欧乐Web';
                VOD.vod_play_url = playUrls.join('#');
                log('成功获取剧集数: ' + playUrls.length);
            } else {
                log('警告：未找到任何剧集链接，页面结构可能变动');
                // 给一个占位，防止报错
                VOD.vod_play_from = '欧乐Web';
                VOD.vod_play_url = '正片$' + url;
            }

        } catch (e) {
            log('详情抓取异常: ' + e.message);
            // 容错返回基本信息
            VOD.vod_name = '解析失败';
            VOD.vod_play_from = '欧乐Web';
            VOD.vod_play_url = '播放地址$' + url;
        }
        setResult(VOD);
    }),

    // ========== 搜索 ==========
    搜索: $js.toString(() => {
        let d = [];
        let keyword = input.split('wd=')[1] || input;
        // 搜索接口通常保持动态格式
        let url = `https://www.olevod.tv/index.php?m=vod-search-p-1&wd=${encodeURIComponent(keyword)}`;
        
        log('搜索关键词: ' + keyword);
        
        try {
            let html = request(url, {
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
            });
            let items = pdfa(html, '.movie-list .list-item') || pdfa(html, '.vod-list li') || pdfa(html, '.list-box .item');
            items.forEach((it) => {
                let title = pdfh(it, 'a&&Text') || pdfh(it, 'img&&alt');
                let href = pdfh(it, 'a&&href');
                let img = pdfh(it, 'img&&src');
                if (title && href) {
                    let id = href.match(/id-(\d+)/)?.[1] || href.match(/\/play\/(\d+)/)?.[1];
                    if (id) {
                        d.push({ title: title.trim(), img: img || '', url: id });
                    }
                }
            });
        } catch (e) {
            log('搜索异常: ' + e.message);
        }
        setResult(d);
    })
};
