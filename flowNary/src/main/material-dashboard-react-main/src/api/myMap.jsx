import React, { useEffect } from 'react';

const MyMapComponent = ({ address, title }) => {
    useEffect(() => {
        const mapContainer = document.getElementById('map');

        const mapOption = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(address, function (result, status) {
            if (status === window.kakao.maps.services.Status.OK) {
                const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                const marker = new window.kakao.maps.Marker({
                    map: map,
                    position: coords
                });

                const infowindow = new window.kakao.maps.InfoWindow({
                    content: `<div style="width:150px;text-align:center;padding:1px 0px;background-color: white; color:coral;border:1px solid black; font-size: 25px; font-weight:bold">${title}</div>`
                });
                infowindow.open(map, marker);
                map.setCenter(coords);
            }
        });
    }, [address, title]);

    return (
        <div className="map_style" id="map"></div>
    );
}

export default MyMapComponent;
