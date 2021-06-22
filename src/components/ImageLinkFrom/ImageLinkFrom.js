import React from 'react';
import './ImageLinkFrom.css';


const ImageLinkFrom = ({onInput,onSubmit})  => {
    return (
        <div>
            <p className='f3'>
                {'This magic Brain Will detect face'}
            </p>
            <div>
                <div className='center mb4 pa4 br3 shadow-5 pattren form'>
                    <input className='f4 w-70 center' type='tex' onChange={onInput} />
                    <button className='w-30 grow f4 link pv2 dib white bg-light-purple' onClick={onSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
}
export default ImageLinkFrom;