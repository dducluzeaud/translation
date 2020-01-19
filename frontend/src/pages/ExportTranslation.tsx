import React, { useState, useEffect,  ChangeEvent } from 'react'
import { Box, CheckBox, Button } from 'grommet'
import { Download } from 'grommet-icons'
import { isEmpty } from 'ramda';
import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import { EXPORT_TRANSLATIONS } from '../graphql/translations/translation';

interface Translations {
  translations: {
    key: string
    languages: {
      en: string
      fr: string
    } 
  }[]
}

function exportToJsonFile(jsonData: object, checked: Checked) {  
  let dataStr = JSON.stringify(jsonData);
  let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

  let exportFileDefaultName = `${checked}.json`;

  let linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}

type Checked = "en" | "fr"
const checkboxes: Checked[] = ["en", "fr"];

const ExportTranslation: React.FC = () => {
  const [checked, setChecked] = useState<Checked[]>([]);
  const { loading, data } = useQuery<Translations>(EXPORT_TRANSLATIONS);



  const onCheckAll = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setChecked(checkboxes);
    } else {
      setChecked([]);
    }
  };

  const onCheck = (event: ChangeEvent<HTMLInputElement>, value: Checked) => {
    if (event.target.checked) {
      setChecked([...checked, value]);
    } else {
      setChecked(checked.filter(item => item !== value));
    }
  };

  const handleDownload = () => {
    for (const language of checked) {
      const exporting: { [key: string] : string} = {};

      for (const translation of data!.translations) {
        exporting[translation.key] = translation.languages[language]
      }
      exportToJsonFile(exporting, language);
    }
  }

  if (loading) return <p>Loading... </p>
  
  return (
  <Box justify="center" align="center" fill>
    <Box direction="row" gap="medium" pad="medium">
      <CheckBox
        checked={checked.length === 2}
        indeterminate={checked.length > 0 && checked.length < 2}
        label="Tous"
        onChange={onCheckAll}
      />
      {checkboxes.map(item => (
        <CheckBox
          key={item}
          checked={checked.includes(item)}
          label={item}
          onChange={e => onCheck(e, item)}
        />
      ))}
    </Box>
    <Button primary icon={<Download />} label='Télecharger' gap="small" onClick={handleDownload} disabled={isEmpty(checked)}/>
  </Box>)
}

export default ExportTranslation
