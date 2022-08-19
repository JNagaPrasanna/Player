import { useState, useEffect } from "react";
import './App.css';
import Hls from 'hls.js'

// var config = {
//   fetchSetup: function (context, initParams) {
//     // Always send cookies, even for cross-origin calls.
//     initParams.credentials = 'include';
//     return new Request(context.url, initParams);
//   },
// };

var config = {
  // autoStartLoad: true,
  // maxBufferSize: 0,
  // maxBufferLength:20,
  // maxBufferHole:0.5,
  // stretchShortVideoTrack:false,
  // fragLoadingTimeOut: 20000,
  // startFragPrefetch:true,
  // enableIMSC1: false,
  // lowLatencyMode: true,
  // manifestLoadingTimeOut: 10000,
  // maxAudioFramesDrift: 1,
  // enableWebVTT: true,
  // defaultAudioCodec: undefined,
  // startPosition: 0,
  // ignoreDevicePixelRatio:true,
  // liveSyncDurationCount:3,
  // levelLoadingTimeOut:1,
  // enableCEA708Captions:true,
  // enableIMSC1:true,
  // debug: true,
  // enableSoftwareAES: false,
  // progressive: false,
  maxLoadingDelay:1,

 
  
};
 var hls = new Hls(config);

// var hls = new Hls();

function App() {

  
  useEffect(() => {

    if (Hls.isSupported()) {
      var video = document.getElementById('video');
      console.log(video)
      // hls.autoStartLoad(10);
    
    hls.attachMedia(video);
    hls.on(Hls.Events.MEDIA_ATTACHED, function () {
      console.log('video and hls.js are now bound together !');
      hls.loadSource( "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8");


      hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
        console.log("MANIFEST_PARSED")
        console.log("data1",data);
          // 'manifest loaded, found ' + data.levels.length + ' quality level'
        // );
        // if(data){
        //   console.log("kanna",data)
        //   switch (data){
            
        //     case "hlsMediaAttached":
        //       console.log('  FRAG_LOAD_ERROR,Identifier for fragment load error');
        //       hls.startLoad();
        //       break;
        //   }
        // }
        
      });
      
     
    })
    
    hls.on(Hls.Events.ERROR, function (event, data) {
      // console.log(Hls.ErrorDetails,'ll')
      if (data.fatal) {
        console.log(data,'data2')
        switch (data.details) {
          
          // case Hls.ErrorTypes.NETWORK_ERROR:
          //   // try to recover network error
          //   console.log('fatal network error encountered, try to recover');
          //   hls.startLoad();
          //   break;
           
            case "fragLoadError":
              console.log('  FRAG_LOAD_ERROR,Identifier for fragment load error');
              hls.startLoad();
              break;
            case "manifestLoadError":
              console.log(' MANIFEST_LOAD_ERROR,Identifier for a manifest load error');
              hls.startLoad();
              break;
            case "bufferAppendError":
              console.log(' BUFFER_APPEND_ERROR,Identifier for a buffer append error');
              hls.startLoad();
              break;
            case "bufferAppendingError":
              console.log('BUFFER_APPENDING_ERROR,Identifier for a buffer appending error');
              hls.startLoad();
              break;
            case "fragLoadTimeOut":
              console.log('  FRAG_LOAD_TIMEOUT, Identifier for a fragment TimeOut error event');
              hls.startLoad();
              break;
            case " manifestLoadTimeOut":
              console.log('  MANIFEST_LOAD_TIMEOUT,Identifier for a manifest load timeout');
              hls.startLoad();
              break;
           
            
          case Hls.ErrorTypes.MEDIA_ERROR:
            console.log('fatal media error encountered, try to recover');
            hls.recoverMediaError();
            break;
          default:
            // cannot recover
            hls.destroy();
            break;
        }
      }
    });
  }
});
  
    


  return (
    
    <div className="App">
     <video  className="video" autoPlay   controls= {true} id="video"></video>
    </div>
  );
}

export default App;

