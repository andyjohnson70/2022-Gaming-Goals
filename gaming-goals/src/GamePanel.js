import React, { Component, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import 'animate.css';

const GamePanelHeader = ({title, goal}) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 1.0
    });
    return (
        <div className='game-text-container' ref={ref}>
            <div className={`game-title ${inView ? 'animate__animated animate__slideInLeft' : 'hide'}`}>{title}</div>
            <div className={`game-goal ${inView ? 'animate__animated animate__delay-1s animate__fadeInDown' : 'hide'}`}>Goal: {goal}</div>
        </div>
    );
}

class GamePanel extends Component {
    
    render() {
        const style = {
            backgroundImage:  "url("+this.props.bannerImage+")" //linear-gradient(to left, rgba(68, 68, 68, 0) 0%, rgba(68, 68, 68, 0) 25%, rgba(68, 68, 68, 1) 80%, rgba(68, 68, 68, 1) 100%), 
        };
        return(
            <div className='game-panel' style={style}>
                <GamePanelHeader title={this.props.title} goal={this.props.goal} />
                <div className='game-panel-image-container'>
                    {this.props.floatingImages ? this.props.floatingImages.map((imageUrl, index) => 
                        <img key={index} className='floating-image' src={imageUrl} />
                    ) : null}
                </div>
            </div>
        );
    }
}

export default GamePanel;