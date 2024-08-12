"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const YearPage = ({ params }) => {
  const { year } = params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/Investor/disclosure?year=${year}`);
        setData(response.data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [year]);

  if (error) return <div className="text-red-600">Error: {error.message}</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <section className="investor_sec my-5 py-5">
      <div className="container mx-auto px-4">
        <div className="row">
          <div className="inn-content-wrap">
            <h1 className="text-3xl font-bold mb-6">Investor Disclosures - {year}</h1>
            {data.map((item, index) => (
              <p key={item.id} className="mb-2">
                <a 
                  href={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${item.file_path}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {index + 1}. {item.title}
                </a>
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default YearPage;