var casper = require('casper').create({
    clientScripts: [
        'includes/jquery-1.12.1.min.js'
    ]
});
var utils = require('utils');
var G = window;
G.shops = [];

shop_url_list = []
base_url = 'http://www.boyouwang.com/news/ifree/0-0-102180-0-0-1-'
for (i=1; i<13; i++){
    url = base_url + i + '.html';
    shop_url_list.push(url);
}

casper.start();

casper.then(function(){

    shop_url_list.map(function(url_list){

        casper.then(function(){
            casper.open(url_list);

            casper.then(function(){
                utils.dump(url_list);
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
                                String.prototype.ntrim = function(){
                                    var lines = this.split('\n').map(function(line){
                                        return line.trim()
                                    })
                                    return lines.join('\n')
                                }

                                var shop = {}
                                var css_selector_title = "h1"
                                shop['title'] = $(css_selector_title)[0].textContent.split("\n")[1].trim();

                                var css_selector_images = ".jcarousel-clip ul li a img"
                                shop['images'] = $.map($(css_selector_images),function(foo){return foo.src;})

                                var css_selector_selling_point = "#tab1 .bd"
                                shop['selling_point'] = $(css_selector_selling_point).text().ntrim()

                                var css_selector_travel = ".travel"
                                var travel = $.map($(css_selector_travel), function(section_dom){
                                    var section = {}
                                    section['title'] = $(section_dom).find('h4').text().trim();
                                    section['text'] = $(section_dom).find('.desc').text().trim();
                                    section['image'] = $(section_dom).find('img').attr('src');
                                    return section
                                })
                                shop['travel'] = travel;

                                var css_selector_fee = "#tab3 .bd"
                                shop['fee'] = $(css_selector_fee).text().ntrim()

                                var css_selector_notice = "#tab4 .bd"
                                shop['notice'] = $(css_selector_fee).text().ntrim()

                                var css_selector_description = ".d-info-content"
                                shop['description'] = $(css_selector_description).text().ntrim()

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
})

casper.then(function(){
    utils.dump(G.shops)
})

casper.run();
