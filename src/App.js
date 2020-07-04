import React from 'react';
import RichTextEditor from './components/RichTextEditor';
import BraftEditor from 'braft-editor';

class App extends React.Component {
  state = {
    editorState: BraftEditor.createEditorState('<p>hello</p>'),
  };
  onChange = (editorState) => {
    this.setState({ editorState });
  };

  render () {
    const { editorState } = this.state;
    return (
      <div className="App">
        <RichTextEditor
          className={'xxx'}
          value={editorState}
          onChange={this.onChange}
        />
        <button onClick={() => {console.log(editorState.toHTML());}}>get html</button>
        <button onClick={() => {
          this.setState({
            editorState: BraftEditor.createEditorState('<p>default value</p>')
          });
        }}>set html
        </button>
      </div>
    );
  }
}

export default App;
