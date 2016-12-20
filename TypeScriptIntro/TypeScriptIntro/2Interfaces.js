//2 - INTERFACES
// How do you annotate a custom type?
function doSomethingWithObject(obj) {
    return obj.propOne + obj.propTwo;
}
function doSomethingElseWithObject(obj) {
    return obj.propOne;
}
var someObject = {
    propOne: 'some string',
    propTwo: 'another string'
};
doSomethingWithObject(someObject);
function initializeCarousel(data) {
    var useAutoplay = data.autoplay;
    var textColor = data.textColor || '#000';
    console.log('Initializing carousel with the following values:');
    console.log("useAutoplay " + useAutoplay);
    console.log("textColor " + textColor);
}
window.onload = function () {
    var config = {
        numberOfSlides: 5,
        autoplay: true,
        showNavigation: true
    };
    initializeCarousel(config);
};
//# sourceMappingURL=2Interfaces.js.map