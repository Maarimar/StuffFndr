import React from "react";
import placeHolder from "../assets/placeholder.svg"

const ItemCard = ({ images, title, dateLostFound, dateReported, type, lost, description, location }) => {
  const reportedDate = dateReported || dateLostFound;
  const itemStatus = lost === true ? "Lost" : lost === false ? "Found" : (type || "");
  const imageSrc = images || placeHolder;
  const imageAlt = title ? `Photo of ${title}` : "Reported item photo";

  return (
    <article className="ItemCard">
      <img className="itemPhoto" src={imageSrc} alt={imageAlt} />
      <h2 className="itemTitle">{title}</h2>
      {description && <p className="itemDescription">{description}</p>}
      {reportedDate && <p className="dateLostFound">Reported: {reportedDate}</p>}
      {itemStatus && <p className="itemStatus">{itemStatus}</p>}
      {location && <p className="itemLocation">{location}</p>}
    </article>
  )
};

export default ItemCard;
