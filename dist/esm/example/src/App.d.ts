import { Component } from "react";
import type { IHighlight, NewHighlight } from "./react-pdf-highlighter";
import "./style/App.css";
interface State {
    url: string;
    highlights: Array<IHighlight>;
}
declare class App extends Component<{}, State> {
    state: {
        url: string;
        highlights: IHighlight[];
    };
    resetHighlights: () => void;
    toggleDocument: () => void;
    scrollViewerTo: (highlight: any) => void;
    scrollToHighlightFromHash: () => void;
    componentDidMount(): void;
    getHighlightById(id: string): IHighlight | undefined;
    addHighlight(highlight: NewHighlight): void;
    updateHighlight(highlightId: string, position: Object, content: Object): void;
    render(): JSX.Element;
}
export default App;
