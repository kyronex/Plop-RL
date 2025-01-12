import { useState } from "react";

function App() {
	const ploping = "PLOPingOCCC";
	const plopStyle = { color: "red", backgroundColor: "blue" };
	const [test, setTest] = useState(0);

	const clicking = (e) => {
		setTest(test + 1);
	};

	function ContentReplay(props) {
		return (
			<div>
				<p>BLABLABKAB</p>
			</div>
		);
	}

	function ReplayInput(props) {
		const [file, setFile] = useState(null);
		const [message, setMessage] = useState("");

		const handleFileChange = (event) => {
			setFile(event.target.files[0]);
		};

		const handleSubmit = async (event) => {
			event.preventDefault();
			if (!file) {
				setMessage("Please select a file.");
				return;
			}

			const formData = new FormData();
			formData.append("file", file);

			try {
				const resp = await fetch("http://localhost:5000/upload", {
					method: "POST",
					body: formData,
				});
				if (resp.ok) {
					const data = await resp.json();
					setMessage(data.message);
					console.log(data.data);
				} else {
					setMessage("Erreur uploading fichier.");
					console.error("Error:", resp.statusText);
				}
			} catch (err) {
				setMessage("Error uploading file (catch).");
				console.error("Error:", err);
			}
		};

		const renderMessage = () => {
			if (message) {
				return <p>{message}</p>;
			} else {
				return null;
			}
		};

		return (
			<div>
				<h2>File Upload Form</h2>
				<form onSubmit={handleSubmit}>
					<label>{props.label}</label>
					<input type="file" onChange={handleFileChange} />
					<button type="submit">Upload</button>
				</form>
				{renderMessage()}
			</div>
		);
	}

	return (
		<>
			<h1 id="plop" style={plopStyle}>
				PLOP
			</h1>
			<h1 id={ploping} onClick={clicking}>
				{ploping} {test}
			</h1>
			<ReplayInput label="Replay"></ReplayInput>
			<ContentReplay></ContentReplay>
		</>
	);
}

export default App;
