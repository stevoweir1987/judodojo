import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX, Maximize2, Minimize2, Settings } from 'lucide-react';

const VideoPlayer = ({ embedUrl, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const iframeRef = useRef(null);
  const containerRef = useRef(null);

  // Handle iframe load and messaging
  useEffect(() => {
    const handleIframeMessage = (event) => {
      // Handle messages from YouTube iframe
      if (event.data && typeof event.data === 'string') {
        try {
          const data = JSON.parse(event.data);
          if (data.event === 'infoDelivery' && data.info) {
            if (data.info.currentTime !== undefined) {
              setCurrentTime(data.info.currentTime);
            }
            if (data.info.duration !== undefined) {
              setDuration(data.info.duration);
            }
          }
        } catch (e) {
          // Ignore parsing errors
        }
      }
    };

    window.addEventListener('message', handleIframeMessage);
    return () => window.removeEventListener('message', handleIframeMessage);
  }, []);

  // Update progress bar
  useEffect(() => {
    if (duration > 0) {
      setProgress((currentTime / duration) * 10);
    }
  }, [currentTime, duration]);

  // Toggle play/pause
  const togglePlay = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      const command = isPlaying ? 'pauseVideo' : 'playVideo';
      iframe.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: command,
        args: []
      }), '*');
      setIsPlaying(!isPlaying);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      const command = isMuted ? 'unMute' : 'mute';
      iframe.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: command,
        args: []
      }), '*');
      setIsMuted(!isMuted);
    }
  };

  // Change playback rate
  const changePlaybackRate = (rate) => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: 'setPlaybackRate',
        args: [rate]
      }), '*');
      setPlaybackRate(rate);
    }
 };

  // Skip forward/backward
  const skip = (seconds) => {
    const iframe = iframeRef.current;
    if (iframe && duration > 0) {
      const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
      iframe.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: 'seekTo',
        args: [newTime, true]
      }), '*');
      setCurrentTime(newTime);
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current) {
        if (containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen();
        } else if (containerRef.current.mozRequestFullScreen) {
          containerRef.current.mozRequestFullScreen();
        } else if (containerRef.current.webkitRequestFullscreen) {
          containerRef.current.webkitRequestFullscreen();
        } else if (containerRef.current.msRequestFullscreen) {
          containerRef.current.msRequestFullscreen();
        }
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  // Handle progress bar click
  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = clickPosition * duration;
    
    const iframe = iframeRef.current;
    if (iframe && duration > 0) {
      iframe.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: 'seekTo',
        args: [newTime, true]
      }), '*');
      setCurrentTime(newTime);
    }
  };

 // Format time (seconds to MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Playback rate options
  const playbackRates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden" ref={containerRef}>
      <div className="relative" style={{ paddingBottom: '56.25%' }}>
        <iframe
          ref={iframeRef}
          src={`${embedUrl}?enablejsapi=1&origin=${window.location.origin}`}
          className="absolute top-0 left-0 w-full h-full rounded"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={title}
        />
      </div>

      {/* Video Controls */}
      <div className="bg-gray-900 p-3">
        {/* Progress Bar */}
        <div 
          className="w-full h-2 bg-gray-700 rounded-full mb-3 cursor-pointer"
          onClick={handleProgressClick}
        >
          <div 
            className="h-full bg-blue-500 rounded-full" 
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-3">
            {/* Play/Pause */}
            <button onClick={togglePlay} className="hover:text-blue-400 transition-colors">
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            {/* Skip Controls */}
            <button onClick={() => skip(-10)} className="hover:text-blue-400 transition-colors">
              <RotateCcw size={20} />
            </button>
            <button onClick={() => skip(10)} className="hover:text-blue-40 transition-colors">
              <RotateCw size={20} />
            </button>

            {/* Volume Control */}
            <button onClick={toggleMute} className="hover:text-blue-40 transition-colors">
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>

          {/* Time Display */}
          <div className="text-sm text-gray-300 mx-4">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>

          {/* Settings and Fullscreen */}
          <div className="flex items-center space-x-3">
            {/* Settings Menu */}
            <div className="relative">
              <button 
                onClick={() => setShowSettings(!showSettings)} 
                className="hover:text-blue-400 transition-colors"
              >
                <Settings size={20} />
              </button>
              
              {showSettings && (
                <div className="absolute bottom-full right-0 mb-2 bg-gray-800 border border-gray-600 rounded-lg p-2 min-w-32 z-10">
                  <div className="text-xs text-gray-300 mb-1">Playback Speed</div>
                  {playbackRates.map(rate => (
                    <button
                      key={rate}
                      onClick={() => {
                        changePlaybackRate(rate);
                        setShowSettings(false);
                      }}
                      className={`block w-full text-left px-2 py-1 text-sm hover:bg-gray-700 rounded ${
                        playbackRate === rate ? 'text-blue-400' : 'text-gray-300'
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Fullscreen */}
            <button onClick={toggleFullscreen} className="hover:text-blue-400 transition-colors">
              {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
