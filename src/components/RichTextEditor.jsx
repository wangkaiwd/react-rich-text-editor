import React from 'react';
import 'braft-editor/dist/index.css';
import BraftEditor from 'braft-editor';
import PropTypes from 'prop-types';
import cls from 'classnames';

export default class RichTextEditor extends React.Component {
  // 定义输出转换函数
  unitExportFn = (unit, type, target) => {
    if (type === 'line-height') {
      // 输出行高时不添加单位
      return unit;
    }
    // target的值可能是html或者editor，对应输出到html和在编辑器中显示这两个场景
    this.replaceUnit(unit);
  };
  replaceUnit = (unit) => {
    if (unit.includes('pt')) {
      return unit.replace(/pt/, 'px');
    }
    return unit + 'px';
  };

  render () {
    const { className, editorState, ...rest } = this.props;
    return (
      <div className={cls('editor-wrapper', className)}>
        <BraftEditor
          converts={{ unitExportFn: this.unitExportFn }}
          value={editorState}
          media={{ accepts: { video: false, audio: false } }}
          {...rest}
        />
      </div>
    );
  }
}

RichTextEditor.propTypes = {
  editorState: PropTypes.object,
  className: PropTypes.string,
  controls: PropTypes.array
};

RichTextEditor.defaultProps = {
  controls: ['font-size', 'line-height', 'headings', 'list-ul', 'bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator', 'media']
};
