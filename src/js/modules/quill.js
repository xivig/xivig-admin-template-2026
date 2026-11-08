/**
 * Quill Editor Module - Native initialization of Quill rich text editors
 */
export function initQuillEditors() {
  if (typeof Quill === 'undefined') return;

  // 1. Snow Theme Editor (Full Toolbar)
  const fullEditorEl = document.querySelector('#quillEditor') || document.querySelector('.quill-editor-snow');
  if (fullEditorEl && !fullEditorEl.__quillInstance) {
    fullEditorEl.__quillInstance = new Quill(fullEditorEl, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, 4, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ color: [] }, { background: [] }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ direction: 'rtl' }],
          [{ align: [] }],
          ['blockquote', 'code-block'],
          ['link', 'image', 'video'],
          ['clean']
        ]
      },
      placeholder: 'Compose an epic story with Quill...'
    });
  }

  // 2. Bubble Theme Editor (Inline Tooltip)
  const bubbleEditorEl = document.querySelector('#quillBubbleEditor') || document.querySelector('.quill-editor-bubble');
  if (bubbleEditorEl && !bubbleEditorEl.__quillInstance) {
    bubbleEditorEl.__quillInstance = new Quill(bubbleEditorEl, {
      theme: 'bubble',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          [{ header: [1, 2, false] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'clean']
        ]
      },
      placeholder: 'Highlight text to see the inline bubble formatting toolbar...'
    });
  }

  // 3. Custom / Advanced Editor
  const customEditorEl = document.querySelector('#quillAdvancedEditor') || document.querySelector('.quill-editor-advanced');
  if (customEditorEl && !customEditorEl.__quillInstance) {
    customEditorEl.__quillInstance = new Quill(customEditorEl, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ font: [] }, { size: [] }],
          ['bold', 'italic', 'underline'],
          [{ color: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image'],
          ['clean']
        ]
      },
      placeholder: 'Write formatted documents here...'
    });
  }
}
