import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Layout from '@/components/Layout';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Seo, Sections } from '@/constants'
import Link from '@/components/Link';

const fetchActivityData = async () => {
	const response = await fetch('/api/v1/activity/list/');
	const result = await response.json();

	if (response.status !== 200) {
		throw new Error('Activity data were not fetched.');
	}

	return result;
};

const Plan: NextPage = () => {
    const [ data, setData ] = useState(null);
	const [ loading, setLoading ] = useState(false);
    const { ESection } = Sections;

  	const fetchActivityList = () => {
		setLoading(true);

		fetchActivityData().then((data) => {
			setData(data);
		}).finally(() => {
			setLoading(false);
		})
	};
	
	useEffect(() => {
		fetchActivityList();
	}, []);

    data.map((item) => console.log('item', item))

    return (
        <Layout
            title={Seo.plan.title}
            section={ESection.Plan}
        >
            {data && !loading && (
                <Stack
                    sx={{
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {data.map((item, index) => (
                        <Typography
                            key={item.key}
                            variant="h5"
                            gutterBottom
                            align="center"
                        >
                            {index + 1}.&nbsp;
                            {item.activity}
                            {item.link !== '' && (
                                <Link
                                    href={`${item.link}`}
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
                    ))}

                    <Button
                        sx={{
                            mt: 4
                        }}
                        variant="contained"
                        onClick={fetchActivityList}
                    >
                        More!
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

export default Plan;
