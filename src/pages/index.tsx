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

const fetchActivityData = async () => {
	const response = await fetch('/api/v1/activity/');
	const result = await response.json();

	if (response.status !== 200) {
		throw new Error('Activity data were not fetched.');
	}

	return result;
};

const Home: NextPage = () => {
	const [ data, setData ] = useState(null);
	const [ loading, setLoading ] = useState(false);
	const { ESection } = Sections;

  	const fetchNewActivity = () => {
		setLoading(true);

		fetchActivityData().then((data) => {
			setData(data);
		}).finally(() => {
			setLoading(false);
		})
	};

	useEffect(() => {
		fetchNewActivity();
	}, []);

  return (
    <Layout
		title={Seo.home.title}
		section={ESection.Random}
	>
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
