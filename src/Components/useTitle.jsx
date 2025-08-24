import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const useTitle = (key) => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t(key)}`;
  }, [key, t]);
};

export default useTitle;
