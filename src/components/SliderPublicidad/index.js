import React,{useState} from 'react';
import {Carousel,CarouselItem,CarouselControl,CarouselIndicators} from 'reactstrap';
const SliderPublicidad = ({img,img_dos,img_tres}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const items = [
        {
          src: img,
          altText: 'Slide 1',
          caption: 'Slide 1'
        },
        {
          src: img_dos,
          altText: 'Slide 2',
          caption: 'Slide 2'
        },
        {
          src: img_tres,
          altText: 'Slide 3',
          caption: 'Slide 3'
        }
    ];
    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }
    
    const slides = items.map((item) => {
        return (
          <CarouselItem
            onExiting={() => setAnimating(true)}
            onExited={() => setAnimating(false)}
            key={item.src}
          >
            <img src={item.src} alt={item.altText} className="d-block w-100"/>
          </CarouselItem>
        );
    });

    return (
        <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}>
            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
    );
}
 
export default SliderPublicidad;