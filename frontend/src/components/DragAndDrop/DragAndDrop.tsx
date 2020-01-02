import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Box, Paragraph } from "grommet";
import { Language } from "grommet-icons";
import styled, { keyframes } from "styled-components/macro";
import { isValidFile } from "../../utils/utils";

interface Props {
  uploadFile: () => void;
}

const DragAndDrop: React.FC<Props> = ({ uploadFile }) => {
  const [error, setError] = useState<string | null>(null);
  const [dataToUpload, setDataToUpload] = useState({});

  const [filesLoaded, setFilesLoaded] = useState(0);

  console.log(dataToUpload, "YOLO_ONE");

  const handleFile = (acceptedFiles: File[]) => {
    if (error) setError(null);
    if (acceptedFiles.length > 2) {
      return setError("Currently support no more than 2 files");
    }

    const fileNames = acceptedFiles.map(file => file.name);
    if (!isValidFile(fileNames)) {
      return setError('Your files should be "en.json" and/or "fr.json"');
    }

    setFilesLoaded(acceptedFiles.length);

    acceptedFiles.forEach(file => {
      const reader = new FileReader();

      const language = file.name.split(".")[0];
      reader.onloadend = () => {
        console.log(dataToUpload);
        setDataToUpload(() => ({
          ...dataToUpload,
          [language]: reader.result
        }));
      };
      // reader.onload = (e: Event) => {
      //   console.log(language);
      //   console.log(dataToUpload);
      //   console.log(reader.result);
      // };
      reader.readAsText(file);
    });
    // const reader = new FileReader();
    // reader.readAsText(acceptedFiles[0]);
    // reader.onload = (e: Event) => {
    //   const language = acceptedFiles[0].name.split(".")[0];
    //   setDataToUploadOne(() => ({ [language]: reader.result }));
    //   if (acceptedFiles.length > 1 && reader.readyState === reader.EMPTY) {
    //     reader.readAsText(acceptedFiles[1]);
    //     const language = acceptedFiles[0].name.split(".")[0];
    //     setDataToUploadTwo(() => ({ [language]: reader.result }));
    //   }
    // };
  };

  return (
    <>
      <Box
        width="large"
        height="medium"
        border
        pad="small"
        round="small"
        margin="small"
        justify="center"
      >
        <Dropzone onDrop={handleFile}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <Box
                justify="center"
                align="center"
                {...getRootProps()}
                pad="large"
                focusIndicator={false}
              >
                {filesLoaded === 0 ? (
                  <>
                    <input {...getInputProps()} />
                    <Animation>
                      <Language size="large" color="brand" />
                    </Animation>
                    <Paragraph textAlign="center" size="small">
                      Add your translation file here (.json)
                    </Paragraph>
                  </>
                ) : (
                  <Paragraph>{`${filesLoaded} fichier(s) prêt(s)`}</Paragraph>
                )}
              </Box>
            </section>
          )}
        </Dropzone>
      </Box>
      {error && (
        <Box margin="small">
          <Paragraph textAlign="center" color="red">
            {error}
          </Paragraph>
        </Box>
      )}
    </>
  );
};
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const Animation = styled.div`
  animation: 3s ${fadeIn} ease-in-out infinite;
`;

export default DragAndDrop;
