var gallery = document.querySelector('#galleryid');
var getVal = function (elem, style) { return parseInt(window.getComputedStyle(elem).getPropertyValue(style)); };
var getHeight = function (item) { return item.querySelector('.content').getBoundingClientRect().height; };

// Adjusts each .gallery-item's vertical span (gridRowEnd) based on its content height
// Creates a Pinterest-like layout with rows of variable height but grid-aligned
var resizeAll = function () {
    var altura = getVal(gallery, 'grid-auto-rows');
    var gap = getVal(gallery, 'grid-row-gap');
    gallery.querySelectorAll('.gallery-item').forEach(function (item) {
        var el = item;
        el.style.gridRowEnd = "span " + Math.ceil((getHeight(item) + gap) / (altura + gap));
    });
};

String.prototype.format = function() {
    var formatted = this;
    for( var arg in arguments ) {
        formatted = formatted.replace("{" + arg + "}", arguments[arg]);
    }
    return formatted;
};

// Adds a byebye class to all <img> initially (maybe hides them)
// When each image loads, it recalculates the corresponding grid row span for layout consistency
// Removes byebye to reveal the image
gallery.querySelectorAll('img').forEach(function (item) {
    item.classList.add('byebye');

    function onLoadHandler() {
        var altura = getVal(gallery, 'grid-auto-rows');
        var gap = getVal(gallery, 'grid-row-gap');
        var gitem = item.closest('.gallery-item');
        gitem.style.gridRowEnd = "span " + Math.ceil((getHeight(gitem) + gap) / (altura + gap));
        item.classList.remove('byebye');
    }

    if (item.complete) {
        console.log(item.src);
        onLoadHandler();  // execute immediately
    } else {
        item.addEventListener('load', onLoadHandler);
    }

});


// Ensures layout is recalculated if the window resizes
window.addEventListener('resize', resizeAll);
var bigimg = document.getElementById('bigimg');
var modal = document.getElementById("bgmodal");
//var abc = gallery.querySelectorAll('.gallery-item');
gallery.querySelectorAll('.gallery-item').forEach(function (item) {
    item.addEventListener('click', function () {  
        modal.style.display = "block";
        // bigimg.src = this.childNodes[1].childNodes[0].src;
        bigimg.src = this.querySelector("img").src;
        
        /*var rect = item.getBoundingClientRect();
        // these are relative to the viewport, i.e. the window
        var top_center = rect.top + rect.height/2;
        var left_center = rect.left + rect.width/2;
        var bigrect = bigimg.getBoundingClientRect();
        var leftshift = left_center - (bigrect.left + bigrect.width/2);
        var topshift = top_center - (bigrect.top + bigrect.height/2);
        //item.classList.toggle('full');     
        transtring = "translate({0}px, {1}px)".format(leftshift.toString(), topshift.toString());
        console.log(transtring);
        bigimg.style.transform = transtring;*/
    });
});
modal.onclick = function() { 
this.style.display = "none";
}

  


