import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const Editor = ({ placeholder, data, onChange, id, minHeight = 250 }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!editorRef.current || quillRef.current) return undefined;

    quillRef.current = new Quill(editorRef.current, {
      theme: 'snow',
      modules: Editor.modules,
      placeholder,
    });

    // Ensure the editor has a reasonable minimum height
    if (quillRef.current && quillRef.current.root) {
      quillRef.current.root.style.minHeight = `${minHeight}px`;
    }

    if (data) {
      quillRef.current.clipboard.dangerouslyPasteHTML(data);
    }

    const handleChange = () => {
      const nextHtml = quillRef.current.root.innerHTML;
      if (onChangeRef.current) onChangeRef.current(nextHtml);
    };
    quillRef.current.on('text-change', handleChange);

    return () => {
      if (quillRef.current) {
        quillRef.current.off('text-change', handleChange);
        quillRef.current = null;
      }
      if (editorRef.current) {
        editorRef.current.innerHTML = '';
      }
    };
  }, []);

  // Apply minHeight on updates as well
  useEffect(() => {
    if (!quillRef.current) return;
    quillRef.current.root.style.minHeight = `${minHeight}px`;
  }, [minHeight]);

  useEffect(() => {
    if (!quillRef.current) return;
    const current = quillRef.current.root.innerHTML;
    const next = data || '';
    if (next !== current) {
      const selection = quillRef.current.getSelection();
      quillRef.current.clipboard.dangerouslyPasteHTML(next);
      if (selection) {
        quillRef.current.setSelection(selection);
      }
    }
  }, [data]);

  return (
    <div className='m-2'>
      <div id={id} ref={editorRef} />
    </div>
  );
};

Editor.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}

/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

export default Editor;
