var casper = require('casper').create();
var utils = require('utils');
var G = window;
G.result = {};


base_url = 'http://www.dianping.com/search/keyword/2/0_%E8%B6%B3%E7%90%83%E5%9C%BA'
css_selector_shop = "html > body#top > div[class='section Fix'] > div[class='content-wrap'] > div[class='shop-wrap'] > div[class='content'] > div[id='shop-all-list'] > ul > li"
css_selector_shop_a = "html > body#top > div[class='section Fix'] > div[class='content-wrap'] > div[class='shop-wrap'] > div[class='content'] > div[id='shop-all-list'] > ul > li > div[class='txt'] > div[class='tit'] > a"
css_selector_shop_title = "html > body#top > div[class='section Fix'] > div[class='content-wrap'] > div[class='shop-wrap'] > div[class='content'] > div[id='shop-all-list'] > ul > li > div[class='txt'] > div[class='tit'] > a > h4"
css_selector_shop_address = "html > body#top > div[id='body'] > div[class='body-content clearfix'] > div[class='main'] > div[id='basic-info'] > div[class='expand-info address'] > span[class='item']"

casper.start();

casper.open(base_url);

casper.then(function(){
    elements_shop_a = this.getElementsInfo(css_selector_shop_a);
    G.shop_urls = elements_shop_a.map(function(item) { 
        return item['attributes']['href'];
    });
    G.shop_titles = elements_shop_a.map(function(item) { 
        return item['text'];
    });
})

casper.then(function(){
    G.shop_urls.map(function(url){
        casper.then(function(){
            url = 'http://www.dianping.com' + url;
            casper.open(url);
            casper.then(function(){
                utils.dump(url);
                elements_shop_address = this.getElementInfo(css_selector_shop_address);
                G.result[url] = elements_shop_address;
            });
        })
        
    })
})

casper.then(function(){
    utils.dump(G.result)
    utils.dump(G.shop_titles)
})

casper.run();
