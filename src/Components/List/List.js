import React from "react";
import Contact from "../Contact/Contact";
import "./css/List.css";

export default function List({ contactList, searchInput, openEditContact }) {
	return (
		<>
			{contactList.length > 0 ? (
				<div className="list">
					{contactList
						.filter((contact) => {
							if (searchInput == "") {
								return contact;
							} else if (
								contact.name.toLowerCase().includes(searchInput.toLowerCase())
							) {
								return contact;
							}
						})
						.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
						.map((contact, key) => {
							const { id, name, address, picture } = contact;
							return (
								<Contact
									key={key}
									{...{ id, name, address, picture, openEditContact }}
								/>
							);
						})}
				</div>
			) : (
				<div className="list">
					<h2>There are no Contacts...</h2>
					<h3>Add Your First Contacts! </h3>
				</div>
			)}
		</>
	);
}
