import { useState , useRef} from "react";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

export function useComicGenerator() {
  const [selectedPanel, setSelectedPanel] = useState(1);
  const [panelText, setPanelText] = useState("");
  const [comicImages, setComicImages] = useState(Array(10).fill("https://www.yiwubazaar.com/resources/assets/images/default-product.jpg"));
  const [SpeechBubble, setSpeechBubble] = useState(Array(10).fill(""));
  const [isImage, setisImage] = useState(Array(10).fill(0));
  const [isLoading, setIsLoading] = useState(false);
  const comicPanelRef = useRef(null);
  async function query(data) {
    const response = await fetch(
      "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
      {
        headers: {
          Accept: "image/png",
          Authorization: `Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }
    const result = await response.blob();
    console.log(result);
    return URL.createObjectURL(result);
  }

  const handleTextChange = (event) => {
    if (!isLoading) {
      setPanelText(event.target.value);
    }
  };
  const handleSpeechChange = (event) => {
    const updatedBubbleText = [...SpeechBubble];
    updatedBubbleText[selectedPanel - 1] = event.target.value;
    setSpeechBubble(updatedBubbleText);
  };

  const handlePanelChange = (event) => {
    if (!isLoading) {
      const newSelectedPanel = Number(event.target.value);
      setSelectedPanel(newSelectedPanel);
    }
  };

  const generateComicPanel = async () => {
    if (!isLoading) {
      setIsLoading(true);
      try {
        const data=panelText
        setPanelText("")
        const image = await query({ inputs: data }).finally(() => {
          setIsLoading(false);
        });
        
        const updatedComicImages = [...comicImages];
        updatedComicImages[selectedPanel - 1] = image;
        setComicImages(updatedComicImages);
        const updateIsImage = [...isImage];
        updateIsImage[selectedPanel - 1] =true;
        setisImage(updateIsImage);
      } catch (error) {
        setIsLoading(false);
        console.error("Error generating comic panel:", error);
      }
    }
  };
  const handleDownload = () => {
    if(isImage[selectedPanel-1]){
      html2canvas(comicPanelRef.current).then((canvas) => {
          canvas.toBlob((blob) => {
              saveAs(blob, `comic_panel_${selectedPanel}.png`);
          });
      });
    }
};

  return {
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
    handleDownload,
    comicPanelRef,
    handleDownload,
  };
}
