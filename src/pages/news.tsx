import type { NextPage } from 'next';
import Layout from '@/components/Layout';
import { Seo } from '@/constants'
import { Sections } from '@/constants';

const News: NextPage = () => {
    const { ESection } = Sections;

  return (
    <Layout
		title={Seo.news.title}
		section={ESection.News}
	>
        News
    </Layout>
  );
};

export default News;
