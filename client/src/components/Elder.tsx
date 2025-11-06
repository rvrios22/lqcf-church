interface ElderTypes {
  name: string;
  bio: string;
  img: string;
}
function Elder({ name, bio, img }: ElderTypes) {
  return (
    <figure className="mb-4 md:grid md:grid-cols-2">
      <div>
        <img
          srcSet={`
          /api/static/imgs/${img}/${img}-300.webp 300w,
          /api/static/imgs/${img}/${img}-400.webp 700w,
          /api/static/imgs/${img}/${img}-500.webp 800w,
          /api/static/imgs/${img}/${img}-600.webp 1200w,
          `}
          sizes="
          (min-width: 2560px) 50vw,
    (min-width: 1440px) 50vw,
    (min-width: 1024px) 50vw,
    (min-width: 768px) 50vw,
    (max-width: 320px) 90vw,
    80vw
          "
          src={`api/static/imgs/${img}/${img}-500.webp`}
          alt={name}
          className="m-auto h-[500px] w-[90%] rounded-2xl object-cover shadow-lg"
        />
        <h2 className="sub-header">{name}</h2>
      </div>
      <p className="general-text no-scrollbar overflow-y-scroll md:h-[500px]">
        {bio}
      </p>
    </figure>
  );
}

export default Elder;
