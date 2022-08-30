import type { NextPage } from 'next';
import Layout from '@/components/Layout';
import { Seo } from '@/constants'
import { Sections } from '@/constants';

const Plan: NextPage = () => {
    const { ESection } = Sections;

  return (
    <Layout
		title={Seo.plan.title}
		section={ESection.Plan}
	>
        Plan
    </Layout>
  );
};

export default Plan;
