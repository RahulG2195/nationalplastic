import colour from "./color.txt"
import "./color.css"

export const metadata = {
    title: 'Product Colors | National Plastic Industries Ltd',
    description: 'Explore the wide range of colors available for our plastic products at National Plastic Industries Ltd. Find the perfect shade for your chairs, stools, and other household items.',
    keywords: ['product colors', 'color options', 'National Plastic Industries Ltd', 'plastic furniture', 'custom colors'],
  };


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
