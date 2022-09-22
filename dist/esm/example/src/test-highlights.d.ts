export declare const testHighlights: {
    "https://arxiv.org/pdf/1708.08021.pdf": ({
        content: {
            text: string;
            image?: undefined;
        };
        position: {
            boundingRect: {
                x1: number;
                y1: number;
                x2: number;
                y2: number;
                width: number;
                height: number;
                pageNumber?: undefined;
            };
            rects: {
                x1: number;
                y1: number;
                x2: number;
                y2: number;
                width: number;
                height: number;
            }[];
            pageNumber: number;
        };
        comment: {
            text: string;
            emoji: string;
        };
        id: string;
    } | {
        content: {
            text: string;
            image?: undefined;
        };
        position: {
            boundingRect: {
                x1: number;
                y1: number;
                x2: number;
                y2: number;
                width: number;
                height: number;
                pageNumber: number;
            };
            rects: {
                x1: number;
                y1: number;
                x2: number;
                y2: number;
                width: number;
                height: number;
                pageNumber: number;
            }[];
            pageNumber: number;
        };
        comment: {
            text: string;
            emoji: string;
        };
        id: string;
    } | {
        content: {
            image: string;
            text?: undefined;
        };
        position: {
            boundingRect: {
                x1: number;
                y1: number;
                x2: number;
                y2: number;
                width: number;
                height: number;
                pageNumber: number;
            };
            rects: never[];
            pageNumber: number;
        };
        comment: {
            text: string;
            emoji: string;
        };
        id: string;
    })[];
    "https://arxiv.org/pdf/1604.02480.pdf": {
        content: {
            text: string;
        };
        position: {
            boundingRect: {
                x1: number;
                y1: number;
                x2: number;
                y2: number;
                width: number;
                height: number;
                pageNumber: number;
            };
            rects: {
                x1: number;
                y1: number;
                x2: number;
                y2: number;
                width: number;
                height: number;
                pageNumber: number;
            }[];
            pageNumber: number;
        };
        comment: {
            text: string;
            emoji: string;
        };
        id: string;
    }[];
};
