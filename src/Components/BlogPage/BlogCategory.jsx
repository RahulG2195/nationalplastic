import './BlogCategory.css';

const BlogCategory = () => {
    return (
        <>
            <div>
                <p className="fw-bold fs-1 text-danger text-center mb-2">Category</p>
            </div>
            <div className="d-flex flex-wrap justify-content-center gap-3 mb-2">
                <button type="button" className="btn customButton btn-outline-primary fw-semibold px-4 py-2 rounded-0 categoryRespBtn">Chairs</button>
                <button type="button" className="btn customButton btn-outline-primary fw-semibold px-4 py-2 rounded-0 categoryRespBtn">Storage</button>
                <button type="button" className="btn customButton btn-outline-primary fw-semibold px-4 py-2 rounded-0 categoryRespBtn">Multipurpose</button>
                <button type="button" className="btn customButton btn-outline-primary fw-semibold px-4 py-2 rounded-0 categoryRespBtn">Tables</button>
                <button type="button" className="btn customButton btn-outline-primary fw-semibold px-4 py-2 rounded-0 categoryRespBtn">Culture</button>
                <button type="button" className="btn customButton btn-outline-primary fw-semibold px-4 py-2 rounded-0 categoryRespBtn">Bulk Buy</button>
            </div>
        </>
    );
};

export default BlogCategory;
