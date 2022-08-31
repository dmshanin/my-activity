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
	const [ acceptance, setAcceptance ] = useState(false);
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
	
	useEffect(() => {
		setAcceptance(false);
	}, [ data ]);

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
						variant="h5"
						gutterBottom
						align="center"
					>
						{data.activity}
						{data.link !== '' && (
							<Link
								href={`${data.link}`}
								target="_blank"
								sx={{
									ml: 1,
									verticalAlign: 'super'
								}}
							>
								<OpenInNewIcon sx={{ fontSize: 14 }} />
							</Link>
						)}
					</Typography>

					<Stack
						sx={{
							mt: 3
						}}
						spacing={2}
						direction='row'
					>
						<Button
							variant="contained"
							onClick={fetchNewActivity}
						>
							More!
						</Button>

						<Button
							variant={acceptance ? 'contained' : 'outlined'}
							color="success"
							disabled={acceptance ? true : false}
							onClick={() => setAcceptance(true)}
						>
							{acceptance ? 'Accepted' : 'Accept'}
						</Button>
					</Stack>
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
