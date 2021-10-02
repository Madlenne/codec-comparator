import clips from './clips.png';
import './App.css';
import React, { useState } from 'react'
import axios from 'axios';
import css from './App.module.scss'
import { useHistory } from 'react-router-dom';

const WelcomePage = () => {

    const history = useHistory();

  const [videoFile, setVideoFile] = useState(null);

  const onChangeHandler = async (event) => {
    console.log(event.target.files[0]);
    setVideoFile(event.target.files[0]);

  }

  const onClickHandler = async (event) => {
    event.preventDefault();

    console.log('aaa');
    const data = new FormData();
    data.append('file', videoFile);
    try{
        
        await axios.post("https://whispering-tundra-22592.herokuapp.com/convert", data, { 
        })
        .then(res => { 
            history.push('/convert');
        })
    }catch(error){
        console.error(error);
    }
}

  return (
    <div className={css.container}>
      <form enctype="multipart/form-data">
        <img src={clips} alt="clips" className={css.clips}></img>
        <div className={css.content}>
          <div className={css.text}>
            <div className={css.header}>
              Pick the best video codec for you
            </div>
            <div className={css.description}>
                This tool let you be more aware of various video parameters. Not always the best equals what you need.
              Upload your favourite video and check which codec meets your expectations best!
            </div>
        </div>
        <div className={css.actions} >
          <label for="file" className={css.uploadButton} >
              Choose a video
          </label>
          <input type="file" name="file" id="file" onChange={onChangeHandler}/>
          <span className={css.fileName}>{videoFile?.name || 'No file selected'}</span>
        </div>
        <button className={css.convertButton} onClick={onClickHandler} >
            Upload
          </button>
      </div>
        
      </form>
    </div>
  );
}

export default WelcomePage;
