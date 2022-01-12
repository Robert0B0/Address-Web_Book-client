import React, { useState } from "react";
import "./css/SearchBar.css";
import { BsPersonPlus } from "react-icons/bs";
import { MdOutlineSupervisorAccount } from "react-icons/md";

export default function SearchBar({
	searchInput,
	handleSearchInputChange,
	openAddContact,
	contactList,
}) {
	return (
		<div className="searchContainer">
			<div className="searchInput">
				<input
					type="text"
					name="searchInput"
					placeholder="Search Contacts..."
					onChange={handleSearchInputChange}
					value={searchInput}
				/>
			</div>
			<div className="control">
				<button onClick={openAddContact}>
					<BsPersonPlus size="40px" />
				</button>
				<div className="contactSum">
					<h3>{contactList.length}</h3>
					<MdOutlineSupervisorAccount size="40px" />
				</div>
			</div>
		</div>
	);
}
