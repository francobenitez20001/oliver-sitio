import React,{useEffect, useState} from 'react';
import {Carousel,CarouselItem,CarouselControl,CarouselIndicators} from 'reactstrap';
import { connect } from "react-redux";
import * as bannerActions from '../../../store/actions/bannerActions';
const {traerTodas} = bannerActions;
const SliderPublicidad = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    // const items = [
    //     {
    //       src: props.img,
    //       altText: 'Slide 1',
    //       caption: 'Slide 1'
    //     },
    //     {
    //       src: props.img_dos,
    //       altText: 'Slide 2',
    //       caption: 'Slide 2'
    //     },
    //     {
    //       src: props.img_tres,
    //       altText: 'Slide 3',
    //       caption: 'Slide 3'
    //     }
    // ];
    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === props.data.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? props.data.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    useEffect(() => {
      props.traerTodas();
    }, [])
    
    const slides = props.data.map((item) => {
        return (
          <CarouselItem
            onExiting={() => setAnimating(true)}
            onExited={() => setAnimating(false)}
            key={item.url}
          >
            <img src={item.url} alt={item.descripcion} className="d-block w-100"/>
          </CarouselItem>
        );
    });
    
    return (
        <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}>
            <CarouselIndicators items={props.data} activeIndex={activeIndex} onClickHandler={goToIndex} />
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
    );
}

const mapStateToProps = ({bannerReducer})=>{
  return bannerReducer;
}

const mapDispatchToProps = {
  traerTodas
}
 
export default connect(mapStateToProps,mapDispatchToProps)(SliderPublicidad);