import React,{useEffect, useState} from 'react';
import {Carousel,CarouselItem,CarouselControl,CarouselIndicators} from 'reactstrap';
import { connect } from "react-redux";
import * as bannerActions from '../../../store/actions/bannerActions';
const {traerTodas} = bannerActions;
const SliderPublicidad = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [duration, setDuration] = useState(5000);

  const setNewDuration = (index)=>{
    let tiempo = parseInt(props.data[index].tiempo_slider)*1000;
    setDuration(tiempo);
    return
  }

  const next = () => {
      if (animating) return;
      const nextIndex = activeIndex === props.data.length - 1 ? 0 : activeIndex + 1;
      setNewDuration(nextIndex);
      setActiveIndex(nextIndex);
  }

  const previous = () => {
      if (animating) return;
      const nextIndex = activeIndex === 0 ? props.data.length - 1 : activeIndex - 1;
      setNewDuration(nextIndex);
      setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
      if (animating) return;
      setNewDuration(newIndex);
      setActiveIndex(newIndex);
  }

  useEffect(() => {
    if(props.data.length===0){
      props.traerTodas();
    }
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
          previous={previous}
          interval={duration}>
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