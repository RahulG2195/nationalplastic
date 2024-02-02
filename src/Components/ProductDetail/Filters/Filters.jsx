import './Filters.css';

const Filters = () => {
    const filterOptions = [
        'All',
        'Quality',
        'Comfort',
        'Price',
        'Delivery',
        'Customer Service',
        'Packaging',
    ];

    return (
        <div className="row filters">
            {/* Left column for checkboxes */}
            <div className="col-12 col-md-12 col-sm-6 col-xs-6">
                {filterOptions.slice(0, 3).map((option, index) => (
                    <div key={index} className="form-check mt-2 text-start">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id={`flexCheckDefault${index}`}
                        />
                        <label
                            className="form-check-label bg-white rounded px-3 small"
                            htmlFor={`flexCheckDefault${index}`}
                        >
                            {option}
                        </label>
                    </div>
                ))}
            </div>

            {/* Right column for checkboxes */}
            <div className="col-12 col-md-12 col-sm-6 col-xs-6 ">
                {filterOptions.slice(3).map((option, index) => (
                    <div key={index} className="form-check mt-2 text-start filters">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id={`flexCheckDefault${index + 3}`}
                        />
                        <label
                            className="form-check-label bg-white rounded px-3 small"
                            htmlFor={`flexCheckDefault${index + 3}`}
                        >
                            {option}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Filters;
