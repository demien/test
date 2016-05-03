var casper = require('casper').create({
    clientScripts: [
        'includes/jquery-1.12.1.min.js'
    ]
});
var utils = require('utils');
var G = window;
G.shops = [];

shop_url_list = ['http://www.boyouwang.com/news/line/0-0-102176-0-0-1-1.html', 'http://www.boyouwang.com/news/line/0-0-102175-0-0-1-1.html']

casper.start();

casper.then(function(){

    shop_url_list.map(function(url_list){
           casper.open(url_list);

        casper.then(function(){
            var urls = this.evaluate(function(){
                var css_selector_shop_li = ".product_ul li";
                var css_urls = $(css_selector_shop_li);
                var urls = []
                for (i=0; i<css_urls.length; i++){
                    url = $(css_urls[i]).find('.nr').find('a')[0].href;
                    urls.push(url)
                }
                return urls
            })
            G.shop_urls = urls;
        });

        casper.then(function(){
            G.shop_urls.map(function(url){
                casper.then(function(){
                    casper.open(url);
                    utils.dump(url);
                    casper.then(function(){

                        var shop = this.evaluate(function(){
                            var shop = {}
                            var css_selector_title = "h1"
                            shop['title'] = $(css_selector_title)[0].textContent.trim().split("\n")[0];

                            var css_selector_images = ".jcarousel-clip ul li a img"
                            shop['images'] = $.map($(css_selector_images),function(foo){return foo.src;})
                            return shop
                        });

                        shop['url'] = url
                        G.shops.push(shop);
                    })
                })
            })
        });
    })
})

casper.then(function(){
    utils.dump(G.shops)
})

casper.run();
