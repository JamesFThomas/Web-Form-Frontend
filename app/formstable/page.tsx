'use client';

import { useCallback, useEffect, useState } from 'react';

import AllFormsTable from '@/components/AllFormsTable';

import CircularProgress from '@mui/material/CircularProgress';

export type Form = {
  Id: number;
  FirstName: string;
  LastName: string;
  Message: string;
  Completed: boolean;
};

export const dynamic = 'force-dynamic';

export default function FormsTableView() {
  const [forms, setForms] = useState<Form[] | undefined>(undefined);

  const fetchReFetchData = useCallback(async () => {
    const fetchedData = await fetch('https://localhost:5001/Forms', {
      method: 'GET',
      headers: {
        Accept: 'text/plain',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Access-Control-Allow-Credentials': 'true', // Required for cookies, authorization headers with HTTPS
      },
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.error('Fetch Error', error));

    setForms(fetchedData);
  }, []);

  useEffect(() => {
    if (!forms) {
      fetchReFetchData();
    }
  }, [fetchReFetchData, forms]);

  if (forms === undefined) {
    return <CircularProgress size="3rem" />;
  }

  return (
    forms && <AllFormsTable formsData={forms} refreshData={fetchReFetchData} />
  );
}
