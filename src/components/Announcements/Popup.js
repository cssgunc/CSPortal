import React from 'react';
import { Link } from 'react-router-dom';
import ViewWithTopBorder from '../General/ViewWithTopBorder';

// import './style.css';

class Popup extends React.Component {
  render() {
    return (
    <ViewWithTopBorder>
      <div className='card'
            // style={{position: 'fixed',
            //         width: '100',
            //         height: '100',
            //         backgroundcolor: 'rgba(0,0,0, 0.5)'}}
                    >
        <div className='card-content'
            // style={{position: 'absolute'}}
            >
          <h1>{this.props.text}</h1>
        <Link onClick={this.props.closePopup}>close detailed view</Link>
        </div>
      </div>
      </ViewWithTopBorder>
    );
  }
}

export default Popup;