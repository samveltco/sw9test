// ©2024 Austin App House. All rights reserved.
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MDBCol, MDBIcon, MDBRow } from 'mdbreact';
import FilePreviewElement from '../../../../FilePreviewElement';

const UploadDocumentsField = ({
  input: { value, onChange },
  toggleModal,
  documentVisibility,
  formName,
  change
}) => {
  const [imgSrc, setImgSrc] = useState([]);

  useEffect(() => {
    for (let i = 0; i < value.length; i++) {
      const element = value[i];
      createFileObj(element);
    }
  }, [value]);

  const createFileObj = useCallback((file) => {
    
    if (typeof file === 'string') {
      setImgSrc((prev) => [...new Set([...prev, file])]);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    const imageNameSplittedArray = file.name.split('.');
    const fileType = (
      ['png', 'jpg', 'jpeg', 'bmp'].includes(imageNameSplittedArray[imageNameSplittedArray.length - 1])
    ) ? 'image' : 'file';
    reader.onloadend = () => {
      setImgSrc(prev => [...prev, {
        type: fileType,
        file: reader.result,
        name: file.name,
      }]);
    };

    
  }, [value, imgSrc])

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      toggleModal(
        true,
        'confirmModal',
        true,
        {
          onAccept: () => {
            onChange([...value, ...files]);
            const visibilitiItems = {}
            Object.values(files).forEach((f) => {
              visibilitiItems[encodeURIComponent(`${f.name}`).replace(/\./g, '%2E')] = true
            })
            change(formName, 'documentVisibility', {...documentVisibility, ...visibilitiItems});
          },
          header: 'Make this document viewable to the contractor prior to assignment?',
          buttonLabels: { reject: 'No' },
          onReject: () => {
            onChange([...value, ...files]);
            const visibilitiItems = {}
            Object.values(files).forEach((f) => {
              visibilitiItems[encodeURIComponent(`${f.name}`).replace(/\./g, '%2E')] = false
            })
            change(formName, 'documentVisibility', {...documentVisibility, ...visibilitiItems});
          }
        },
      );
     
    }
  };

  const removeImage = (index) => {
    setImgSrc(prev => prev.filter((el, i) => i !== index));
    onChange(value.filter((el, i) => i !== index));
  };

  return (
    <>
      <MDBRow className="no-margins">
        <MDBCol className="flex-box justify-content-start">
          <div
            className="drag-and-drop-element flex-box align-items-center flex-column"
          >
            <MDBIcon
              icon="cloud-upload-alt"
              style={{
                color: 'gray',
                opacity: 0.4,
              }}
              size="2x"
            />
            <input
              type="file"
              className="form-control font11 full-width no-paddings"
              style={{
                height: '100%',
              }}
              multiple
              placeholder="Upload file"
              onChange={handleFileUpload}
            />
          </div>
        </MDBCol>
      </MDBRow>
      <MDBRow className="h-paddings-half">
        {
          imgSrc.map((data, i) => (
            <FilePreviewElement
              /* eslint-disable-next-line react/no-array-index-key */
              key={(data?.name || data) + i}
              fileInfo={data}
              data={data}
              index={i}
              removeImage={removeImage}
              toggleModal={toggleModal}
            />
          ))
        }
      </MDBRow>
    </>
  );
};

export default UploadDocumentsField;
