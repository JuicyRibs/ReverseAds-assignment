/* eslint-disable react/jsx-key */
import React from 'react';
import { useState } from 'react';
import { Invoice } from '../Types/invoice';

interface ICard {
  props: Invoice;
}

export const InvoiceCard = ({ props }: ICard) => {
  const { items, note, status, title, recipient } = props;
  const [active, setActive] = useState(false);

  const toggleActive = () => {
    setActive(!active);
  };

  // Return colored text depending on the status
  const statusHandler = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className='text-yellow-400'>{status}</span>;
      case 'fulfilled':
        return <span className='text-green-600'>{status}</span>;
      case 'late':
        return <span className='text-red-600'>{status}</span>;
      case 'outstanding':
        return <span className='text-orange-500'>{status}</span>;
      default:
        return <span className='text-slate-900'>{status}</span>;
    }
  };

  const totalCalculate = () => {
    let price = 0;
    items.forEach((i) => (price += i.amount! * i.price!));
    return price;
  };

  return (
    <>
      <div className='rounded shadow p-2' onClick={toggleActive}>
        <div className='flex justify-between'>
          <div className='font-semibold'>{title}</div>
          <div className='italic'>{statusHandler(status)}</div>
        </div>
        {active && (
          <>
            <table className='border-collapse border border-slate-500 table-fixed w-full mt-4'>
              <thead>
                <tr className='text-left'>
                  <th className='w-1/2 p-2 border border-slate-300'>Items</th>
                  <th className='p-2 border border-slate-300'>Amount</th>
                  <th className='p-2 border border-slate-300'>Price(unit)</th>
                  <th className='p-2 border border-slate-300'>Total</th>
                </tr>
              </thead>
              <tbody>
                {items &&
                  items.map((i) => (
                    <tr>
                      <td className='p-2 border border-slate-300'>{i.key}</td>
                      <td className='p-2 border border-slate-300'>
                        {i.amount} {i.unit}
                      </td>
                      <td className='p-2 border border-slate-300'>
                        {i.price}
                        {i.unit && `/${i.unit}`}
                      </td>
                      <td className='p-2 border border-slate-300'>
                        {i.amount! * i.price!}
                      </td>
                    </tr>
                  ))}
                <tr>
                  <td className='p-2 border-l border-b border-slate-300 font-bold'>
                    Total
                  </td>
                  <td className='p-2 border-b border-slate-300' />
                  <td className='p-2 border-b border-slate-300' />
                  <td className='p-2 border border-slate-300 font-bold'>
                    {totalCalculate()}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className='mt-2'>
              Note: <span className='italic'>{note}</span>
            </div>
            <div className='mt-2'>
              Recipient: <span className='font-semibold'>{recipient}</span>
            </div>
          </>
        )}
      </div>
    </>
  );
};
