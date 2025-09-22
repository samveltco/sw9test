// ©2024 Austin App House. All rights reserved.
import React from 'react';

const Tab = ({title, active, current, handler, count, isCounting }) => {
    return (
        <button
            style={{
                background:'none',
                borderTop:'none',
                borderLeft:'none',
                borderRight:'none',
                margin:'10px'
            }}
            onClick={()=>handler(current)}
            className={active ? "selected": "active"}
            
        >
            {title} ({isCounting ? <Counting /> : count || 0 })
        </button>
    );
};

const Counting = () => {
    return (
        <div className="spinner" style={{
            width: '10px',
            height: '10px',
            position: 'relative',
            display: 'inline-block',
        }}>
            <div className="spinner-ring" style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '2px solid transparent',
                borderTopColor: '#3498db',
                borderLeftColor: '#3498db',
                position: 'absolute',
                top: 0,
                left: 0,
                animation: 'spin 1s linear infinite'
            }}></div>
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default Tab;
