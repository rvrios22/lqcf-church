import { Image } from "@heroui/react";

interface ElderTypes {
  name: string;
  bio: string;
  img: string;
}
function Elder({ name, bio, img }: ElderTypes) {
  return (
    <figure>
      <div>
        <Image
          src={`api/static/imgs/${img}`}
          alt={name}
          className="m-auto w-4/5 rounded-2xl shadow-md"
        />
        <h2 className="sub-header">{name}</h2>
      </div>
      <div>
        <p
          style={{
            overflow: "scroll",
          }}
          className="general-text"
        >
          {bio}
        </p>
      </div>
    </figure>
  );
}

export default Elder;
