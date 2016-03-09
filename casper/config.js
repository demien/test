var config1 = {
    'shop': {
        'css': "html > body#top > div[class='section Fix'] > div[class='content-wrap'] > div[class='shop-wrap'] > div[class='content'] > div[id='shop-all-list'] > ul > li",
        'children': {
            'title': {
                'css': "div[class='txt'] > div[class='tit'] > a > h4"
            },
            'url': {
                'css': "div[class='txt'] > div[class='tit'] > a",
                'return': 'href'
            }
        }
    }
}

var config2 = {
    'address': {
        'css': "html > body#top > div[id='body'] > div[class='body-content clearfix'] > div[class='main'] > div[id='basic-info'] > div[class='expand-info address'] > span[class='item']"
    },
    'comment_cnt': {
        'css': "html > body#top > div[id='body'] > div[class='body-content clearfix'] > div[class='main'] > div[id='comment'] > h2[class='mod-title J-tab'] > a[class='item current'] > span[class='sub-title']"
    }
}

open(base_url)

shops = scrape_css(config1)

loop:open 
    with 
        shop.map(function(x){return x.a.href})
    do
        scrape_css(config2)
