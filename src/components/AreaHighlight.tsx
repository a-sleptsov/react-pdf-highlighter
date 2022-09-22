import React, { FC, useCallback, useMemo } from 'react';

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
  const areaHighlightPosition = useMemo(() => ({
    x: highlight.position.boundingRect.left,
    y: highlight.position.boundingRect.top,
  }), [highlight.position.boundingRect.left, highlight.position.boundingRect.top]);

  const areaHighlightSize = useMemo(() => ({
    width: highlight.position.boundingRect.width,
    height: highlight.position.boundingRect.height,
  }), [highlight.position.boundingRect.width, highlight.position.boundingRect.height]);

  const onDragStop = useCallback((_, data) => {
    const boundingRect: LTWHP = {
      ...highlight.position.boundingRect,
      top: data.y,
      left: data.x,
    };

    onChange(boundingRect);
  }, [highlight.position.boundingRect, onChange]);

  const onResizeStop = useCallback((_mouseEvent, _direction, ref, _delta, position) => {
    const boundingRect: LTWHP = {
      top: position.y,
      left: position.x,
      width: ref.offsetWidth,
      height: ref.offsetHeight,
      pageNumber: getPageFromElement(ref)?.number || -1,
    };

    onChange(boundingRect);
  }, [onChange]);

  const handleClick = useCallback((event: Event) => {
    event.stopPropagation();
    event.preventDefault();
  }, []);

  return (
    <Rnd
      className={`AreaHighlight ${isScrolledTo ? 'scrolledTo' : ''}`}
      onDragStop={onDragStop}
      onResizeStop={onResizeStop}
      position={areaHighlightPosition}
      size={areaHighlightSize}
      onClick={handleClick}
      {...otherProps}
    />
  );
};

export default AreaHighlight;
