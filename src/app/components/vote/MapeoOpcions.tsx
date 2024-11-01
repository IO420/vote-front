import Image from 'next/image';
import wallpaper from './img/wallpaper.avif';

const MapeoOpcions = ({ vote }) => { 
  return (
    <div>
      <div className="optionsContainer">
        <div className="voteCard" style={{ cursor: "pointer" }} key={vote.id}>
          <div className="img">
            <Image
              src={wallpaper}
              alt={`Image of ${vote.texto}`}
              objectFit="cover"
              layout="fill"
            />
          </div>
          <h2 className="voteName">{vote.texto}</h2>
        </div>
      </div>
    </div>
  );
};

export default MapeoOpcions;
