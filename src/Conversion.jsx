import { io } from "socket.io-client";
import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import css from './Conversion.module.scss'
import './conversionProgress.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import rocket from './rocket.svg';
import arrow from './arrow.svg';
import downloadIcon from './download.svg';
import classnames from 'classnames/bind';
import ReactTooltip from 'react-tooltip';

const cln = classnames.bind(css);

function msToTime(s) {
  var pad = (n, z = 2) => ('00' + n).slice(-z);
  return pad((s%3.6e6)/6e4 | 0) + ' m  ' + pad((s%6e4)/1000|0) + '.' + pad(s%1000, 3) + ' s';
}


function Conversion() {

    const [progressMp4, setProgressMp4] = useState(0);
    const [progressLibx264, setProgressLibx264] = useState(0);
    const [progressVp9, setProgressVp9] = useState(0);
    const [progressAv1, setProgressAv1] = useState(0);

    const [profileMp4, setProfileMp4] = useState('--');
    const [durationMp4, setDurationMp4] = useState('--');
    const [bitRateMp4, setBitRateMp4] = useState('--');
    const [sizeMp4, setSizeMp4] = useState('--');
    const [levelMp4, setLevelMp4] = useState('--');
    const [frameRateMp4, setFrameRateMp4] = useState('--');

    const [framesMp4, setFramesMp4] = useState('--');
    const [currentFpsMp4, setCurrentFpsMp4] = useState('--');
    const [currentKbpsMp4, setCurrentKbpsMp4] = useState('--');
    const [targetSizeMp4, setTargetSizeMp4] = useState('--');


    const [profileLibx264, setProfileLibx264] = useState('--');
    const [durationLibx264, setDurationLibx264] = useState('--');
    const [bitRateLibx264, setBitRateLibx264] = useState('--');
    const [sizeLibx264, setSizeLibx264] = useState('--');
    const [levelLibx264, setLevelLibx264] = useState('--');
    const [frameRateLibx264, setFrameRateLibx264] = useState('--');

    const [framesLibx264, setFramesLibx264] = useState('--');
    const [currentFpsLibx264, setCurrentFpsLibx264] = useState('--');
    const [currentKbpsLibx264, setCurrentKbpsLibx264] = useState('--');
    const [targetSizeLibx264, setTargetSizeLibx264] = useState('--');


    const [profileVp9, setProfileVp9] = useState('--');
    const [durationVp9, setDurationVp9] = useState('--');
    const [bitRateVp9, setBitRateVp9] = useState('--');
    const [sizeVp9, setSizeVp9] = useState('--');
    const [levelVp9, setLevelVp9] = useState('--');
    const [frameRateVp9, setFrameRateVp9] = useState('--');

    const [framesVp9, setFramesVp9] = useState('--');
    const [currentFpsVp9, setCurrentFpsVp9] = useState('--');
    const [currentKbpsVp9, setCurrentKbpsVp9] = useState('--');
    const [targetSizeVp9, setTargetSizeVp9] = useState('--');


    const [profileAv1, setProfileAv1] = useState('--');
    const [durationAv1, setDurationAv1] = useState('--');
    const [bitRateAv1, setBitRateAv1] = useState('--');
    const [sizeAv1, setSizeAv1] = useState('--');
    const [levelAv1, setLevelAv1] = useState('--');
    const [frameRateAv1, setFrameRateAv1] = useState('--');

    const [framesAv1, setFramesAv1] = useState('--');
    const [currentFpsAv1, setCurrentFpsAv1] = useState('--');
    const [currentKbpsAv1, setCurrentKbpsAv1] = useState('--');
    const [targetSizeAv1, setTargetSizeAv1] = useState('--');


    const [isExpandedMp4, setIsExpandedMp4] = useState(false);
    const [isExpandedLibx264, setIsExpandedLibx264] = useState(false);
    const [isExpandedVp9, setIsExpandedVp9] = useState(false);
    const [isExpandedAv1, setIsExpandedAv1] = useState(false);


    const [psnrMp4, setPsnrMp4] = useState('--');
    const [psnrLibx264, setPsnrLibx264] = useState('--');
    const [psnrVp9, setPsnrVp9] = useState('--');
    const [psnrAv1, setPsnrAv1] = useState('--');

    const [param, setParam] = useState("encoding");

    const [bitrate, setBitrate] = useState(1000);
    const [resolution, setResolution] = useState(1280);
    const [fps, setFps] = useState(25);

    const [startTime, setStartTime] = useState(new Date().getTime());

    const [type, setType] = useState("manually");

    const expandSectionMp4 = () =>{
        setIsExpandedMp4(isExpanded => !isExpanded);
    }

    const expandSectionLibx264 = () =>{
        setIsExpandedLibx264(isExpanded => !isExpanded);
    }

    const expandSectionVp9 = () =>{
        setIsExpandedVp9(isExpanded => !isExpanded);
    }

    const expandSectionAv1 = () =>{
        setIsExpandedAv1(isExpanded => !isExpanded);
    }

    const download = async (event, fileName) => {

        window.open(`https://whispering-tundra-22592.herokuapp.com/download?fileName=${fileName}`, "_self");

    }

    const startConversion = async (event) => {
        if(progressMp4 === 100){
            setProgressMp4(0);
        }
        if(progressLibx264 === 100){
            setProgressLibx264(0);
        }
        if(progressVp9 === 100){
            setProgressVp9(0);
        }
        if(progressAv1 === 100){
            setProgressAv1(0);
        }

        setStartTime(new Date());

        event.preventDefault();

        var to = 'mp4';
        var withCodec = 'mpeg4';
            
            const data = new FormData();
            data.append('to', to);
            data.append('withCodec', withCodec);
            data.append('param', param);
            data.append('bitrate', bitrate);
            data.append('resolution', resolution);
            data.append('fps', fps);
            
            await axios.post("https://whispering-tundra-22592.herokuapp.com/test", data, { 
                    })
                    .then(res => { 
                        console.log(res.statusText)
                    })
            }

            useEffect(() => {
                var socket = io('https://whispering-tundra-22592.herokuapp.com');

                socket.on('progress', function(msg) {
                    setProgressMp4(msg.progress < 100 ? msg.progress : 100);
                    setDurationMp4(msToTime(Date.now() - startTime));
                    setFramesMp4(msg.frames);
                    setCurrentFpsMp4(msg.currentFps);
                    setCurrentKbpsMp4(msg.currentKbps);
                    setTargetSizeMp4(msg.targetSize);
                });
              
                socket.on('progress2', function(msg) {
                    setProgressLibx264(msg.progress < 100 ? msg.progress : 100);
                  setDurationLibx264(msToTime(Date.now() - startTime));

                  setFramesLibx264(msg.frames);
                  setCurrentFpsLibx264(msg.currentFps);
                  setCurrentKbpsLibx264(msg.currentKbps);
                  setTargetSizeLibx264(msg.targetSize);
                });

                socket.on('progress3', function(msg) {
                    setProgressVp9(msg.progress < 100 ? msg.progress : 100);
                    setDurationVp9(msToTime(Date.now() - startTime));

                  setFramesVp9(msg.frames);
                  setCurrentFpsVp9(msg.currentFps);
                  setCurrentKbpsVp9(msg.currentKbps);
                  setTargetSizeVp9(msg.targetSize);
                  });

                  socket.on('progress4', function(msg) {
                    setProgressAv1(msg.progress < 100 ? msg.progress : 100);
                    setDurationAv1(msToTime(Date.now() - startTime));

                  setFramesAv1(msg.frames);
                  setCurrentFpsAv1(msg.currentFps);
                  setCurrentKbpsAv1(msg.currentKbps);
                  setTargetSizeAv1(msg.targetSize);
                  });

                socket.on('metadataMp4', function(msg) {
                    setProgressMp4(100);
                    setProfileMp4(msg.profile);
                    setBitRateMp4(msg.bit_rate);
                    setSizeMp4(msg.size);
                    setLevelMp4(msg.level);
                    setFrameRateMp4(msg.avg_frame_rate)

                    setTargetSizeMp4(msg.size/1000);

                  });

                  socket.on('metadataLibx264', function(msg) {
                    setProgressLibx264(100);
                    setProfileLibx264(msg.profile);
                    setBitRateLibx264(msg.bit_rate);
                    setSizeLibx264(msg.size);
                    setLevelLibx264(msg.level);
                    setFrameRateLibx264(msg.avg_frame_rate)

                    setTargetSizeLibx264(msg.size/1000);
                  });

                  socket.on('metadataVp9', function(msg) {
                    setProgressVp9(100);
                    setProfileVp9(msg.profile);
                    setBitRateVp9(msg.bit_rate);
                    setSizeVp9(msg.size);
                    setLevelVp9(msg.level);
                    setFrameRateVp9(msg.avg_frame_rate)
                    setTargetSizeVp9(msg.size/1000);
                  });

                  socket.on('metadataAv1', function(msg) {
                    setProgressAv1(100);
                    setProfileAv1(msg.profile);
                    setBitRateAv1(msg.bit_rate);
                    setSizeAv1(msg.size);
                    setLevelAv1(msg.level);
                    setFrameRateAv1(msg.avg_frame_rate)
                    setTargetSizeAv1(msg.size/1000);
                  });

                  socket.on('psnrMp4', function(msg) {
                    setPsnrMp4(msg.psnr);
                  });

                  socket.on('psnrLibx264', function(msg) {
                    setPsnrLibx264(msg.psnr);
                  });

                  socket.on('psnrVp9', function(msg) {
                    setPsnrVp9(msg.psnr);
                  });

                  socket.on('psnrAv1', function(msg) {
                    setPsnrAv1(msg.psnr);
                  });

              },[startTime])

             const onParamChanged = (e) => {
                 setParam(e.currentTarget.value)
              }

    const explanation = {
        duration: "Time spent to decode the video",
        frames: "Number of frames proceeded till now",
        currentFps: "Average number of frames being proceed every second at the moment",
        currentKbs: "Average bitrate per one second at the moment",
        currentSize: "Size of the video that has been proceeded till now",
        bitRate: "Average number of bits per second for the whole video",
        size: "Total size of the decoded video",
        profile: "Represents a group of tools appropriate for a specific video usage and for proper standard implementation. It includes info about limits of implemented tools and encoding functions.", 
        levels: "Set of rules that determine codec efficiency. There are a few of levels that define the maximum value for number of frames per second or maximum frame size.",
        averageFps: "Average number of frames proceed every second for the whole video",
        psnr: "Peak signal-to-noise ratio. It is a metric which defines video quality as a number. The bigger the value is, the better."
    }

    return <div className={css.container}>
        <h1>Codecs comparator</h1>
            <h4>Set parameters</h4>
        <div className={css.options}>
        <div className={css.parametersContainer}>
            <label className={css.radio}>Manually
                <input type="radio" name="radio2" checked={type==="manually"} value="manually" onChange={(e) => { setParam(null); setType(e.currentTarget.value) }} />
                <span className={css.checkmark}></span>
            </label>
            <div className={css.parameters}>
                <div className={css.parameter}>
                    <label for="bitrate">Birate (kbps)</label>
                    <div>
                        <input className={css.slider} disabled={type === "predefined"} type="range" min="500" max="10000" value={bitrate} onChange={(event) => setBitrate(event.target.value)}/>
                    </div>
                    <span className={css.minRange}>
                        500
                    </span>
                    <span className={css.maxRange}>
                        10 000
                    </span>
                    <div className={cln('chosenBitrate', {disabledBitrate:  type === "predefined"})}>
                        <b>{bitrate}</b>
                    </div>
                </div>    
                <div className={css.parameter}>
                    <label for="resolution">Quality (pixels)</label>
                        <select name="resolution" id="resolution" disabled={type === "predefined"} className={css.select} onChange={(event) => setResolution(event.target.value)}>
                            <option value="240">240</option>
                            <option value="360">360</option>
                            <option value="480">480</option>
                            <option value="540">720</option>
                            <option value="1080">1080</option>
                        </select> 
                </div>    
                <div className={css.parameter}>
                    <label for="fps">Frames per second</label>
                        <select name="fps" id="fps" className={css.select} disabled={type === "predefined"} onChange={(event) => setFps(Number(event.target.value))}>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25" selected>25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                        </select> 
                </div>  
            </div>    
        </div>  
        <div className={css.automat}>  
        <label className={cln('radio', 'automatRadio')}>Use predefined option
                <input type="radio" name="radio2" checked={type==="predefined"} value="predefined" onChange={(e) => { setParam("encoding"); setType(e.currentTarget.value) }} />
                <span className={css.checkmark}></span>
            </label>
        <div className={css.radios}>
            <label className={css.radio}>Fastest encoding
                <input type="radio" name="radio" disabled={type === "manually"} checked={param==="encoding"} value="encoding" onChange={onParamChanged} />
                <span className={css.checkmark}></span>
            </label>
            <label className={css.radio}>Best compression
                <input type="radio" name="radio" value="compression" disabled={type === "manually"} checked={param==="compression"} onChange={onParamChanged}/>
                <span className={css.checkmark}></span> 
            </label>
        </div>
        </div>
        </div>

        <button onClick={(e) => startConversion(e)} className={css.convertButton}>
            <img src={rocket} className={css.rocket} alt="rocket"/>
            Convert
        </button>
        
        <div className={css.codecs}>
            <div className={css.singleCodec}>
            <div className={css.progress}>
                <CircularProgressbar
                    value={Math.ceil(progressMp4)}
                    text={`${Math.ceil(progressMp4)}%`}
                    strokeWidth={1.5}
                    className={css.progress}
                    styles={buildStyles({
                        strokeLinecap: 'butt',
                        textSize: '14px',
                        pathTransitionDuration: 0.5,
                        pathColor: `rgba(112, 5, 134, 0.7)`,
                        textColor: '#fff',
                        trailColor: '#1b1b1b',
                        backgroundColor: '#1b1b1b',
                        background: 'transparent'
                    })}
                />
            </div>
                <div className={css.metadata}>
                    <div className={css.codecName}>
                        H.265/HEVC
                        <img src={downloadIcon} className={css.download} onClick={(event) => download(event, 'outputMp4.mp4')} alt="download"/>
                    </div>
                    <div className={css.codecDetails}>
                        <div className={css.element}>
                            <span className={css.label} data-for="duration" data-tip={explanation.duration}>
                                DURATION
                            </span>
                            <span className={css.value}>
                               {`${durationMp4}`}
                            </span>
                        </div>
                        <div className={css.element}>
                            <span className={css.label} data-for="frames" data-tip={explanation.frames}>
                                FRAMES
                            </span>
                            <span className={css.value}>
                                {framesMp4}
                            </span>
                        </div>
                        <div className={css.element}>
                            <span className={css.label} data-for="currentFps" data-tip={explanation.currentFps}>
                                CURRENT FPS
                            </span>
                            <span className={css.value}>
                                {currentFpsMp4}
                            </span>
                        </div>
                        <div className={css.element}>
                            <span className={css.label} data-for="currentKbs" data-tip={explanation.currentKbs}>
                                CURRENT Kb/s
                            </span>
                            <span className={css.value}>
                                {`${bitrate} Kb/s`}
                            </span>
                        </div>
                        <div className={css.element}>
                            <span className={css.label} data-for="currentSize" data-tip={explanation.currentSize}>
                                CURRENT SIZE
                            </span>
                            <span className={css.value}>
                                {`${targetSizeMp4} KB`}
                            </span>
                        </div>
                        <div className={css.element}>
                            <span className={css.label} data-for="currentSize" data-tip={explanation.psnr}>
                                PSNR
                            </span>
                            <span className={css.value}>
                                {`${psnrMp4} dB`}
                            </span>
                        </div>
                        <div className={css.additional}>
                            <img className={cln('collapsible', {
                                'collapsible--expanded': isExpandedMp4
                            })} onClick={expandSectionMp4} src={arrow} alt="arrow"/>
                            <div className={cln('content', {
                                'content--expanded': isExpandedMp4
                            })}>
                                <div className={css.element}>
                                    <span className={css.label} data-for="bitRate" data-tip={explanation.bitRate}>
                                        BIT RATE
                                    </span>
                                    <span className={css.value}>
                                        {`${bitrate} Kb/s`}
                                    </span>
                                </div>
                                <div className={css.element}>
                                    <span className={css.label} data-for="size" data-tip={explanation.size}>
                                        SIZE
                                    </span>
                                    <span className={css.value}>
                                        {`${sizeMp4/1000} KB`}
                                    </span>
                                </div>
                                <div className={css.element}>
                                    <span className={css.label} data-for="profile" data-tip={explanation.profile}>
                                        PROFILE
                                    </span>
                                    <span className={css.value}>
                                        {profileMp4}
                                    </span>
                                </div>
                                <div className={css.element}>
                                    <span className={css.label} data-for="levels" data-tip={explanation.levels}>
                                        LEVEL
                                    </span>
                                    <span className={css.value}>
                                        {levelMp4}
                                    </span>
                                </div>
                                <div className={css.element}>
                                    <span className={css.label} data-for="averageFps" data-tip={explanation.averageFps}>
                                        AVERAGE FRAME RATE
                                    </span>
                                    <span className={css.value}>
                                        {fps}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <ReactTooltip id="duration" type="light" className={css.tooltip}/>
                        <ReactTooltip id="frames" type="light" className={css.tooltip}/>
                        <ReactTooltip id="currentFps" type="light" className={css.tooltip}/>
                        <ReactTooltip id="currentKbs" type="light" className={css.tooltip}/>
                        <ReactTooltip id="currentSize" type="light" className={css.tooltip}/>
                        <ReactTooltip id="bitRate" type="light" className={css.tooltip}/>
                        <ReactTooltip id="size" type="light" className={css.tooltip}/>
                        <ReactTooltip id="profile" type="light" className={css.tooltip}/>
                        <ReactTooltip id="levels" type="light" className={css.tooltip}/>
                        <ReactTooltip id="averageFps" type="light" className={css.tooltip}/>
                    </div>
                </div>
            </div>

            <div className={css.singleCodec}>    
                <div className={css.progress}>
                <CircularProgressbar
                    value={Math.ceil(progressLibx264)}
                    text={`${Math.ceil(progressLibx264)}%`}
                    strokeWidth={1.5}
                    className={css.progress}
                    styles={buildStyles({
                        strokeLinecap: 'butt',
                        textSize: '14px',
                        pathTransitionDuration: 0.5,
                        pathColor: `rgba(112, 5, 134, 0.7)`,
                        textColor: '#fff',
                        trailColor: '#1b1b1b',
                        backgroundColor: '#1b1b1b',
                        background: 'transparent'
                    })}
                />
                </div>  
                <div className={css.metadata}>
                    <div className={css.codecName}>
                        H.264/AVC
                        <img src={downloadIcon} className={css.download} onClick={(event) => download(event, 'outputLibx264.mp4')} alt="download"/>
                    </div>
                    
                    <div className={css.codecDetails}>
                        <div className={css.element}>
                            <span className={css.label} data-for="duration" data-tip={explanation.duration}>
                                DURATION
                            </span>
                            <span className={css.value}>
                                {`${durationLibx264}`}
                            </span>
                        </div>
                        <div className={css.element}>
                            <span className={css.label} data-for="frames" data-tip={explanation.frames}>
                                FRAMES
                            </span>
                            <span className={css.value}>
                                {framesLibx264}
                            </span>
                        </div>
                        <div className={css.element}>
                            <span className={css.label} data-for="currentFps" data-tip={explanation.currentFps}>
                                CURRENT FPS
                            </span>
                            <span className={css.value}>
                                {currentFpsLibx264}
                            </span>
                        </div>
                        <div className={css.element}>
                            <span className={css.label} data-for="currentKbs" data-tip={explanation.currentKbs}>
                                CURRENT Kb/s
                            </span>
                            <span className={css.value}>
                                {`${bitrate} Kb/s`}
                            </span>
                        </div>
                        <div className={css.element}>
                            <span className={css.label} data-for="currentSize" data-tip={explanation.currentSize}>
                                CURRENT SIZE
                            </span>
                            <span className={css.value}>
                                {`${targetSizeLibx264} KB`}
                            </span>
                        </div>
                        <div className={css.element}>
                            <span className={css.label} data-for="currentSize" data-tip={explanation.psnr}>
                                PSNR
                            </span>
                            <span className={css.value}>
                                {`${psnrLibx264} dB`}
                            </span>
                        </div>
                        <div className={css.additional}>
                            <img className={cln('collapsible', {
                                'collapsible--expanded': isExpandedLibx264
                            })} onClick={expandSectionLibx264} src={arrow} alt="arrow"/>
                            <div className={cln('content', {
                                'content--expanded': isExpandedLibx264
                            })}>
                                <div className={css.element}>
                                    <span className={css.label} data-for="bitRate" data-tip={explanation.bitRate}>
                                        BIT RATE
                                    </span>
                                    <span className={css.value}>
                                        {`${bitrate} Kb/s`}
                                    </span>
                                </div>
                                <div className={css.element}>
                                    <span className={css.label} data-for="size" data-tip={explanation.size}>
                                        SIZE
                                    </span>
                                    <span className={css.value}>
                                        {`${sizeLibx264/1000} KB`}
                                    </span>
                                </div>
                                <div className={css.element}>
                                    <span className={css.label} data-for="profile" data-tip={explanation.profile}>
                                        PROFILE
                                    </span>
                                    <span className={css.value}>
                                        {profileLibx264}
                                    </span>
                                </div>
                                <div className={css.element}>
                                    <span className={css.label} data-for="levels" data-tip={explanation.levels}>
                                        LEVEL
                                    </span>
                                    <span className={css.value}>
                                        {levelLibx264}
                                    </span>
                                </div>
                                <div className={css.element}>
                                    <span className={css.label} data-for="averageFps" data-tip={explanation.averageFps}>
                                        AVERAGE FRAME RATE
                                    </span>
                                    <span className={css.value}>
                                        {fps}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <ReactTooltip id="duration" type="light" className={css.tooltip}/>
                        <ReactTooltip id="frames" type="light" className={css.tooltip}/>
                        <ReactTooltip id="currentFps" type="light" className={css.tooltip}/>
                        <ReactTooltip id="currentKbs" type="light" className={css.tooltip}/>
                        <ReactTooltip id="currentSize" type="light" className={css.tooltip}/>
                        <ReactTooltip id="bitRate" type="light" className={css.tooltip}/>
                        <ReactTooltip id="size" type="light" className={css.tooltip}/>
                        <ReactTooltip id="profile" type="light" className={css.tooltip}/>
                        <ReactTooltip id="levels" type="light" className={css.tooltip}/>
                        <ReactTooltip id="averageFps" type="light" className={css.tooltip}/>
                    </div>
                </div>
            </div>

            <div className={css.singleCodec}>
                <div className={css.progress}>
                <CircularProgressbar
                    value={Math.ceil(progressVp9)}
                    text={`${Math.ceil(progressVp9)}%`}
                    strokeWidth={1.5}
                    className={css.progress}
                    styles={buildStyles({
                        strokeLinecap: 'butt',
                        textSize: '14px',
                        pathTransitionDuration: 0.5,
                        pathColor: `rgba(112, 5, 134, 0.7)`,
                        textColor: '#fff',
                        trailColor: '#1b1b1b',
                        backgroundColor: '#1b1b1b',
                        background: 'transparent'
                    })}
                />
                </div>  
                <div className={css.metadata}>
                    <div className={css.codecName}>
                        VP9
                        <img src={downloadIcon} className={css.download} onClick={(event) => download(event, 'outputVp9.mp4')} alt="download"/>
                    </div>
                    <div className={css.codecDetails}>
                        <div className={css.element}>
                            <span className={css.label} data-for="duration" data-tip={explanation.duration}>
                                DURATION
                            </span>
                            <span className={css.value}>
                                {`${durationVp9}`}
                            </span>
                        </div>
                        <div className={css.element}>
                            <span className={css.label} data-for="frames" data-tip={explanation.frames}>
                                FRAMES
                            </span>
                            <span className={css.value}>
                                {framesVp9}
                            </span>
                        </div>
                        <div className={css.element}>
                            <span className={css.label} data-for="currentFps" data-tip={explanation.currentFps}>
                                CURRENT FPS
                            </span>
                            <span className={css.value}>
                                {fps}
                            </span>
                        </div>
                        <div className={css.element}>
                            <span className={css.label} data-for="currentKbs" data-tip={explanation.currentKbs}>
                                CURRENT Kb/s
                            </span>
                            <span className={css.value}>
                                {`${bitrate} Kb/s`}
                            </span>
                        </div>
                        <div className={css.element}>
                            <span className={css.label} data-for="currentSize" data-tip={explanation.currentSize}>
                                CURRENT SIZE
                            </span>
                            <span className={css.value}>
                                {`${targetSizeVp9} KB`}
                            </span>
                        </div>
                        <div className={css.element}>
                            <span className={css.label} data-for="currentSize" data-tip={explanation.psnr}>
                                PSNR
                            </span>
                            <span className={css.value}>
                                {`${psnrVp9} dB`}
                            </span>
                        </div>
                        <div className={css.additional}>
                            <img className={cln('collapsible', {
                                'collapsible--expanded': isExpandedVp9
                            })} onClick={expandSectionVp9} src={arrow} alt="arrow"/>
                            <div className={cln('content', {
                                'content--expanded': isExpandedVp9
                            })}>
                        <div className={css.element}>
                            <span className={css.label} data-for="bitRate" data-tip={explanation.bitRate}>
                                BIT RATE
                            </span>
                            <span className={css.value}>
                                {`${bitrate} Kb/s`}
                            </span>
                        </div>
                        <div className={css.element}>
                            <span className={css.label} data-for="size" data-tip={explanation.size}>
                                SIZE
                            </span>
                            <span className={css.value}>
                                {`${sizeVp9/1000} KB`}
                            </span>
                        </div>
                        <div className={css.element}>
                            <span className={css.label} data-for="profile" data-tip={explanation.profile}>
                                PROFILE
                            </span>
                            <span className={css.value}>
                                {profileVp9}
                            </span>
                        </div>
                        <div className={css.element}>
                            <span className={css.label} data-for="levels" data-tip={explanation.levels}>
                                LEVEL
                            </span>
                            <span className={css.value}>
                                {levelVp9}
                            </span>
                        </div>
                        <div className={css.element}>
                            <span className={css.label} data-for="averageFps" data-tip={explanation.averageFps}>
                                AVERAGE FRAME RATE
                            </span>
                            <span className={css.value}>
                                {fps}
                            </span>
                        </div>
                        </div>
                    </div>
                    <ReactTooltip id="duration" type="light" className={css.tooltip}/>
                    <ReactTooltip id="frames" type="light" className={css.tooltip}/>
                    <ReactTooltip id="currentFps" type="light" className={css.tooltip}/>
                    <ReactTooltip id="currentKbs" type="light" className={css.tooltip}/>
                    <ReactTooltip id="currentSize" type="light" className={css.tooltip}/>
                    <ReactTooltip id="bitRate" type="light" className={css.tooltip}/>
                    <ReactTooltip id="size" type="light" className={css.tooltip}/>
                    <ReactTooltip id="profile" type="light" className={css.tooltip}/>
                    <ReactTooltip id="levels" type="light" className={css.tooltip}/>
                    <ReactTooltip id="averageFps" type="light" className={css.tooltip}/>
                    </div>
                </div>
            </div>
            <div className={css.singleCodec}>
                <div className={css.progress}>
                <CircularProgressbar
                    value={Math.ceil(progressAv1)}
                    text={`${Math.ceil(progressAv1)}%`}
                    strokeWidth={1.5}
                    className={css.progress}
                    styles={buildStyles({
                        strokeLinecap: 'butt',
                        textSize: '14px',
                        pathTransitionDuration: 0.5,
                        pathColor: `rgba(112, 5, 134, 0.7)`,
                        textColor: '#fff',
                        trailColor: '#1b1b1b',
                        backgroundColor: '#1b1b1b',
                        background: 'transparent'
                    })}
                />
                </div>  

                <div className={css.metadata}>
                    <div className={css.codecName}>
                        AV1
                        <img src={downloadIcon} className={css.download} onClick={(event) => download(event, 'outputAv1.mp4')} alt="download"/>
                    </div>
                    <div className={css.codecDetails}>
                        <div className={css.element}>
                            <span className={css.label} data-for="duration" data-tip={explanation.duration}>
                                DURATION
                            </span>
                            <span className={css.value}>
                                {`${durationAv1}`}
                            </span>
                        </div>
                        <div className={css.element}>
                            <span className={css.label} data-for="frames" data-tip={explanation.frames}>
                                FRAMES
                            </span>
                            <span className={css.value}>
                                {framesAv1}
                            </span>
                        </div>
                        <div className={css.element}>
                            <span className={css.label} data-for="currentFps" data-tip={explanation.currentFps}>
                                CURRENT FPS
                            </span>
                            <span className={css.value}>
                                {currentFpsAv1}
                            </span>
                        </div>
                        <div className={css.element}>
                            <span className={css.label} data-for="currentKbs" data-tip={explanation.currentKbs}>
                                CURRENT Kb/s
                            </span>
                            <span className={css.value}>
                                {`${bitrate} Kb/s`}
                            </span>
                        </div>
                        <div className={css.element}>
                            <span className={css.label} data-for="currentSize" data-tip={explanation.currentSize}>
                                CURRENT SIZE
                            </span>
                            <span className={css.value}>
                                {`${targetSizeAv1} KB`}
                            </span>
                        </div>
                        <div className={css.element}>
                            <span className={css.label} data-for="currentSize" data-tip={explanation.psnr}>
                                PSNR
                            </span>
                            <span className={css.value}>
                                {`${psnrAv1} dB`}
                            </span>
                        </div>
                        <div className={css.additional}>
                            <img className={cln('collapsible', {
                                'collapsible--expanded': isExpandedAv1
                            })} onClick={expandSectionAv1} src={arrow} alt="arrow"/>
                            <div className={cln('content', {
                                'content--expanded': isExpandedAv1
                            })}>
                        <div className={css.element}>
                            <span className={css.label} data-for="bitRate" data-tip={explanation.bitRate}>
                                BIT RATE
                            </span>
                            <span className={css.value}>
                                {`${bitrate} Kb/s`}
                            </span>
                        </div>
                        <div className={css.element}>
                            <span className={css.label} data-for="size" data-tip={explanation.size}>
                                SIZE
                            </span>
                            <span className={css.value}>
                                {`${sizeAv1/1000} KB`}
                            </span>
                        </div>
                        <div className={css.element}>
                            <span className={css.label} data-for="profile" data-tip={explanation.profile}>
                                PROFILE
                            </span>
                            <span className={css.value}>
                                {profileAv1}
                            </span>
                        </div>
                        <div className={css.element}>
                            <span className={css.label} data-for="levels" data-tip={explanation.levels}>
                                LEVEL
                            </span>
                            <span className={css.value}>
                                {levelAv1}
                            </span>
                        </div>
                        <div className={css.element}>
                            <span className={css.label} data-for="averageFps" data-tip={explanation.averageFps}>
                                AVERAGE FRAME RATE
                            </span>
                            <span className={css.value}>
                                {fps}
                            </span>
                        </div>
                        </div>
                    </div>
                    <ReactTooltip id="duration" type="light" className={css.tooltip}/>
                    <ReactTooltip id="frames" type="light" className={css.tooltip}/>
                    <ReactTooltip id="currentFps" type="light" className={css.tooltip}/>
                    <ReactTooltip id="currentKbs" type="light" className={css.tooltip}/>
                    <ReactTooltip id="currentSize" type="light" className={css.tooltip}/>
                    <ReactTooltip id="bitRate" type="light" className={css.tooltip}/>
                    <ReactTooltip id="size" type="light" className={css.tooltip}/>
                    <ReactTooltip id="profile" type="light" className={css.tooltip}/>
                    <ReactTooltip id="levels" type="light" className={css.tooltip}/>
                    <ReactTooltip id="averageFps" type="light" className={css.tooltip}/>
                    </div>
                </div>
            </div>
        </div>
        </div>

}

export default Conversion;





