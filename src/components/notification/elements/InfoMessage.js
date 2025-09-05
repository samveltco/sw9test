// ©2024 Austin App House. All rights reserved.
import React from "react";

const InfoMessage = ({header, contentArray = [], click = {}}) => {
    return <div className='font11' >
        <h6>{header}</h6>
        {
            contentArray.length
                ? <ul className='ul-info-toast' >
                    {
                        contentArray.map( message => (
                            <li key={message} >
                                {message}
                            </li>
                        ))
                    }
                </ul>
                : <></>
        }
        {
            click.label
                ? <button
                    onClick={click.onClick}
                    className={`btn btn-${click.color || 'success'}`}
                    type="button"
                >
                    {click.label}
                </button>
                : <></>
        }
    </div>
}

export default InfoMessage;