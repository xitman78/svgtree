import xmlSvgToJson from '../../helpers/xmlSvgToJson'

export function readSvgFile(file) {

  console.log('File', file);

  return (dispatch) => {

    dispatch({
      type: 'READING_SVG_FILE',
      payload: { file }
    });

    if(file.size > 1024*100) {
      dispatch({ type: 'READ_SVG_ERROR', payload: { error: 'SVG file is larger than 100kb' }});
      return;
    }

    if(file.type && file.type.indexOf('svg') === -1) {
      dispatch({ type: 'READ_SVG_ERROR', payload: { error: 'Invalid file type' }});
      return;
    }

    let reader = new FileReader();

    reader.onload = function(e) {
      dispatch({ type: 'READ_SVG_RESULT', payload: { result: reader.result}});

      let svgText = reader.result.replace(/<!DOCTYPE(.*)>/ig, ''); // remove !Doctype to prevent two SVG tags

      let parser = parser = new DOMParser();
      let xmlDoc = parser.parseFromString(svgText,"image/svg+xml");

      let parsedSvg = xmlSvgToJson(xmlDoc);

      if (parsedSvg.children && parsedSvg.children.length === 1 && parsedSvg.children[0].tag && parsedSvg.children[0].tag.toLowerCase() === 'svg') {
        // it seems that SVG is correct
        let svgObj = parsedSvg.children[0];

        console.log('svgObj', svgObj);

        dispatch({ type: 'SVG_PARSED', payload: svgObj });

      } else {
        // fire parse error
        dispatch({ type: 'SVG_PARSE_ERROR', payload: { error: 'Invalid SVG' } });
      }

    }

    reader.onerror = function(err) {
      dispatch({ type: 'READ_SVG_ERROR', payload: { error: err }});
    }

    reader.readAsText(file);

  };

}
