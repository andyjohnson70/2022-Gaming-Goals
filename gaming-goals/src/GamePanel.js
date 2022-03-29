import React, { Component } from 'react';
import { useInView } from 'react-intersection-observer';
import Modal from 'react-modal';
import ModalVideo from 'react-modal-video'
import 'animate.css';
import completed from './img/completed.png';

const GamePanelHeader = ({title, goal, completedImage}) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 1.0
    });
    return (
        <div className='game-text-container' ref={ref}>
            <div className={`game-title ${inView ? 'animate__animated animate__slideInLeft' : 'hide'}`}>{title}</div>
            <div className={`game-goal ${inView ? 'animate__animated animate__delay-1s animate__fadeInDown' : 'hide'}`}>Goal: {goal}</div>
            {completedImage ? <div className={`completed ${inView ? 'animate__animated animate__delay-2s animate__zoomInDown' : 'hide'}`}><img className='completed-image' src={completed} /></div> : null }
        </div>
    );
}

class GamePanel extends Component {

    constructor() {
        super()
        this.state = {
            isOpen: false
        }
        this.openModel = this.openModel.bind(this)
    }

    openModel() {
        this.setState({isOpen : true})
    }

    render() {
        const style = {
            backgroundImage:  "url("+this.props.bannerImage+")" //linear-gradient(to left, rgba(68, 68, 68, 0) 0%, rgba(68, 68, 68, 0) 25%, rgba(68, 68, 68, 1) 80%, rgba(68, 68, 68, 1) 100%), 
        };

        return(
            <div className='game-panel' style={style}>
                <GamePanelHeader title={this.props.title} goal={this.props.goal} completedImage={this.props.completedImage} />
                <div>
                    {this.props.accountLink 
                        ? <a href={this.props.accountLink} target="_blank"><img className='floating-image' src={this.props.floatingImage} /></a> 
                        : this.props.completedImage 
                            ? <div className='floating-image-container'>
                                <Modal
                                    style={{ overlay : {backgroundColor: 'rgba(0,0,0,0.5)'}}}
                                    className='modal'
                                    isOpen={this.state.isOpen}
                                    onRequestClose={() => this.setState({isOpen: false})}
                                >
                                    <img className='modal-image' src={this.props.completedImage}/>
                                </Modal>
                                <img onClick={this.openModel} className='floating-image' src={this.props.floatingImage} />
                              </div> 
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
            isOpen: false,
            url: null
        }
    }

    render() {
        const style = {
            backgroundImage:  "url("+this.props.bannerImage+")" //linear-gradient(to left, rgba(68, 68, 68, 0) 0%, rgba(68, 68, 68, 0) 25%, rgba(68, 68, 68, 1) 80%, rgba(68, 68, 68, 1) 100%), 
        };
        return(
            <div className='game-panel' style={style}>
                <GamePanelHeader title={this.props.title} goal={this.props.goal} />
                <div className='.game-panel-image-container'>
                    <ModalVideo channel="custom" url={this.state.url} autoplay isOpen={this.state.isOpen} onClose={() => this.setState({isOpen: false})} />
                    {this.props.floatingImages ? this.props.floatingImages.map((imageUrl, index) => 
                        1 == this.props.charactersCompleted[index] 
                            ? <div className='floating-image-container'>
                                <img onClick={() => this.setState({isOpen : true, url: this.props.winningClips[index]})} key={index} className='floating-image' src={imageUrl} />
                              </div>
                            : <img key={index} className='floating-image' src={imageUrl} />
                    ) : null}
                </div>
            </div>
        );
    }
}

export { GamePanel, SlayTheSpire };