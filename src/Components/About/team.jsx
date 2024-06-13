import Image from 'next/image';

const TeamSection = ({ image, name , disignation }) => {


  return (
    <div className="TeamMemCard">
      <div className='TemMemImg'>
            <Image
              src={image}
              className="img-fluid d-block w-100" // Use w-100 to make the image fill the entire col-lg col-md-3 col-sm-12umn
              alt="Team Member"
              width={100}
              height={100}
              layout="responsive"
              objectFit="cover"
            />
            </div>
            <div className='TeamMemNames'>
            <h3>{name}</h3>
           <p>{disignation}</p>
           </div>
          </div>
  );
};

export default TeamSection;
