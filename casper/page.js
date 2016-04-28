var casper = require('casper').create({
    clientScripts: [
        'includes/jquery-1.12.1.min.js'
    ]
});
var utils = require('utils');
var G = window;
G.urls = [];

base_url = 'http://www.dianping.com/search/keyword/2/0_%E8%B6%B3%E7%90%83%E5%9C%BA'
css_selector_next_page_a = "html > body#top > div[class='section Fix'] > div[class='content-wrap'] > div[class='shop-wrap'] > div[class='page'] > a[class='next']"

casper.start();

casper.open(base_url);

casper.then(function(){
    next_page_a = this.getElementInfo(css_selector_next_page_a)
    url = ''
    if (next_page_a.attributes.href) {
        G.urls.push(next_page_a.attributes.href)
        url = next_page_a.attributes.href
    }
    utils.dump('first url')
    utils.dump(url)
    while(url){
        utils.dump('into while')
        casper.then(function(){
            casper.open(url);
            caspern.then(function(){
                utils.dump('into while then')
                next_page_a = this.getElementInfo(css_selector_next_page_a);
                utils.dump(next_page_a);
                url = ''
                if (next_page_a.attributes.href) {
                    G.urls.push(next_page_a.attributes.href)
                    url = next_page_a.attributes.href
                }
            })
        })
    }
})

casper.then(function(){
    utils.dump(G.urls)
})
casper.run();
