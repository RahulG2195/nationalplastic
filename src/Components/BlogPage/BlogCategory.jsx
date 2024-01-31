const BlogCategory = () => {
    return (
        <>
            <div>
                <p className="fw-bold fs-1 text-danger text-center mb-2">Category</p>
            </div>
            <div className="d-flex justify-content-center gap-5 mb-2">
                <button type="button" class="btn btn-outline-primary px-5 rounded-0  ">Chairs</button>
                <button type="button" class="btn btn-outline-primary px-5 rounded-0  ">Storage</button>
                <button type="button" class="btn btn-outline-primary px-5 rounded-0  ">Multipurpose</button>
                <button type="button" class="btn btn-outline-primary px-5 rounded-0  ">Tables</button>
                <button type="button" class="btn btn-outline-primary px-5 rounded-0  ">Culture</button>
                <button type="button" class="btn btn-outline-primary px-5 rounded-0  ">Bulk Buy</button>
            </div>

        </>
    )
}
export default BlogCategory