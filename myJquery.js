(function(window) {

var version="0.0.0";

var jQuer=function(selector,context){
    return new jQuer.fn.init(selector,context);
};

var  document = window.document;



jQuer.type=function( obj ) {
        if ( obj == null ) {
            return obj + "";
        }
        return typeof obj === "object" || typeof obj === "function" ?
            class2type[ toString.call(obj) ] || "object" :
            typeof obj;
    };

jQuer.isArray=Array.isArray || function( obj ) {
        return jQuery.type(obj) === "array";
    };

var rootjQuer;
jQuer.fn=jQuer.prototype={
    jQuer: version,
    constructor: jQuer
};

var init = jQuer.fn.init= function( selector, context) {
            if(!selector){
                return false;
            }
            if(typeof selector === "string"){
                return rootjQuer.find(selector);
            }else if ( selector.nodeType === 9) {
                this.context = this[0] = selector;
                this.length = 1;
                return this;
                //这里是处理节点的,如document,怎么处理的还没看
            } else{
                console.log("没招到");
            }
};//用来返回找到的元素
init.prototype = jQuer.fn;

jQuer.fn.css= function( name, value ) {
        return access( this, function( elem, name, value ) {
            var styles, len,
                map = {},
                i = 0;

            if ( jQuer.isArray( name ) ) {
                styles = getStyles( elem );
                len = name.length;

                for ( ; i < len; i++ ) {
                    map[ name[ i ] ] = jQuer.css( elem, name[ i ], false, styles );
                }

                return map;
            }

            return value !== undefined ?
                jQuer.style( elem, name, value ) :
                jQuer.css( elem, name );
        }, name, value, arguments.length > 1 );
    };
    //原生的jQuer的css方法

    

var access = jQuer.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
    var i = 0,
        length = elems.length,
        bulk = key == null;
    //console.log("bulk="+bulk);//bulk的用处貌似是判断是否传值了,一般不用
    // Sets many values
    if ( jQuer.type( key ) === "object" ) {
        chainable = true;
        for ( i in key ) {
            jQuer.access( elems, fn, i, key[i], true, emptyGet, raw );
        }
    // Sets one value
    } else if ( value !== undefined ) {
        chainable = true;
        if ( !jQuer.isFunction( value ) ) {
            raw = true;
        }
        if ( bulk ) {
            // Bulk operations run against the entire set
            if ( raw ) {
                fn.call( elems, value );
                fn = null;

            // ...except when executing function values
            } else {
                bulk = fn;
                fn = function( elem, key, value ) {
                    return bulk.call( jQuer( elem ), value );
                };
            }
        }
        if ( fn ) {
            for ( ; i < length; i++ ) {
                fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
            }
        }
        //这里是真正的改变的地方,这里的row是true
    }
    //console.log("chainable="+chainable);//判断是否可链式
    return chainable ?
        elems :

        // Gets
        bulk ?
            fn.call( elems ) :
            length ? fn( elems[0], key ) : emptyGet;
};////原生的jQuer的css调用的access方法





rootjQuer = jQuer( document );
//console.log(rootjQuer.find);

jQuer.fn.find= function( selector ) {
        var self = this,
            len = self.length;
        var ret=document.querySelectorAll(selector);
        for(var i=0;i<ret.length;i++){
            console.log(typeof ret[i]);
            ret[i].css=jQuer.fn.css;
            ret[i].prototype=jQuer.fn;
            //console.log(ret[0].prototype.css());
        }

        return ret;
};


window.jQuer = jQuer;

})(window);