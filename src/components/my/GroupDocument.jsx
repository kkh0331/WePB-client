import React, { useEffect, useState } from 'react';
import Document from './Document';

export default function GroupDocument({ documents }) {
	const [date, setDate] = useState('');

	useEffect(() => {
		const extracedDate = documents[0].date;
		setDate(
			`${extracedDate.substr(0, 4)}년 ${extracedDate.substr(4, 2)}월 ${extracedDate.substr(6)}일`,
		);
	}, [documents]);

	return (
		<div className="mt-4">
			<p className="text-base font-semibold">{date}</p>
			{documents.map(document => {
				return <Document key={document.reservationDate} document={document} />;
			})}
		</div>
	);
}
