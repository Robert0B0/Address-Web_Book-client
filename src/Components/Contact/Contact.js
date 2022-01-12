import React from "react";
import "./css/Contact.css";
import defaultIcon from "../../css/images/defaultIcon.jpg";

export default function Contact({
	id,
	name,
	picture,
	address,
	openEditContact,
}) {
	return (
		<div className="contact" onClick={() => openEditContact(id)}>
			<div className="info">
				<p className="contactName">{name}</p>
				<p className="contactAddress">
					{address.length > 30 ? address.substring(0, 27) + "..." : address}
				</p>
			</div>
			<div className="contact-picture">
				<img
					className="picture"
					src={picture === null || picture === "" ? defaultIcon : picture}
					alt="picture"
				/>
			</div>
		</div>
	);
}
