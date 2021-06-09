import React, { useState } from 'react';
import { CircularProgressbar, buildStyles} from "react-circular-progressbar";
import imageDefault from '../../images/film-default.png';
import { Modal } from 'react-responsive-modal';
import ReactPlayer from 'react-player';

function Header(props){
    const [toggle, setToggle] = useState(false);
    function toggleFunc(){setToggle(!toggle)}
	const [open, setOpen] = useState(false);

	const onOpenModal = () => setOpen(true);
	const onCloseModal = () => setOpen(false);

    const { backgroundImage, title, show,  video, crew} = props
    if(show){
        var genres = Object.values(show.genres);
    }
  
    if(crew){
       var crewList = crew.map((team, i) => {
            if (i <= 4) {
                  return (
                  <li  key={team.job} className="profile-movie"> 
                      <p className="crew-name" >{team.name}</p>
                      <p className="crew-job">{team.job}</p>
                  </li>);
             }
          })
    }
 

 
    return(
        <>  
        <div className="header-content" style={{backgroundPosition: 'right -200px top', background : backgroundImage ? `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${backgroundImage}) no-repeat center` :`url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${backgroundImage}) no-repeat center` , backgroundSize: "cover"}}>
            <div className="custom_b">
            <div className='single_column'>        
         <section className="header-single" >
            <div className="poster"> 
                {show.poster_path &&
                    <img  src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${show.poster_path}`} alt="poster movie"  />
                }
                {!show.poster_path &&
                    <img  src={imageDefault} width='300px' height="450px" alt="poster default"/>
                }
            </div>
                        <div style={{display:'flex'}}>
                            <section className="movie-information">  
                                <div className="title_header">
                                    <h1> {title} </h1> 
                                    <div className="facts"><span style={{color: "white", fontWeight: "400"}}>{show.release_date}</span> <span style={{color:'#fff'}}>{genres.map(genre=>{ return `${genre.name} `})}</span></div>

                                </div>           	
                                                
                                <ul className="header-action">
                                    {video.results && show.homepage && show.vote_average &&
                                    <>
                                    <li id="circle-movie" >
                                        <CircularProgressbar  text={`${show.vote_average * 10 }% `}   value={show.vote_average *10  } 
                                        styles={buildStyles({
                                            textColor: "white",
                                            pathColor: "#1DA463",
                                            trailColor: '#204529'
                                        })}
                                        
                                    strokeWidth="8"/></li>
                                    <li><a href={show.homepage}>Site Officiel</a></li>
                                    {video.results[0] &&
                                    <>
                                    <li ><button  style={{color:"#fff"}} onClick={onOpenModal}> Bande Annonce</button></li>
                                
                                                        <Modal 
                                                        open={open} 
                                                        onClose={onCloseModal}  
                                                        classNames={{
                                                            overlay: 'customOverlay',
                                                            modal: 'customModal',}} 
                                                        center>
                                                    
                                                        <div className="title-modal-djyoutube"> {show.original_title}</div>
                                                            <div className="modal-body-djyoutube">
                                                                <ReactPlayer 
                                                                url={`https://www.youtube.com/watch?v=${video.results[0].key}`}
                                                                playing={true}
                                                                width='100%'
                                                                config={{  youtube: {
                                                                playerVars: { 'showinfo': 1, 'enablejsapi' : 1 }}, }}/>
                                                        </div>
                                                    </Modal>
                                                    
                                                </>
                                                }	
                                                <li className="item-header-content" onClick={toggleFunc}><button style={{color:"#fff"}}> <i className={toggle ? 'icon icon-like-red' : 'icon icon-like'} ></i> Like</button></li>
                                                <li className="item-header-content"> <button style={{color:"#fff"}}><i className='icon icon-edit' ></i> Ecrire un avis </button></li>
                                            </>
                                        }														
                                </ul>
                                <div>
                                <h5 style={{color: "#fff"}}>Synopis</h5>
                                    <p>{show.overview}</p>
                                    <ul className="crew-list">
                                    {crewList}								
                                    </ul>
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

export default Header;
