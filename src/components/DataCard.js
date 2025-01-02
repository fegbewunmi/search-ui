export const DataCard = (props) => {
  const { make, style, color, plate, tow_date, towed_to_address } = props;

  return (
    <div className="profile__card rounded-[15px] border border-solid">
      <div>
        <div className=" bg-slate-300 p-3">
          <p>Make: {make}</p>
          <p>Style: {style}</p>
          <p>Color: {color}</p>
          <p>Plate: {plate}</p>
          <p>Tow Date: {tow_date}</p>
          <p>Tow Address: {towed_to_address}</p>
        </div>
      </div>
    </div>
  );
};
