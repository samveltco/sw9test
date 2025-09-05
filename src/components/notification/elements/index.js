// ©2024 Austin App House. All rights reserved.
import React from "react";
import InfoMessage from "./InfoMessage";

const Elements = ({event}) => {
    const {
        message,
        infoMessageArray,
        click
    } = event;
    if(infoMessageArray || click) return <InfoMessage header={message} contentArray={infoMessageArray} click={click} />
    return message;
}

export default Elements;