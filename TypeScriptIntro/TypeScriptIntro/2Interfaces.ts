//2 - INTERFACES

// How do you annotate a custom type?

function doSomethingWithObject(obj: { propOne: string, propTwo: string }) {
    return obj.propOne + obj.propTwo;
}
function doSomethingElseWithObject(obj: { propOne: string, propTwo: string }) {
    return obj.propOne;
}

var someObject = {
    propOne: 'some string',
    propTwo: 'another string'
};

doSomethingWithObject(someObject);





//Interfaces come to the rescue
interface ISliderConfig {
    numberOfSlides: number;
    autoplay: boolean;
    showNavigation: boolean;
    //can contain optional properties
    textColor?: string;
    displayBorders?: boolean;
    borderColor?: string;
}

function initializeCarousel(data: ISliderConfig) {
    var useAutoplay = data.autoplay;
    var textColor = data.textColor || '#000';

    console.log('Initializing carousel with the following values:');
    console.log(`useAutoplay ${useAutoplay}`);
    console.log(`textColor ${textColor}`);

}

window.onload = () => {

    var config: ISliderConfig = {
        numberOfSlides: 5,
        autoplay: true,
        showNavigation: true
    };
    initializeCarousel(config);

};