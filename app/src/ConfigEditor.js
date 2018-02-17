import React from "react";
import {connect} from "react-redux";
import {saveConfig} from "./actions";

let ConfigEditor = ({dispatch, allResults}) => {
  let input;


  function adjustHeight (el, minHeight) {
    // compute the height difference which is caused by border and outline
    var outerHeight = parseInt(window.getComputedStyle(el).height, 10);
    var diff = outerHeight - el.clientHeight;

    // set the height to 0 in case of it has to be shrinked
    el.style.height = 0;

    // set the correct height
    // el.scrollHeight is the full height of the content, not just the visible part
    el.style.height = Math.max(minHeight, el.scrollHeight + diff) + 'px';
  }


  var textAreas = [].slice.call(document.querySelectorAll('textarea'));

  console.log('ere')

// iterate through all the textareas on the page
  textAreas.forEach(function (el) {

    console.log('ere')
    // we need box-sizing: border-box, if the textarea has padding
    el.style.boxSizing = el.style.mozBoxSizing = 'border-box';

    // we don't need any scrollbars, do we? :)
    el.style.overflowY = 'hidden';

    // the minimum height initiated through the "rows" attribute
    var minHeight = el.scrollHeight;

    el.addEventListener('input', function () {
      adjustHeight(el, minHeight);
    });

    // we have to readjust when window size changes (e.g. orientation change)
    window.addEventListener('resize', function () {
      adjustHeight(el, minHeight);
    });

    // we adjust height to the initial content
    adjustHeight(el, minHeight);
  });

  const prettyPrint = (json) => {
    return JSON.stringify(json, undefined, 4);
  };

  let onSubmit = e => {
    e.preventDefault();
    dispatch(saveConfig(input.value));
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <textarea rows={prettyPrint(allResults).split(/\r\n|\r|\n/).length} defaultValue={prettyPrint(allResults)}
                  placeholder="some text" width='100%' ref={node => {
          input = node
        }}/>
        <button type="submit">Save Config</button>
      </form>
    </div>
  );
};

ConfigEditor = connect()(ConfigEditor);

export default ConfigEditor