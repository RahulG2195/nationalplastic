import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Transaction = () => {
  return (
    <section className='investor_sec py-5'>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <div className="table-responsive">
              <table className='table table-bordered table-hover'>
                <thead>
                  <tr>
                    <th colSpan="2" className='text-center'>Related Party Transactions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <ul className="list-unstyled mb-0">
                        <li className='border-bottom border-2 py-1'><a href="/Assets/pdf/Disclosure-on-Related-Party-Transactions-BSE.pdf" target="_blank" rel="noopener noreferrer">Disclosure on Related Party Transactions - BSE</a></li>
                        <li className='border-bottom border-2 py-1'><a href="/Assets/pdf/Disclosure%20on%20Related%20Party%20Transactions_Sept.%202020.pdf" target="_blank" rel="noopener noreferrer">Disclosure on Related Party Transactions_Sept.2020</a></li>
                        <li className='border-bottom border-2 py-1'><a href="/Assets/pdf/Disclosure%20on%20Related%20Party%20Transactions_March%202021.pdf" target="_blank" rel="noopener noreferrer">Disclosure on Related Party Transactions_March.2021</a></li>
                        <li className='border-bottom border-2 py-1'><a href="/Assets/pdf/Disclosure%20of%20Related%20Party%20Transaction_Sept.2021.pdf" target="_blank" rel="noopener noreferrer">Disclosure of Related Party Transaction_Sept.2021</a></li>
                        <li className='border-bottom border-2 py-1'><a href="/Assets/pdf/Disclosure%20of%20Related%20Party%20Transaction_March.2022.pdf" target="_blank" rel="noopener noreferrer">Disclosure of Related Party Transaction_March.2022</a></li>
                        <li className='border-bottom border-2 py-1'><a href="/Assets/pdf/Disclosure%20of%20Related%20Party%20Transaction_Sept.2022.pdf" target="_blank" rel="noopener noreferrer">Disclosure of Related Party Transaction_Sept.2022</a></li>
                        <li className='border-bottom border-2 py-1'><a href="/Assets/pdf/Disclosure%20of%20Related%20Party%20Transaction_March%202023.pdf" target="_blank" rel="noopener noreferrer">Disclosure of Related Party Transaction_March 2023</a></li>
                        <li className='border-bottom border-2 py-1'><a href="/Assets/pdf/Related%20Party%20Transaction%20Report.pdf" target="_blank" rel="noopener noreferrer">Disclosure of Related Party Transaction_Sept 2023</a></li>
                        <li className='border-bottom border-2 py-1'><a href="/Assets/pdf/31.03.2024(1).pdf" target="_blank" rel="noopener noreferrer">Disclosure of Related Party Transaction_March 2024</a></li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Transaction;
