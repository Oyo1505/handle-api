import React, { useState } from 'react';
import { CircularProgressbar, buildStyles} from "react-circular-progressbar";
import imageDefault from '../../images/fancy-pants.jpg';
import { Modal } from 'react-responsive-modal';


function HeaderBook(props){
    const [toggle, setToggle] = useState(false);
    function toggleFunc(){setToggle(!toggle)}
	const [open, setOpen] = useState(false);

	const onOpenModal = () => setOpen(true);
	const onCloseModal = () => setOpen(false);
    const {authors, title, release, bookInfo, cover } = props

    if(bookInfo){
        var genres = Object.values(bookInfo.categories);
    }
 
    return(
        <>  
        <div className="header-content" style={{ background :  `url(${imageDefault})  center`}}>
            <div className="custom_b">
            <div className='single_column'>        
         <section className="header-single" >
            <div className="cover-book"> 
                {cover &&
                    <img  src={`${cover}`} alt="book cover"  />
                }
                {!cover &&
                    <img  src={imageDefault} width='300px' height="450px" alt="poster default"/>
                }
            </div>
            <div style={{display:'flex'}}>
                            <section className="movie-information">  
                                <div className="title_header">
                                    <h1> {title} </h1> 
                                    <div className="facts"><span style={{color: "white", fontWeight: "400"}}>{release}</span> <span style={{color:'#fff'}}>{genres.map(genre=>{ return `${genre} `})}</span></div>

                                </div>           	
                                                
                                <ul className="header-action">
                                    {
                                    <>
                                    <li id="circle-movie" >
                                       {bookInfo.averageRating && <CircularProgressbar  text={`${bookInfo.averageRating * 2* 10 }% `}   value={bookInfo.averageRating *  2* 10  } styles={buildStyles({
                                            textColor: "white",
                                            pathColor: "#1DA463",
                                            trailColor: '#204529'
                                        })} strokeWidth="8"/> } 
                                       </li>
                                     </>
                                    }	
                                    <li className="item-header-content" onClick={toggleFunc}><button style={{color:"#fff"}}> <i className={toggle ? 'icon icon-like-red' : 'icon icon-like'} ></i> Like</button></li>
                                    <li className="item-header-content"> <button style={{color:"#fff"}}><i className='icon icon-edit' ></i> Ecrire un avis </button></li>													
                                </ul>
                                <div style={{alignSelf : "flex-start"}}>
                                    <p>{authors}</p>
                                </div>
                            </section>   
                        </div>
                 </section>
             </div> 
            </div>
        </div>
        </>
    )
}

export default HeaderBook;