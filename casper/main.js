var casper = require('casper').create({
    clientScripts: [
        'includes/jquery-1.12.1.min.js'
    ]
});
var utils = require('utils');
var G = window;
G.result = [];

base_url = 'http://www.dianping.com/search/keyword/2/0_%E8%B6%B3%E7%90%83%E5%9C%BA'
css_selector_shop = "html > body#top > div[class='section Fix'] > div[class='content-wrap'] > div[class='shop-wrap'] > div[class='content'] > div[id='shop-all-list'] > ul > li"
css_selector_shop_a = "html > body#top > div[class='section Fix'] > div[class='content-wrap'] > div[class='shop-wrap'] > div[class='content'] > div[id='shop-all-list'] > ul > li > div[class='txt'] > div[class='tit'] > a"
css_selector_shop_title = "html > body#top > div[class='section Fix'] > div[class='content-wrap'] > div[class='shop-wrap'] > div[class='content'] > div[id='shop-all-list'] > ul > li > div[class='txt'] > div[class='tit'] > a > h4"
css_selector_shop_address = "html > body#top > div[id='body'] > div[class='body-content clearfix'] > div[class='main'] > div[id='basic-info'] > div[class='expand-info address'] > span[class='item']"
css_selector_shop_comment_cnt = "html > body#top > div[id='body'] > div[class='body-content clearfix'] > div[class='main'] > div[id='comment'] > h2[class='mod-title J-tab'] > a[class='item current'] > span[class='sub-title']"

casper.start();

casper.open(base_url);

casper.then(function(){
    var shops = this.evaluate(function(){
        css_selector_shop = "html > body#top > div[class='section Fix'] > div[class='content-wrap'] > div[class='shop-wrap'] > div[class='content'] > div[id='shop-all-list'] > ul > li";
        css_shops = $(css_selector_shop);
        shops = []
        for (i=0; i<css_shops.length; i++){
            shop = {};
            css_shop = css_shops[i];
            title = $(css_shop).find("div[class='txt'] > div[class='tit'] > a > h4")[0].innerHTML;
            href = $(css_shop).find("div[class='txt'] > div[class='tit'] > a")[0].href;
            shop['title'] = title;
            shop['href'] = href;
            shops.push(shop);
        }
        return shops
    });
    G.shops = shops;
})

casper.then(function(){
    G.shops.map(function(shop){
        casper.then(function(){
            url = shop.href
            casper.open(url);
            casper.then(function(){
                utils.dump(url);
                elements_shop_address = this.getElementInfo(css_selector_shop_address);
                elements_shop_comment_cnt = this.getElementInfo(css_selector_shop_comment_cnt);
                G.result.push({'title': shop.title, 'address': elements_shop_address.text.trim(), 'url': url, 'comment_cnt': elements_shop_comment_cnt.text.trim()})
            });
        })
    })
})

casper.then(function(){
    utils.dump(G.result)
})

casper.run();
