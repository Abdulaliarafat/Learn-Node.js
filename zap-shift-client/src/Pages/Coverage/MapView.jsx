import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef, useState } from 'react';

const MapView = ({ districtBranches }) => {
    // 📌 Helper component to fly to district
    const FlyToDistrict = ({ position }) => {
        const map = useMap();
        if (position) {
            map.flyTo(position, 11); // Zoom level 10
        }
        return null;
    };
    const [searchText, setSearchText] = useState('');
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const inputRef = useRef();
    // 📌 Search logic
    const handleSearch = () => {
        const value = searchText.toLowerCase().trim();
        const found = districtBranches.find((branch) =>
            branch.district.toLowerCase().includes(value)
        );
        if (found) {
            setSelectedPosition([found.latitude, found.longitude]);
            setSelectedDistrict(found);
        } else {
            alert('District not found');
        }
    };

    return (
        <div className="w-full h-[650px] rounded-xl shadow-md">
            {/* 🔍 Search Box */}
            <div className="flex items-center justify-center gap-2 mb-5">
                <input
                    ref={inputRef}
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search district name..."
                    className="input input-bordered w-full max-w-md"
                />
                <button className="btn btn-primary w-40" onClick={handleSearch}> Search
                </button>
            </div>
            {/* map */}
            <MapContainer
                center={[23.6850, 90.3563]} // Coordinates of Bangladesh
                zoom={7}
                scrollWheelZoom={false}
                className="h-full w-full z-0 rounded-xl"
            >
                {/* Map tiles from OpenStreetMap */}
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                />
                {/* Fly to searched district */}
                <FlyToDistrict position={selectedPosition} />

                {/* Example Marker (You can use district locations here) */}
                {districtBranches.map((branch, index) => (
                    <Marker key={index} position={[branch.latitude, branch.longitude]}>
                        <Popup>
                            <div>
                                <h3 className="font-bold">{branch.district}</h3>
                                <p className="text-sm">{branch.covered_area.join(', ')}</p>
                                <a
                                    href={branch.flowchart}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-600 underline text-xs"
                                >
                                    View Flowchart
                                </a>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
            {selectedDistrict && (
                <div className="text-center">
                    <h2 className="text-xl font-semibold mt-4">
                        {selectedDistrict.district} Covered Areas:
                    </h2>
                    <p className="text-sm text-gray-600">
                        {selectedDistrict.covered_area.join(', ')}
                    </p>
                </div>
            )}
        </div>
    );
};

export default MapView;
