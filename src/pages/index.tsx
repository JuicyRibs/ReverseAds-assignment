/* eslint-disable react/jsx-key */
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { InvoiceCard } from '../components/InvoiceCard';
import { InvoiceForm } from '../components/InvoiceForm';
import { Invoices } from '../Types/invoice';

export default function Home() {
  const [invoices, setInvoices] = useState<Invoices>();
  // Use to show/hide invoice form
  const [addMode, setAddMode] = useState(false);

  // Load data from local storage
  useEffect(() => {
    const data = localStorage.getItem('invoice');
    if (data) setInvoices(JSON.parse(data));
  }, []);

  const closeAddMode = () => {
    setAddMode(false);
  };

  return (
    <>
      <Head>
        <title>Invoicing App</title>
        <meta name='description' content='Create invoice app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='container'>
        <div className='text-2xl font-bold my-3'>Invoicing System</div>
        {!addMode && (
          <button
            className='w-full rounded m-2 shadow p-2 font-semibold bg-green-400 hover:bg-green-500'
            onClick={() => setAddMode(true)}>
            + Create new invoice
          </button>
        )}
        {addMode && <InvoiceForm close={closeAddMode} />}
        <div className='font-bold text-lg my-3'>Invoices list</div>
        <div className='space-y-4'>
          {invoices && invoices.invoices.map((i) => <InvoiceCard props={i} />)}
        </div>
      </div>
    </>
  );
}
