(function(window) {

var version="0.0.0";

var document=window.document;

var jQuer=function(selector){
    var a=new jQuer.fn.init(selector);
    return a;
};
jQuer.makeArray= function( arr, results ) {
        var ret = [];

        for(var i=0;i<results.length;i++){
            ret.push(results[i]);
        }

        return ret;
    };
jQuer.fn=jQuer.prototype={
    constructor: jQuer,
    version:version,
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




//////////////
function vendorPropName( style, name ) {

    // shortcut for names that are not vendor prefixed
    if ( name in style ) {
        return name;
    }

    // check for vendor prefixed names
    var capName = name.charAt(0).toUpperCase() + name.slice(1),
        origName = name,
        i = cssPrefixes.length;

    while ( i-- ) {
        name = cssPrefixes[ i ] + capName;
        if ( name in style ) {
            return name;
        }
    }

    return origName;
}
var support = {};
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
var rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" );
var rmsPrefix = /^-ms-/,
    rdashAlpha = /-([\da-z])/gi,
    // Used by jQuer.camelCase as callback to replace()
    fcamelCase = function( all, letter ) {
        return letter.toUpperCase();
    };
jQuer.cssHooks= {
        opacity: {
            get: function( elem, computed ) {
                if ( computed ) {
                    // We should always get a number back from opacity
                    var ret = curCSS( elem, "opacity" );
                    return ret === "" ? "1" : ret;
                }
            }
        }
    };
jQuer.cssNumber={
        "columnCount": true,
        "fillOpacity": true,
        "flexGrow": true,
        "flexShrink": true,
        "fontWeight": true,
        "lineHeight": true,
        "opacity": true,
        "order": true,
        "orphans": true,
        "widows": true,
        "zIndex": true,
        "zoom": true
    };

    // Add in properties whose names you wish to fix before
    // setting or getting the value
jQuer.cssProps={
        // normalize float css property
        //"float": support.cssFloat ? "cssFloat" : "styleFloat"
        "float": true ? "cssFloat" : "styleFloat"
    };
jQuer.camelCase= function( string ) {
        return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
    };
jQuer.fn.remove= function() {
        var elem, elems=this,i = 0;
        for ( ; (elem = elems[i]) != null; i++ ) {
            if ( elem.parentNode ) {
                elem.parentNode.removeChild( elem );
            }
        }
        return this;
    };
jQuer.style= function( elem, name, value, extra ) {
        // Don't set styles on text and comment nodes

        if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
            return;
        }
        if(name===null||!name){
            return;
        }

        // Make sure that we're working with the right name
        var ret, type, hooks,
            origName = jQuer.camelCase( name ),
            style = elem.style;

        name = jQuer.cssProps[ origName ] || ( jQuer.cssProps[ origName ] = vendorPropName( style, origName ) );

        // gets hook for the prefixed version
        // followed by the unprefixed version
        hooks = jQuer.cssHooks[ name ] || jQuer.cssHooks[ origName ];

        // Check if we're setting a value
        if ( value !== undefined ) {
            type = typeof value;

            // convert relative number strings (+= or -=) to relative numbers. #7345
            if ( type === "string" && (ret = rrelNum.exec( value )) ) {
                value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuer.css( elem, name ) );
                // Fixes bug #9237
                type = "number";
            }

            // Make sure that null and NaN values aren't set. See: #7116
            if ( value == null || value !== value ) {
                return;
            }

            // If a number was passed in, add 'px' to the (except for certain CSS properties)
            if ( type === "number" && !jQuer.cssNumber[ origName ] ) {
                value += "px";
            }

            // Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
            // but it would mean to define eight (for every problematic property) identical functions
            if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
                style[ name ] = "inherit";
            }

            // If a hook was provided, use that value, otherwise just set the specified value
            if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

                // Support: IE
                // Swallow errors from 'invalid' CSS values (#5509)
                try {
                    style[ name ] = value;
                } catch(e) {}
            }
            //这里是设值
        } else {
            // If a hook was provided get the non-computed value from there
            if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
                return ret;
            }

            // Otherwise just get the value from the style object
            return style[ name ];
        }
    };
/////////

jQuer.fn.css=function(key,value,needReturn,index){
    if (this.length>1&&!needReturn) {
        for(var i=0;i<this.length;i++){
            this.css(key,value,true,i);
        }
        return this;
    }else{
        index=index||0;
        jQuer.style(this[index],key,value);
        return this;
    }
};

jQuer.fn.init.prototype=jQuer.fn;

window.jQuer = window.$ =jQuer;

})(window);