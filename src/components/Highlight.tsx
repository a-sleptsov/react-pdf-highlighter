import React, { FC } from 'react';

import '../style/Highlight.css';

import type { LTWHP } from '../types.js';

const EMPTY_FUNC = () => {};

interface Props {
  position: {
    boundingRect: LTWHP;
    rects: Array<LTWHP>;
  };
  onClick?: () => void;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
  comment: {
    emoji: string;
    text: string;
  };
  isScrolledTo: boolean;
}

export const Highlight: FC<Props> = ({
  position,
  onClick,
  onMouseOver,
  onMouseOut,
  comment,
  isScrolledTo,
}) => {
  const { rects, boundingRect } = position;

  return (
    <div
      className={`Highlight ${isScrolledTo ? 'Highlight--scrolledTo' : ''}`}
    >
      {comment ? (
        <div
          className="Highlight__emoji"
          style={{
            left: 20,
            top: boundingRect.top,
          }}
        >
          {comment.emoji}
        </div>
      ) : null}
      <div className="Highlight__parts">
        {rects.map((rect) => (
          <div
            role="button"
            aria-label="Highlight part"
            tabIndex={-1}
            onKeyDown={(event) => event.preventDefault()}
            onBlur={(event) => event.preventDefault()}
            onFocus={(event) => event.preventDefault()}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            onClick={onClick}
            key={rect.left}
            style={rect}
            className="Highlight__part"
          />
        ))}
      </div>
    </div>
  );
};

Highlight.defaultProps = {
  onClick: EMPTY_FUNC,
  onMouseOver: EMPTY_FUNC,
  onMouseOut: EMPTY_FUNC,
};

export default Highlight;
