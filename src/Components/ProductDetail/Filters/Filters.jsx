import './Filters.css'
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
        <>
            {filterOptions.map((option, index) => (
                <div key={index} className="form-check mt-2 text-start filters">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id={`flexCheckDefault${index}`}
                    />
                    <label
                        className="form-check-label bg-white rounded px-3 mx-4 small"
                        htmlFor={`flexCheckDefault${index}`}
                    >
                        {option}
                    </label>
                </div>
            ))}
        </>
    );
}

export default Filters;
