import FullWidthFormLayout from '@client/components/atoms/FullWidthFormLayout';
import {DropzoneArea, DropzoneAreaProps} from 'material-ui-dropzone';
import React from 'react';

export type IDropzoneProps = Pick<DropzoneAreaProps, 'onChange' | 'onDelete'>;

function Dropzone(props: IDropzoneProps) {
  const {onChange, onDelete} = props;

  return (
    <FullWidthFormLayout>
      <DropzoneArea
        acceptedFiles={['image/bmp', 'image/png', 'image/jpeg', 'image/x-xbitmap']}
        dropzoneText={'Drag and drop an images or click here'}
        onChange={onChange}
        onDelete={onDelete}
        filesLimit={5}
        showAlerts={false}
        previewGridClasses={{}}
      />
    </FullWidthFormLayout>
  );
}

export default Dropzone;
