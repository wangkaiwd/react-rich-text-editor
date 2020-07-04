
import React from "react";
import "braft-editor/dist/index.css";
import BraftEditor from "braft-editor";
const initHTML = `<p>你好，世界！</p>`;
// 定义输出转换函数
const unitExportFn = (unit, type, target) => {
  if (type === "line-height") {
    // 输出行高时不添加单位
    return unit;
  }
  // target的值可能是html或者editor，对应输出到html和在编辑器中显示这两个场景
  if (target === "html") {
    // 只在将内容输出为html时才进行转换
    if (unit.includes("pt")) {
      // 复制过来的内容会带有pt单位，需要替换掉
      return unit.replace(/pt/, "px");
    }
    return unit + "px";
  } else {
    if (unit.includes("pt")) {
      return unit.replace(/pt/, "px");
    }
    // 在编辑器中显示时，按px单位展示
    return unit + "px";
  }
};

export default class RichTextEditor extends React.Component {
  state = {
    editorState: BraftEditor.createEditorState(initHTML), // 设置编辑器初始内容
    outputHTML: "<p></p>"
  };

  componentDidMount() {
    const { editorState } = this.state;
    this.setState({
      outputHTML: editorState.toHTML()
    });
  }

  componentWillUnmount() {}

  handleChange = editorState => {
    this.setState({
      editorState: editorState,
      outputHTML: editorState.toHTML()
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <div className="editor-wrapper">
          <BraftEditor
            converts={{ unitExportFn }}
            value={editorState}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}
