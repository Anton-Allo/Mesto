'use strict';

export class Section {    
  constructor({ data, renderer }, containerSelector) {        
       this._renderedItems = data;        
       this._container = document.querySelector(containerSelector);        
       this._renderer = renderer;    
};

  rendererItems(initialArray) {
    initialArray.forEach((item) => {
      this._renderer(item);
    });
  };

  setItem(card) {
    this._container.prepend(card);
  };
};