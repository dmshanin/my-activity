import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import type { NextPage } from 'next';
import Link from '@/components/Link';
import Layout from '@/components/Layout';
import CircularProgress from '@mui/material/CircularProgress';
import { Seo } from '@/constants'
import { Sections } from '@/constants';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const fetchCommonData = async () => {
	const response = await fetch('/api/v1/activity/');

	const result = await response.json();

	if (response.status !== 200) {
		throw new Error('Common data were not fetched.');
	}

	return result;
};

const Home: NextPage = () => {
	const { ESection } = Sections;
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
    <Layout
		title={Seo.home.title}
		section={ESection.Random}
	>
        {data && !loading && false && (
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

				<Button
					variant="contained"
					onClick={fetchNewActivity}
				>
					Еще!
				</Button>
			</div>
		)}

		{data && !loading && (
			<Stack
				sx={{
					height: '100%',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Typography
					variant="h4"
					gutterBottom
					align="center"
				>
					{data.activity}
					{data.link !== '' && (
						<Link
							href={`${data.link}`}
							target="_blank"
							sx={{
								ml: 2,
								verticalAlign: 'super'
							}}
						>
							<OpenInNewIcon />
						</Link>
					)}
				</Typography>

				<Button
					sx={{
						mt: 4
					}}
					variant="contained"
					onClick={fetchNewActivity}
				>
					Еще!
				</Button>
			</Stack>
		)}

		{loading && (
			<Stack
				sx={{
					height: '100%',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<CircularProgress />
			</Stack>
		)}
    </Layout>
  );
};

export default Home;
