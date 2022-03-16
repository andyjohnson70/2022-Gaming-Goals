import React, { Component } from 'react';
import { useInView } from 'react-intersection-observer';
import ModalVideo from 'react-modal-video'
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
                <div>
                    {this.props.accountLink 
                        ? <a  href={this.props.accountLink} target="_blank"><img className='floating-image' src={this.props.floatingImage} /></a> 
                        : <img className='floating-image' src={this.props.floatingImage} /> 
                    }
                    
                </div>
            </div>
        );
    }
}

class SlayTheSpire extends Component {

    constructor () {
        super()
        this.state = {
            isOpen: false
        }
        this.openModel = this.openModel.bind(this)
    }

    openModel () {
        this.setState({isOpen : true})
    }

    render() {
        const style = {
            backgroundImage:  "url("+this.props.bannerImage+")" //linear-gradient(to left, rgba(68, 68, 68, 0) 0%, rgba(68, 68, 68, 0) 25%, rgba(68, 68, 68, 1) 80%, rgba(68, 68, 68, 1) 100%), 
        };
        return(
            <div className='game-panel' style={style}>
                <GamePanelHeader title={this.props.title} goal={this.props.goal} />
                <div className='.game-panel-image-container'>
                    {this.props.floatingImages ? this.props.floatingImages.map((imageUrl, index) => 
                        1 == this.props.charactersCompleted[index] 
                            ? <div className='floating-image-container'>
                                <ModalVideo channel="custom" url={this.props.winningClips[index]} autoplay isOpen={this.state.isOpen} onClose={() => this.setState({isOpen: false})} />
                                <img onClick={this.openModel} key={index} className='floating-image' src={imageUrl} />
                              </div>
                            : <img key={index} className='floating-image' src={imageUrl} />
                    ) : null}
                </div>
            </div>
        );
    }
}

export { GamePanel, SlayTheSpire };