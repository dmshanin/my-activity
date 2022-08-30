import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Link from '@/components/Link';
import Layout from '@/components/Layout';
import CircularProgress from '@mui/material/CircularProgress';

const fetchCommonData = async () => {
	const response = await fetch('/api/v1/activity/');

	const result = await response.json();

	if (response.status !== 200) {
		throw new Error('Common data were not fetched.');
	}

	return result;
};

const Home: NextPage = () => {
  const fetchNewActivity = () => {
		setLoading(true);

		fetchCommonData().then((data) => {
			console.log('asd', data);
			setData(data);
		}).finally(() => {
			setLoading(false);
		})
	};
	const [ data, setData ] = useState(null);
	const [ loading, setLoading ] = useState(false);
	useEffect(() => {
		fetchNewActivity();
	}, []);

  return (
    <Layout>
        {data && !loading && (
					<div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
						{false && (<p>Идентификатор: {data.key}</p>)}
						
						<p className="mb-2"><span className="font-bold">Активность:</span> {data.activity}</p>

						<p className="mb-2"><span className="font-bold">Доступность:</span> {data.accessibility}</p>
						
						<p className="mb-2"><span className="font-bold">Участники:</span> {data.participants}</p>
						
						<p className="mb-2"><span className="font-bold">Цена:</span> {data.price}</p>
						
						<p className="mb-2"><span className="font-bold">Тип:</span> {data.type}</p>
						
						{data.link !== '' && (
							<p><Link href={`${data.link}`} target="_blank">Подробнее</Link></p>
						)}

						<button className="mt-5 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={fetchNewActivity}>Еще!</button>
					</div>
				)}

				{loading && (
					<CircularProgress />
				)}
    </Layout>
  );
};

export default Home;
