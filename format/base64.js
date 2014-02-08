(function(){
  var table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  String.prototype.toBase64 = function() {
    var s = this, padding=0;
    while (s.length%3) { s += "\0"; ++padding; }
    return s.match(/.../g).map(function(v,i,a){
      var b0 = v.charCodeAt(0)>>2, b1 = ((v.charCodeAt(0)&0x03)<<4) + (v.charCodeAt(1) >> 4),
        b2 = ((v.charCodeAt(1)&0x0F)<<2) + (v.charCodeAt(2) >> 6), b3 = v.charCodeAt(2)&0x3F;    
      if (padding && i+1===a.length) { b3=64; if (--padding) --padding, b2=64; }
      return table[b0]+table[b1]+table[b2]+table[b3];
    }).join("");
  };
  String.prototype.fromBase64 = function() {
    return this.match(/..../g).map(function(v){
      var b0 = table.indexOf(v[0]), b1 = table.indexOf(v[1]), b2 = table.indexOf(v[2]), b3 = table.indexOf(v[3]);
      var s = String.fromCharCode((b0<<2) + (b1>>4), ((b1&0x0F)<<4) + (b2===64?0:(b2>>2)));
      if (b3!==64) s += String.fromCharCode(((b2&0x03)<<6) + b3);
      return s;
    }).join("");
  };
}());