import React, { FC, useCallback } from 'react';

import { Rnd } from 'react-rnd';
import { getPageFromElement } from '../lib/pdfjs-dom';

import '../style/AreaHighlight.css';

import type { LTWHP, ViewportHighlight } from '../types';

interface Props {
  highlight: ViewportHighlight;
  onChange: (rect: LTWHP) => void;
  isScrolledTo: boolean;
}

export const AreaHighlight: FC<Props> = ({
  highlight,
  onChange,
  isScrolledTo,
  ...otherProps
}) => {
  const onDragStop = useCallback((_, data) => {
    const boundingRect: LTWHP = {
      ...highlight.position.boundingRect,
      top: data.y,
      left: data.x,
    };

    onChange(boundingRect);
  }, [highlight.position.boundingRect, onChange]);

  return (
    <div
      className={`AreaHighlight ${
        isScrolledTo ? 'AreaHighlight--scrolledTo' : ''
      }`}
    >
      <Rnd
        className="AreaHighlight__part"
        onDragStop={onDragStop}
        onResizeStop={(_mouseEvent, _direction, ref, _delta, position) => {
          const boundingRect: LTWHP = {
            top: position.y,
            left: position.x,
            width: ref.offsetWidth,
            height: ref.offsetHeight,
            pageNumber: getPageFromElement(ref)?.number || -1,
          };

          onChange(boundingRect);
        }}
        position={{
          x: highlight.position.boundingRect.left,
          y: highlight.position.boundingRect.top,
        }}
        size={{
          width: highlight.position.boundingRect.width,
          height: highlight.position.boundingRect.height,
        }}
        onClick={(event: Event) => {
          event.stopPropagation();
          event.preventDefault();
        }}
        {...otherProps}
      />
    </div>
  );
};

export default AreaHighlight;
