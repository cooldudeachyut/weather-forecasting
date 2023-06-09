import React, { useEffect, useState, useRef } from "react";

const Map = (props) => {
  const [html, setHTML] = useState({
    __html: "",
  });
  const firstInitialization = useRef(true);

  async function executeScriptElements(containerElement) {
    if (html.__html && firstInitialization.current) {
      const scriptElements = containerElement.querySelectorAll("script");

      for (const scriptElement of Array.from(scriptElements)) {
        try {
          await new Promise((resolve, reject) => {
            const clonedElement = document.createElement("script");

            Array.from(scriptElement.attributes).forEach((attribute) => {
              clonedElement.setAttribute(attribute.name, attribute.value);
            });

            clonedElement.text = scriptElement.text;
            clonedElement.onload = resolve;
            clonedElement.onerror = reject;

            scriptElement.parentNode.replaceChild(clonedElement, scriptElement);
          });
        } catch {
          console.log("Error executing script");
          continue;
        }
      }
      firstInitialization.current = false;
    }
  }

  const { geoLocation, zoom } = props;

  useEffect(() => {
    async function createMarkup() {
      let response;
      response = await fetch(
        `/map?lat=${geoLocation.latitude}&lng=${geoLocation.longitude}&zoom=${zoom}`
      );
      const backendHtmlString = await response.text();

      return { __html: backendHtmlString };
    }
    createMarkup().then((result) => {
      setHTML(result);
    });
  }, [geoLocation]);

  useEffect(() => {
    executeScriptElements(document.getElementById("map-container"));
  }, [html]);

  return <div id="map-container" dangerouslySetInnerHTML={html}></div>;
};

export default Map;
