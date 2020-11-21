var M = 10;

function radians_to_degrees(radians)
{
  var pi = Math.PI;
  return radians * (180/pi);
}
function compare(arr1, arr2){
    return hands() + hands() + shoulder() + shoulder() + leg() + leg()
}

function deg(x1, y1, x2, y2){
    var x = x2 - x1;
    var y = y2 - y1;
    if (x >= 0 & y >= 0){
        return radians_to_degrees(Math.atan(Math.abs(y) / Math.abs(x)));
    } else if (x <= 0 & y >= 0){
        return 180 - radians_to_degrees(Math.atan(Math.abs(y) / Math.abs(x)));
    } else if (x >= 0 & y <= 0){
        return 180 + radians_to_degrees(Math.atan(Math.abs(y) / Math.abs(x)));
    } else if (x <= 0 & y <= 0){
        return 360 + radians_to_degrees(Math.atan(Math.abs(y) / Math.abs(x)));
    }
}



function cmp(p1, p2, p3, p4, t){
    var x1 = p1[0];
    var y1 = p1[1];
    var x2 = p2[0];
    var y2 = p2[1];
    var x3 = p3[0];
    var y3 = p3[1];
    var x4 = p4[0];
    var y4 = p4[1];
    var deg1 = deg(x1, y1, x2, y2);
    var deg2 = deg(x3, y3, x4, y4);
    var val = (Math.max(0, t - Math.abs((deg2 - deg1)))) / t
    return val * M;
}

function hands(ls1, e1, h1, ls2, e2, h2, t){
    return cmp(ls1, e1, ls2, e2, t) + cmp(e1, h1, e2, h2, t);
}

function shoulder(ls1, rs1, ls2, rs2, t){
    return cmp(ls1, rs1, ls2, rs2, t);
}

function leg(hp1, k1, l1, hp2, k2, l2, t){
    return cmp(hp1, k1, hp2, k2, t) + cmp(k1, l1, k2, l2, t);
}

function score(host, client){
    var i;
    res = 0;
    for (i = 0; i < host.length; i++){
        res = Math.max(compare(host[i], client), res);
    }
    return res;
}

document.write(cmp([0, 0], [1, 1], [0, 0], [1, 1], 20));