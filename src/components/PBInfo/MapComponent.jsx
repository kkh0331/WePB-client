import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Marker from '../../assets/marker.png';

const { kakao } = window;

const MapComponent = ({ lat, lng, lastPartAddress }) => {
	const [address, setAddress] = useState('');

	useEffect(() => {
		const loadKakaoMap = () => {
			window.kakao.maps.load(() => {
				const geocoder = new window.kakao.maps.services.Geocoder();
				const coord = new window.kakao.maps.LatLng(lat, lng);

				geocoder.coord2Address(
					coord.getLng(),
					coord.getLat(),
					(result, status) => {
						if (status === window.kakao.maps.services.Status.OK) {
							const address = result[0].address.address_name;
							setAddress(address);
						}
					},
				);
			});
		};

		if (window.kakao && window.kakao.maps) {
			loadKakaoMap();
		}
	}, [lat, lng]);

	return (
		<>
			<div className="map-container">
				<Map
					center={{ lat: lat, lng: lng }}
					level={3}
					style={{ width: '100%', height: '300px' }}
				>
					<MapMarker
						position={{
							lat: lat,
							lng: lng,
						}}
						image={{
							src: Marker,
							size: {
								width: 40,
								height: 40,
							},
						}}
					/>
				</Map>
			</div>
			{/* <div className="text-[14px] ps-2">
				{address} {lastPartAddress}
			</div> */}
		</>
	);
};
export default MapComponent;
