import React from "react";
import { useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useComicGenerator } from "./useComicGenerator";
import "./stylesComicGenrator.css";

function ComicGeneratorPage() {
  const {
    selectedPanel,
    panelText,
    comicImages,
    isLoading,
    SpeechBubble,
    isImage,
    handleTextChange,
    handleSpeechChange,
    handlePanelChange,
    generateComicPanel,
    comicPanelRef,
    handleDownload,
  } = useComicGenerator();

  useEffect(()=>{

  },[isLoading])
  return (
    <div style={{ margin: "20px auto", textAlign: 'center'}}>
      <h1>Comic Creator Dashtoon</h1>
      <div className="pannelParent">
        <label htmlFor="panelSelect" className="custom-label">Select Comic Panel :</label>
        <div className="custom-dropdown">
          <select
            id="panelSelect"
            value={selectedPanel}
            onChange={handlePanelChange}
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="pannelParent">
        <label htmlFor="text" className="custom-label">Text for Panel {selectedPanel} :</label>
        <textarea
          id="text"
          value={panelText}
          onChange={handleTextChange}
          placeholder="Enter text"
          rows="3" 
        />
      </div>
      <div className="pannelParent">
        <label htmlFor="text" className="custom-label">Speech Bubble for Panel {selectedPanel} :</label>
        <textarea
          id="text"
          value={SpeechBubble[selectedPanel-1]}
          onChange={handleSpeechChange}
          placeholder="Enter text"
          rows="3"
        />
      </div>
      {isLoading && (
        <div className="loading-message">
          Hang tight! Panel {selectedPanel} is on its way...
        </div>
      )}
      <button onClick={generateComicPanel}>
        Generate Panel {selectedPanel}
      </button>
      <button onClick={handleDownload}>
      Download Panel {selectedPanel}
    </button>
      {
        <div className="comic-display" >
          {comicImages.map((image, index) => (
            isLoading && selectedPanel === index + 1 ? (
              <div className="Loading">
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="1"
                  width="140"
                  visible={true}
                />
              </div>
            ) : (
              (selectedPanel===index+1
              &&
              <div key={index} className="comic-panel" ref={comicPanelRef}>
              <img src={image} alt={`Panel ${index + 1}`} />
                {SpeechBubble[index].length>0 && isImage[index] &&
                <div key={index} className="speech" style={{fontSize:'12px'}}>
                  {SpeechBubble[index]}
                  </div>
                }
            </div>)
             ||
            <div key={index} className="comic-panel" >
              <img src={image} alt={`Panel ${index + 1}`} />
                {SpeechBubble[index].length>0 && isImage[index] &&
                <div key={index} className="speech" style={{fontSize:'12px'}}>
                  {SpeechBubble[index]}
                  </div>
                }
            </div>
            )
          ))}
        </div>
      }
    </div>
  );
}

export default ComicGeneratorPage;
