import colour from "./color.txt"
import "./color.css"

const Colors = () => {
    return (
        <>
            <div className="grid-container">
                {colour.map((val, index) => (
                    <div key={index} className="grid-item">
                        <img src={val.imgurl} alt="No image" className="w-full h-auto" />
                        <p className="colname">{val.colorname}</p>
                    </div>
                ))}
            </div>
        </>

    )

}

export default Colors;
