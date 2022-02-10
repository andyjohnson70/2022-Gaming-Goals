import React, { Component } from 'react';

class GamePanel extends Component {
    
    render() {
        const style = {
            backgroundImage:  "linear-gradient(to left, rgba(68, 68, 68, 0) 0%, rgba(68, 68, 68, 0) 25%, rgba(68, 68, 68, 1) 80%, rgba(68, 68, 68, 1) 100%), url("+this.props.bannerImage+")"
        };
        return(
            <div className='game-panel' style={style}>
                <div>
                    <div className='game-title'>{this.props.title}</div>
                    <div>Goal: {this.props.goal}</div>
                </div>
                <div>
                    {this.props.floatingImages ? this.props.floatingImages.map((imageUrl, index) => 
                        <img key={index} className='floating-image' src={imageUrl} />
                    ) : null}
                </div>
            </div>
        );
    }
}

export default GamePanel;