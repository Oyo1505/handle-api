import { element } from 'prop-types';
import React, { useEffect, useRef, useState } from 'react'

function MediaMovie(props){
    const  flyers = useRef();
    const  videos = useRef();
    const [itemsToDisplay, setItems]= useState(null);


    useEffect(()=>{

    })

    function displayVideoItems(event){
        const nameArray = ["videos","flyers"];
        let el=event.currentTarget.getAttribute('name');
       
     nameArray.map(element =>{
   
       if( element === el){
        event.currentTarget.classList.add('active')
        console.log(el, element)
           setItems(videos)
       }else{
        event.currentTarget.classList.remove('active')
           setItems(null)
       }
      } )
       // el.classList.add('active')
       
    }
   const {video} = props;
    return(
        <>
        <section className="">
		 
            <nav className="menu-media">
               <h4 className="item-section-video  media-item-nav">Médias</h4><div ref={videos} className="media-item-nav" name="videos" onClick={displayVideoItems}><span > Vidéos ({video.results.length})</span></div><div name="flyers" className="media-item-nav" onClick={displayVideoItems}><span> Fonds d'écran</span></div>
            </nav>
            <div>
                <div>
                 {!itemsToDisplay &&
                  <p style={{color : "black"}}>rien</p>
                 }
                 {itemsToDisplay &&
                   
                   <p style={{color : "black"}}>tesdt</p>
                    
                 }
                </div>
            </div>
		</section>
        </>
    )
}

export default MediaMovie;
