import xmlToJson from '../../helpers/xmlToJson'

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

      let parser = parser = new DOMParser();
      let xmlDoc = parser.parseFromString(reader.result,"image/svg+xml");

      //console.log('xmlDoc', xmlDoc);
      let parsedSvg = xmlToJson(xmlDoc);

      console.log('parsedSvg', parsedSvg);

    }

    reader.onerror = function(err) {
      dispatch({ type: 'READ_SVG_ERROR', payload: { error: err }});
    }

    reader.readAsText(file);

  };

}
