(function(){

    var Engine = function Engine(){
        // console.log('223')
        browser = require('casper').create();
        console.log('223')
    };

    Engine.prototype.say_hi = function(){
        this.echo('hi');
        console.log('hi');
    };

    // Engine.prototype.getElementsInfo = function(){
    //     return this.browser.getElementsInfo.apply(this.browser, arguments)
    // };

    // Engine.prototype.open = function(){
    //     return this.browser.open.apply(this.browser, arguments)
    // }

    Engine.prototype.run = function(){
        // console.log(arguments)
        __steps = arguments[0]
        steps = __steps.map(function(step){
            console.log(step)
            this.browser.then(step())
        })

        this.browser.prototype.run.apply(this.browser, arguments)
    }

    // Engine.prototype.then = function(){
    //     return this.browser.then.apply(this.browser, arguments)
    // }

    module.exports = Engine;

})();
