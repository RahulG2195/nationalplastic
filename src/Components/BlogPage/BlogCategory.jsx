import './BlogCategory.css';

const BlogCategory = () => {
    return (
        <>
            <div>
                <p className="fw-bold fs-1 text-danger text-center mb-2">Category</p>
            </div>
            <div className="d-flex flex-wrap justify-content-center gap-3 mb-2">
                <button type="button" className="btn customButton btn-outline-primary fw-semibold px-4 py-2 rounded-0">Chairs</button>
                <button type="button" className="btn customButton btn-outline-primary fw-semibold px-4 py-2 rounded-0">Storage</button>
                <button type="button" className="btn customButton btn-outline-primary fw-semibold px-4 py-2 rounded-0">Multipurpose</button>
                <button type="button" className="btn customButton btn-outline-primary fw-semibold px-4 py-2 rounded-0">Tables</button>
                <button type="button" className="btn customButton btn-outline-primary fw-semibold px-4 py-2 rounded-0">Culture</button>
                <button type="button" className="btn customButton btn-outline-primary fw-semibold px-4 py-2 rounded-0">Bulk Buy</button>
            </div>
        </>
    );
};

export default BlogCategory;
