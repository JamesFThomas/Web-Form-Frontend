'use client';

import {
  useEffect,
  // useMemo, // TODO - Uncomment this line to use useMemo
  useState,
} from 'react';

import FormsTable from '@/components/FormsTable';
import { mockForms } from '@/data/mockForms';

export type Form = {
  Id: number;
  FirstName: string;
  LastName: string;
  Message: string;
  Completed: boolean;
};

export const dynamic = 'force-dynamic';

export default function FormsTableView() {
  const [forms, setForms] = useState<Form[]>([]);

  // TODO - Uncomment the fetchData function below to fetch data from the API
  // const fetchData = useMemo(
  //   () => async () => {
  //     fetch('https://localhost:5001/Forms', {
  //       method: 'GET',
  //       headers: {
  //         Accept: 'text/plain',
  //         'Content-Type': 'application/json',
  //         'Access-Control-Allow-Origin': '*', // Required for CORS support to work
  //         'Access-Control-Allow-Credentials': 'true', // Required for cookies, authorization headers with HTTPS
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => setForms(data))
  //       .catch((error) => console.error('Fetch Error', error));
  //   },
  //   [],
  // );

  useEffect(() => {
    // setForms(mockForms);
    const fetchData = async () => {
      fetch('https://localhost:5001/Forms', {
        method: 'GET',
        headers: {
          Accept: 'text/plain',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          'Access-Control-Allow-Credentials': 'true', // Required for cookies, authorization headers with HTTPS
        },
      })
        .then((response) => response.json())
        .then((data) => setForms(data))
        .catch((error) => console.error('Fetch Error', error));
    };
    fetchData();
  }, []);

  // console.log(forms);

  if (forms.length === 0) {
    return <h1>Loading...</h1>;
  }

  return <FormsTable forms={mockForms} />; // TODO - Change mockForms to forms once you figure out why fetched forms won't render
}
