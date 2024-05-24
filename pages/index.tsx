import HeadSEO from '../components/HeadSEO';
import TableComponent from '../components/TableComponent';
import { Flex, Tag } from 'antd';
import React, { useEffect, useState } from 'react';

const tagsData = ['Robbery', 'Fraud', 'Cyber', 'Kidnapping'];

interface ApiResponse {
  data: any[];
}

export default function Home() {
  const [selectedTags, setSelectedTags] = React.useState<string>('');
  const [data, setData] = useState<ApiResponse>({ data: [] });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.API_BASEURL}${selectedTags && `?tag=${selectedTags}`}`);
      const data: ApiResponse = await res.json();
      setData(data);
    };
    fetchData();
  }, [selectedTags]);

  const handleChange = (tag: string) => {
    if (selectedTags === tag) {
      setSelectedTags('');
      return;
    }
    setSelectedTags(tag);
  };

  return (
    <div>
      <HeadSEO />
      <main>
        <p className="text-center font-bold text-3xl py-8">Dummy Aggregation Data</p>
        <section className="m-auto w-full flex justify-center items-center my-8">
          <Flex gap={4} wrap align="center">
            <span className="mr-2">Filter by:</span>
            {tagsData.map<React.ReactNode>((tag) => (
              <Tag.CheckableTag key={tag} checked={selectedTags.includes(tag)} onChange={(checked) => handleChange(tag)}>
                {tag}
              </Tag.CheckableTag>
            ))}
          </Flex>
        </section>

        <TableComponent data={data?.data} />
      </main>
    </div>
  );
}
