import React from 'react';
import { Link } from 'react-router-dom';
import ViewWithTopBorder from '../General/ViewWithTopBorder';

// import './style.css';
const styles = {
    pop: {
        display: 'none',
        position: 'fixed',
        zIndex: '1',
        backgrounColor: 'rgba(0, 0, 0, 0.25)',
      },
    pop_content: {
        backgroundColor: 'white',
        position: 'absolute',
      }
  };

class Popup extends React.Component {
  render() {
    return (
    <ViewWithTopBorder>
      <div className='card' 
            // style={styles.pop}
            // style={{position: 'fixed',
            //         width: '100',
            //         height: '100',
            //         backgroundcolor: 'rgba(0,0,0, 0.5)'}}
                    >
        <div className='card-content' 
            // style={styles.pop_content}
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