import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import defaultImg from "../../css/images/defaultIcon.jpg";
import { AiOutlineClose, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

import { HiUserAdd } from "react-icons/hi";
import "./css/Modal.css";

Modal.setAppElement("#root");
export default function ContactModal({
	showModal,
	contactInfo,
	handleInputField,
	closeModal,
	editing,
	handleContactCreate,
	handleContactUpdate,
	handleContactDelete,
}) {
	const [error, setError] = useState({ nameError: false, addressError: false });

	const handleSubmit = () => {
		if (contactInfo.name === "" && contactInfo.address === "") {
			setError({ addressError: true, nameError: true });
		} else if (contactInfo.name === "") {
			setError({ ...error, nameError: true });
		} else if (contactInfo.address === "") {
			setError({ ...error, addressError: true });
		} else {
			editing === true
				? handleContactUpdate(contactInfo.id)
				: handleContactCreate();
		}
	};

	useEffect(() => {
		const errInterval = setTimeout(() => {
			setError({ nameError: false, addressError: false });
		}, 1500);

		return () => clearInterval(errInterval);
	}, [error]);

	return (
		<Modal isOpen={showModal} onRequestClose={closeModal} className={"Modal"}>
			<div className="titleBar">
				<h1 className="title">
					{editing ? "Edit Contact" : "Add New Contact"}
				</h1>
				<button className="closeButton" onClick={closeModal}>
					<AiOutlineClose className="closeIcon" />
				</button>
			</div>
			<div className="inputContainer">
				{editing ? (
					<div className="inputs">
						<input
							type="text"
							name="name"
							value={contactInfo.name}
							onChange={(e) => handleInputField(e)}
							placeholder="Insert Contact Name..."
							className={error.nameError && "error"}
						/>
						<input
							type="text"
							name="address"
							value={contactInfo.address}
							onChange={(e) => handleInputField(e)}
							placeholder="Insert Address..."
							className={error.addressError && "error"}
						/>
					</div>
				) : (
					<div className="inputs">
						<input
							type="text"
							name="name"
							value={contactInfo.name}
							onChange={(e) => handleInputField(e)}
							placeholder="Insert Contact Name..."
							className={error.nameError && "error"}
						/>
						<input
							type="text"
							name="address"
							value={contactInfo.address}
							onChange={(e) => handleInputField(e)}
							placeholder="Insert Address..."
							className={error.addressError && "error"}
						/>
					</div>
				)}
				<img className="inputImg" src={defaultImg} alt="defaultImg" />
			</div>
			{editing ? (
				<>
					<button className="editButton" onClick={handleSubmit}>
						<AiOutlineEdit className="editIcon" />
					</button>
					<button
						className="deleteButton"
						onClick={() => handleContactDelete(contactInfo.id)}
					>
						<AiOutlineDelete className="deleteIcon" />
					</button>
				</>
			) : (
				<button className="addButton" onClick={handleSubmit}>
					<HiUserAdd className="addIcon" />
				</button>
			)}
		</Modal>
	);
}
