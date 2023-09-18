import React, { useRef } from "react";

export default function FileBtn(props) {
  const fileRef = useRef(null);
  const { multiple } = props;
  const handleFileChange = () => {
    multiple ||
      props.handleFile(
        fileRef.current.files[0],
        URL.createObjectURL(fileRef.current.files[0])
      );
    multiple && props.handleFile(fileRef.current.files);
  };

  return (
    <div>
      <div className="choose_file">
        {props.children}
        <input
          onChange={handleFileChange}
          ref={fileRef}
          type="file"
          multiple={multiple}
        />
      </div>
    </div>
  );
}
