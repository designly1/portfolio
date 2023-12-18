import React from 'react';
import Layout from '@/components/Layout';
import WriteSpellRead from '@/components/Portfolio/WriteSpellRead';

export default function WriteSpellReadPage() {
	return (
		<Layout
			pageTitle="WriteSpellRead"
			description="WriteSpellRead is a web app that helps children learn to read and spell."
		>
			<WriteSpellRead />
		</Layout>
	);
}
