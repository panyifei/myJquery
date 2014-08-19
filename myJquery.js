(function(window) {
var document=window.document;
var jQuer=function(selector){
    var a=new jQuer.fn.init(selector);
    return a;
};
jQuer.fn=jQuer.prototype={
    constructor: jQuer,
    init:function(selector){
        var ret=[];
        var res=document.querySelectorAll(selector);
        for(var a=0;a<res.length;a++){
            this[a]=res[a];
        }
        this.length=res.length;
        return this;
    }
};
jQuer.cssNumber={
        "columnCount": true,"fillOpacity": true,"flexGrow": true,"flexShrink": true,"fontWeight": true,"lineHeight": true,"opacity": true,"order": true,"orphans": true,"widows": true,"zIndex": true,"zoom": true
    };//一些特殊的,不需要加单位的属性
jQuer.fn.remove= function() {
        var elem, elems=this,i = 0;
        for ( ; (elem = elems[i]) != null; i++ ) {
            if ( elem.parentNode ) {
                elem.parentNode.removeChild( elem );
            }
        }
        return this;
    };//删除方法,删去节点
jQuer.style= function( elem, name, value, extra ) {
        if ( !elem || !elem.style ) {
            return;
        }
        if(name===null||!name){
            return;
        }
        var ret, type,
            style = elem.style;
        ifExist = style[name];
        if (!ifExist&&ifExist===undefined) {
            return;
        };
        if ( value !== undefined ) {
            type = typeof value;
            if ( value == null || value !== value ) {
                return;
            }//value没有设为null,且不为NaN
            if ( type === "number" && !jQuer.cssNumber[ origName ] ) {
                value += "px";
            }//除了特殊的style，其他的数字都加上px
            style[ name ] = value;
            //这里是设值
        } else {
            return style[ name ];//没有value值,且得到了正确的key,就直接返回属性的详细.
        }
    };//真实的css调用的地方
jQuer.fn.css=function(key,value,needReturn,index){
    if (this.length>1&&!needReturn) {
        for(var i=0;i<this.length;i++){
            this.css(key,value,true,i);
        }
        return this;
    }else{
        index=index||0;
        if (!value||value===undefined) {
            return jQuer.style(this[index],key,value);
        };
        jQuer.style(this[index],key,value);
        return this;
    }
};//根据调用的对象决定如何调用style
jQuer.fn.init.prototype=jQuer.fn;
window.jQuer = window.$ =jQuer;//将$设置给jQuer
})(window);