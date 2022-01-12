import React, { useState, useEffect } from "react";
import { CSVDownload, CSVLink } from "react-csv";
import Axios from "axios";
import "./css/App.css";

import SearchBar from "./Components/SearchBar/SearchBar";
import List from "./Components/List/List";
import ContactModal from "./Components/ContactModal/ContactModal";
import { FaFileCsv } from "react-icons/fa";

const headers = [
	{ label: "Full Name", key: "name" },
	{ label: "Address", key: "address" },
];

function App() {
	const [searchInput, setSearchInput] = useState("");
	const [contactList, setContactList] = useState([]);
	const [contactInfo, setContactInfo] = useState({
		id: 0,
		name: "",
		address: "",
		picture: "",
	});
	const [showModal, setShowModal] = useState(false);
	const [editing, setEditing] = useState(false);

	const csvReport = {
		filename: "ContactList.csv",
		headers: headers,
		data: contactList,
	};

	useEffect(() => {
		Axios.get("http://localhost:5000/contacts").then((response) => {
			setContactList(response.data);
		});
	}, [showModal === false]);

	const handleSearchInputChange = (e) => {
		e.preventDefault();
		setSearchInput(e.target.value);
	};

	const handleInputField = (e) => {
		const { value, name } = e.target;
		setContactInfo({ ...contactInfo, [name]: value });
	};

	const openAddContact = () => {
		setContactInfo({
			...contactInfo,
			name: searchInput,
		});
		setShowModal(true);
	};

	const openEditContact = (id) => {
		const foundContact = contactList.find((contact) => contact.id === id);
		setContactInfo(foundContact);
		setEditing(true);
		setShowModal(true);
	};

	const handleContactCreate = () => {
		Axios.post("http://localhost:5000/create", {
			name: contactInfo.name,
			address: contactInfo.address,
			picture: contactInfo.picture,
		})
			.then(() => {
				console.log("success");
				closeModal();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleContactUpdate = (id) => {
		Axios.put(`http://localhost:5000/contact/${id}`, {
			name: contactInfo.name,
			address: contactInfo.address,
			picture: contactInfo.picture,
		})
			.then(() => {
				console.log("success");
				closeModal();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleContactDelete = (id) => {
		Axios.delete(`http://localhost:5000/delete/${id}`)
			.then(() => {
				console.log("success");
				closeModal();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const closeModal = () => {
		setShowModal(false);
		setEditing(false);
		setSearchInput("");
		setContactInfo({
			id: "",
			name: "",
			address: "",
			picture: "",
		});
	};

	return (
		<div className="container">
			<SearchBar
				{...{
					searchInput,
					handleSearchInputChange,
					openAddContact,
					contactList,
				}}
			/>
			<List {...{ contactList, openEditContact, searchInput }} />
			{contactList.length > 0 ? (
				<CSVLink {...csvReport}>
					<button className="CSV-button">
						<FaFileCsv className="csv-icon" />
					</button>
				</CSVLink>
			) : (
				<button className="CSV-button-inactive">
					<FaFileCsv className="csv-icon" />
				</button>
			)}

			<ContactModal
				{...{
					showModal,
					closeModal,
					contactInfo,
					setContactInfo,
					handleInputField,
					editing,
					handleContactCreate,
					handleContactUpdate,
					handleContactDelete,
				}}
			/>
		</div>
	);
}

export default App;
