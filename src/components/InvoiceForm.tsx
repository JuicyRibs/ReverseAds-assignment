/* eslint-disable react/jsx-key */
import { Field, Formik, Form, FieldArray } from 'formik';
import React from 'react';
import { Invoices, Invoice, InvoiceItem } from '../Types/invoice';

interface IForm {
  close: () => void;
}

export const InvoiceForm = ({ close }: IForm) => {
  const getInvoices = (): Invoices | null => {
    const data = localStorage.getItem('invoice');
    if (data) {
      const jsonData = JSON.parse(data);
      return jsonData;
    } else {
      return null;
    }
  };

  const addInvoice = (invoice: Invoice) => {
    const invoicesData = getInvoices();
    // append new invoice to current data
    const newData = [...invoicesData!.invoices, invoice];
    localStorage.setItem(
      'invoice',
      JSON.stringify({
        invoices: invoicesData ? newData : invoice,
      })
    );
    // Reload to show new data. There're better ways to trigger component rerender but this is the easiest one concerning the time constraint
    location.reload();
  };

  // Convert array to readable string for the mail
  const itemsToString = (items: InvoiceItem[]) => {
    let text = '';
    items.forEach((item) => {
      text = `${text}\n${item.key} - ${item.amount} ${item.unit} - ${
        item.price
      } per ${item.unit} - Total: ${item.price! * item.amount!}`;
    });
    return text;
  };

  const submitForm = (invoice: Invoice) => {
    addInvoice(invoice);
    // Open mail app and define parameters (subject, body, recipient)
    window.open(
      `mailto:${invoice.recipient}?subject='${invoice.status} Invoice ${
        invoice.title
      }'&body=${itemsToString(invoice.items)} ${invoice.note}`,
      '_blank'
    );
  };

  const initValues: Invoice = {
    items: [{ key: '' }],
    note: '',
    status: 'pending',
    title: '',
    recipient: '',
  };

  return (
    <div className='rounded m-2 shadow p-2'>
      {/* Using formik to handle form value */}
      <Formik initialValues={initValues} onSubmit={submitForm}>
        {({ values, resetForm }) => (
          <>
            <div className='flex items-center justify-between'>
              <div className='font-semibold align-middle'>Create invoice</div>
              <button
                className='p-2 hover:scale-125 hover:text-red-600'
                onClick={() => {
                  resetForm();
                  close();
                }}>
                x
              </button>
            </div>
            <Form className='flex flex-col space-y-2'>
              <Field
                className='border p-1'
                id='title'
                name='title'
                placeholder='Invoice title'
              />
              {/* Field array for line item. Can add more item with Add button */}
              <FieldArray name='items'>
                {({ remove, push }) => (
                  <>
                    {values.items.length > 0 &&
                      values.items.map((item, index) => (
                        <div className='flex space-x-1'>
                          <Field
                            className='border p-1 w-1/2'
                            name={`items.${index}.key`}
                            placeholder='Item name'
                          />
                          <Field
                            className='border p-1 w-1/6'
                            name={`items.${index}.amount`}
                            placeholder='Amount'
                          />
                          <Field
                            className='border p-1 w-1/6'
                            name={`items.${index}.unit`}
                            placeholder='Unit'
                          />
                          <Field
                            className='border p-1 w-1/6'
                            name={`items.${index}.price`}
                            placeholder='Price/unit'
                          />
                          <button
                            disabled={values.items.length === 1}
                            type='button'
                            className='bg-gray-50 w-[34px] text-slate-400 hover:bg-red-500 text-slate-900 rounded disabled:bg-slate-400 disabled:text-slate-400'
                            onClick={() => remove(index)}>
                            x
                          </button>
                        </div>
                      ))}
                    <button
                      type='button'
                      className='bg-blue-400 rounded hover:bg-blue-600 hover:text-white p-2'
                      onClick={() => push({ key: '' })}>
                      Add item
                    </button>
                  </>
                )}
              </FieldArray>

              <Field
                className='border p-1'
                as='textarea'
                id='note'
                name='note'
                placeholder='Note'
              />
              <Field
                className='border p-1'
                id='recipient'
                name='recipient'
                placeholder='Recipient email'
              />

              <button
                type='submit'
                className='bg-green-500 rounded hover:bg-green-600 hover:text-white p-2'>
                Submit
              </button>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};
