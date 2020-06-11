import React from "react";

function Links(props) {
        console.log(props.linksList);
        const linksList = JSON.parse(localStorage.getItem('videoLinks'));
        if(linksList && linksList.length>0) {
            return linksList.map((link, index) =>
                <div className="link" key={index}>
                    <p>{link}</p>
                    <button type="button" className="close" aria-label="Close" onClick={() => props.sendUpdate(index)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>)
        }
        else {
            return null;
        }
}

export default Links;